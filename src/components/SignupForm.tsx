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

import SignUpButton from "./buttons/SignUpButton";

const theme = createTheme();

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    // profilePicture is optional

    let validationErrors: string[] = [];

    // Required fields validation
    if (!firstName) validationErrors.push("First Name is required.");
    if (!lastName) validationErrors.push("Last Name is required.");
    if (!username) validationErrors.push("Username is required.");
    if (!email) validationErrors.push("Email is required.");
    if (!password) validationErrors.push("Password is required.");
    if (!confirmPassword)
      validationErrors.push("Confirm password is required.");

    // Validate first and last names: allow letters (with diacritical marks), hyphens, apostrophes, spaces.
    const nameRegex = /^[\p{L}\-'\s]+$/u;
    if (firstName && !nameRegex.test(firstName)) {
      validationErrors.push(
        "First Name may only contain letters, hyphens (-), apostrophes ('), and spaces."
      );
    }
    if (lastName && !nameRegex.test(lastName)) {
      validationErrors.push(
        "Last Name may only contain letters, hyphens (-), apostrophes ('), and spaces."
      );
    }

    // Validate username: allow letters, numbers, underscores, hyphens, and periods.
    const usernameRegex = /^[A-Za-z0-9_.-]+$/;
    if (username && !usernameRegex.test(username)) {
      validationErrors.push(
        "Username may only contain letters, numbers, underscores (_), hyphens (-), and periods (.)"
      );
    }

    // Validate email address.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      validationErrors.push(
        "Please enter a valid email address (e.g., username@domain.com)."
      );
    }

    // Validate password requirements
    if (password && password.length < 14) {
      validationErrors.push("Password must be 14 characters or longer.");
    }
    const loweredPassword = password.toLowerCase();
    if (firstName && loweredPassword.includes(firstName.toLowerCase())) {
      validationErrors.push("Password must not contain your first name.");
    }
    if (lastName && loweredPassword.includes(lastName.toLowerCase())) {
      validationErrors.push("Password must not contain your last name.");
    }
    if (username && loweredPassword.includes(username.toLowerCase())) {
      validationErrors.push("Password must not contain your username.");
    }
    // Check that the email username part is not included in the password
    if (email) {
      const emailUsername = email.split("@")[0];
      if (
        emailUsername &&
        loweredPassword.includes(emailUsername.toLowerCase())
      ) {
        validationErrors.push(
          "Password must not contain the username part of your email."
        );
      }
    }
    if (email && loweredPassword.includes(email.toLowerCase())) {
      validationErrors.push("Password must not contain your email.");
    }
    const numberRegex = /[0-9]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[^A-Za-z0-9]/;
    if (password && !numberRegex.test(password)) {
      validationErrors.push("Password must include at least 1 number (0-9).");
    }
    if (password && !lowercaseRegex.test(password)) {
      validationErrors.push(
        "Password must include at least 1 lowercase letter (a-z)."
      );
    }
    if (password && !uppercaseRegex.test(password)) {
      validationErrors.push(
        "Password must include at least 1 uppercase letter (A-Z)."
      );
    }
    if (password && !specialCharRegex.test(password)) {
      validationErrors.push(
        "Password must include at least 1 special character (e.g., !@#$%^&*)."
      );
    }
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.push("Passwords do not match.");
    }

    // If any validation errors exist, show them.
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors and simulate submission.
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
            {/* Display all errors in a styled alert */}
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
              {/* First Name and Last Name side-by-side */}
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
              {/* Upload profile picture field (optional) */}
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
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
