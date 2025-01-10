'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const fetchTodos = async () => {
  const res = await fetch('https://json-api.uz/api/project/fn1-fullstack/todos', {
    cache: 'no-store',
  });
  const { data } = await res.json();
  return data || [];
};

const Home = () => {
  const [todos, setTodos] = useState([]); 
  const [open, setOpen] = useState(false); 
  const [currentTodo, setCurrentTodo] = useState(null); 
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');
  const [status, setStatus] = useState('');

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://json-api.uz/api/project/fn1-fullstack/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== id)); 
      } else {
        console.error('Xatolik yuz berdi!');
      }
    } catch (error) {
      console.error('Server bilan bog‘lanishda xatolik yuz berdi:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://json-api.uz/api/project/fn1-fullstack/todos/${currentTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          body: updatedBody,
          status, 
        }),
      });
      if (res.ok) {
        const updatedTodos = todos.map((todo) =>
          todo.id === currentTodo.id
            ? { ...todo, title: updatedTitle, body: updatedBody, status }
            : todo
        );
        setTodos(updatedTodos); 
        setOpen(false); 
      } else {
        console.error('Xatolik yuz berdi!');
      }
    } catch (error) {
      console.error('Server bilan bog‘lanishda xatolik yuz berdi:', error);
    }
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedBody(todo.body);
    setStatus(todo.status); // Statusni o'rnatish
    setOpen(true); 
  };

  return (
    <>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Card sx={{ backgroundColor: '#f9f9f9', borderRadius: 2 }}>
              <CardContent>
                <Chip
                  label={todo.status === 'undone' ? 'Bajarilmagan' : 'Bajarilgan'}
                  color={todo.status === 'undone' ? 'error' : 'success'}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {todo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {todo.body}
                </Typography>
              </CardContent>
              <Button
                onClick={() => handleEdit(todo)}
                color="primary"
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ margin: 1 }}
              >
                Tahrirlash
              </Button>
              <Button
                onClick={() => handleDelete(todo.id)}
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ margin: 1 }}
              >
                O'chirish
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {currentTodo && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Todo-ni Tahrirlash</DialogTitle>
          <DialogContent>
            <TextField
              label="Sarlavha"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <TextField
              label="Tavsif"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedBody}
              onChange={(e) => setUpdatedBody(e.target.value)}
            />
            <TextField
              label="Status (undone yoki done)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Bekor qilish
            </Button>
            <Button onClick={handleUpdate} color="primary" variant="contained">
              Saqlash
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Home;
