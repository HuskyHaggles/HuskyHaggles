import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, username")
        .order("username", { ascending: true });

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItemButton
              key={user.id}
              onClick={() => navigate(`/user/${user.username}`)}
            >
              <ListItemText primary={user.username} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Users;
