// src/components/LoginForm.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const theme = createTheme();

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const data = new FormData(event.currentTarget);
    const email = (data.get("email") as string)?.trim();
    const password = (data.get("password") as string)?.trim();

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      // Attempt sign-in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setErrorMsg(signInError.message);
        setIsLoading(false);
        return;
      }
      if (!signInData.session) {
        setErrorMsg("Login failed, no session returned.");
        setIsLoading(false);
        return;
      }

      // Now user is fully logged in, we can upsert row in 'users' table
      const { user } = signInData;
      // Optionally fetch user profile details from your form or from user_metadata
      // but let's just do a minimal upsert with email
      const { error: upsertErr } = await supabase.from("users").upsert(
        {
          id: user.id, // matches auth.uid()
          email: user.email,
          username: user.user_metadata?.username || "",
          // or if you stored firstName/lastName in user_metadata
          // firstName: user.user_metadata?.firstName,
          // lastName: user.user_metadata?.lastName
        },
        { onConflict: "id" }
      );

      if (upsertErr) {
        setErrorMsg(upsertErr.message);
        setIsLoading(false);
        return;
      }

      // All good - navigate wherever
      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
            <Typography component="h1" variant="h5" align="center">
              Log in
            </Typography>

            {errorMsg && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <LoginButton isLoading={isLoading} />
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <Button onClick={() => navigate("/signup")} variant="text">
                  Sign Up
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
