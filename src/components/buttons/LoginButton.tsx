import { Button } from "@mui/material";

interface LoginButtonProps {
  isLoading?: boolean;
}

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
