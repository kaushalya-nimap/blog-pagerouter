import Link from "next/link";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Modal,
  Box,
} from "@mui/material";
import styles from "./index.module.css";

export default function Blog({ data }) {
  const [todoData, setTodoData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedTodoData, setUpdatedTodoData] = useState({
    todo: "",
    userId: "",
    completed: false,
  });

  const handleDelete = async (id) => {
    const response = await fetch(`/api/todo?id=${id}`, { method: "DELETE" });

    if (response.ok) {
      setTodoData((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } else {
      console.log("Failed to delete the record");
    }
  };
  const handleUpdate = async (id) => {
    const response = await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        todo: updatedTodoData.todo,
        userId: +updatedTodoData.userId,
        completed: updatedTodoData.completed,
      }),
    });
    if (response.ok) {
      console.log("updated", response);
      //const updatedData=await response.json()
      // setTodoData((prevTodos)=>prevTodos.map((todo)=>todo.id===id?updatedData:todo))
      // setEditingId(null)
    } else {
      console.log("Failed to update the record");
    }
  };
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };
  useEffect(() => {
    console.log(updatedTodoData);
    setTodoData(data.todos);
    console.log(todoData);
  }, [updatedTodoData, todoData, data]);
  // console.log(data);
  return (
    <>
    <Navbar/>
      <div className={styles.mainDiv}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Todo ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Todo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoData.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.userId}</TableCell>
                  <TableCell>{post.todo}</TableCell>
                  <TableCell>
                    {post.completed === true ? "Completed" : "Pending"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        setEditingId(editingId === post.id ? null : post.id)
                      }
                    >
                      {editingId === post.id ? "Close" : "Update"}
                    </Button>
                    <Button onClick={() => handleDelete(post.id)} color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          <Modal
          open={editingId !== null}
          onClose={() => setEditingId(null)}
          aria-labelledby="update-todo-modal"
          aria-describedby="modal-to-update-todo"
        >
          <Box sx={modalStyle}>
            <TextField
              label="Todo message"
              value={updatedTodoData.todo}
              onChange={(e) => setUpdatedTodoData({ ...updatedTodoData, todo: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Select
              value={updatedTodoData.completed ? "true" : "false"}
              onChange={(e) => setUpdatedTodoData({ ...updatedTodoData, completed: e.target.value === "true" })}
              fullWidth
              margin="normal"
            >
              <MenuItem value="true">Completed</MenuItem>
              <MenuItem value="false">Pending</MenuItem>
            </Select>
            <TextField
              label="User Id"
              type="number"
              value={updatedTodoData.userId}
              onChange={(e) => setUpdatedTodoData({ ...updatedTodoData, userId: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              onClick={() => handleUpdate(editingId)}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/todo");
  const data = await res.json();
  return {
    props: { data },
  };
}
