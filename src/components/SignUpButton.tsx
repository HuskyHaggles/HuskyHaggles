// src/components/SignUpButton.tsx
import React from "react";
import { Button } from "@mui/material";

interface SignupButtonProps {
  isLoading?: boolean;
}

/**
 * SignUpButton
 * Specialized button for signup flow, disabled when loading.
 */
export default function SignupButton({ isLoading = false }: SignupButtonProps) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 3, mb: 2 }}
      disabled={isLoading}
    >
      {isLoading ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}
