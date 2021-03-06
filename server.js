const express = require('express');
const socket = require('socket.io');

const tasks = [];

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server); 

io.on('connection', (socket) => {
    socket.emit('updateTask', tasks);
    socket.on('addTask', (task) => {
      tasks.push(task);
      console.log('task',tasks )
      socket.broadcast.emit('updateTask', tasks);
    });
    socket.on('removeTask', (taskIndex) => {
        tasks.splice(taskIndex, 1);
        socket.broadcast.emit('updateTask', tasks);
        console.log('task',tasks )
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});