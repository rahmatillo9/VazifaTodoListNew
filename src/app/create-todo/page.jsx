'use client';
import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('undone');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://json-api.uz/api/project/fn1-fullstack/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          status,
        }),
      });

      if (response.ok) {
        setMessage('Todo muvaffaqiyatli qo\'shildi!');
        setTitle('');
        setBody('');
      } else {
        setMessage('Xatolik yuz berdi!');
      }
    } catch (error) {
      setMessage('Server bilan bog‘lanishda xatolik yuz berdi.');
      console.error(error);
    }
  };

  return (
    <div className='container'>
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Yangi Todo Qo'shish
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Sarlavha"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Tavsif"
                variant="outlined"
                fullWidth
                margin="normal"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Qo'shish
              </Button>
            </form>
            {message && (
              <Typography
                variant="body2"
                color={message.includes('muvaffaqiyatli') ? 'green' : 'red'}
                sx={{ marginTop: 2 }}
              >
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    
    </Grid>
    </div>
  );
};

export default TodoForm;
