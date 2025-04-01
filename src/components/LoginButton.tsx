// src/components/LoginButton.tsx
import { Button } from "@mui/material";

interface LoginButtonProps {
  isLoading?: boolean;
}

/**
 * LoginButton
 * A specialized button for login forms.
 */
export default function LoginButton({ isLoading = false }: LoginButtonProps) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={isLoading}
    >
      {isLoading ? "Logging In..." : "Log In"}
    </Button>
  );
}
