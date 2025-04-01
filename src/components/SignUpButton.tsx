// src/components/SignUpButton.tsx
import { Button } from "@mui/material";

interface SignupButtonProps {
  isLoading?: boolean;
}

/**
 * SignUpButton
 * A specialized button for sign-up forms.
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
