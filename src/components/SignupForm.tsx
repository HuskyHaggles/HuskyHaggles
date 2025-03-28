// src/components/SignupForm.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SignUpButton from "./SignUpButton";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

/**
 * SignupForm
 * Renders a registration UI. In a real app, connect to your backend for signups.
 */
export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = (data.get("firstName") as string)?.trim();
    const lastName = (data.get("lastName") as string)?.trim();
    const username = (data.get("username") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    const validationErrors: string[] = [];

    if (!firstName) validationErrors.push("First Name is required.");
    if (!lastName) validationErrors.push("Last Name is required.");
    if (!username) validationErrors.push("Username is required.");
    if (!email) validationErrors.push("Email is required.");
    if (!password) validationErrors.push("Password is required.");
    if (!confirmPassword)
      validationErrors.push("Confirm password is required.");

    // Additional validations can go here:
    // e.g. password length, email format, etc.

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If no errors, proceed
    setErrors([]);
    setIsLoading(true);

    console.log({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      profilePicture: data.get("profilePicture"),
    });

    // Simulate sign-up delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
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
              Sign Up
            </Typography>

            {errors.length > 0 && (
              <Box sx={{ mt: 2, width: "100%" }}>
                <Alert severity="error">
                  <ul style={{ margin: 0, paddingLeft: "1em" }}>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              </Box>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Box>

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" component="label" fullWidth>
                  Upload profile picture (optional)
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="profilePicture"
                  />
                </Button>
              </Box>

              <SignUpButton isLoading={isLoading} />
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Button onClick={() => navigate("/login")} variant="text">
                  Login
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
