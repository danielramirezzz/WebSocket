const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const mensajes = [];

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    
    socket.emit("message", mensajes);

    socket.on("message", (data) => {
        const newMessage = {
            user: data.user,
            text: data.inputMessage,
            // Generamos la hora en el servidor
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        mensajes.push(newMessage);
        io.emit("message", mensajes);
    });
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});