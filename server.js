const express = require("express");
const http = require("http");
const fs = require("fs");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;
const HISTORY_FILE = "chatHistory.json";
const MAX_MESSAGES = 100;

const ADMIN_SECRET = "tojiSecret123";  // Your admin key

let chatHistory = [];
let profiles = new Map(); // userId -> profile

// Load chat history from file
if (fs.existsSync(HISTORY_FILE)) {
  chatHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
}

// Admin panel route
app.get('/admin', (req, res) => {
  const key = req.query.key;
  if (key === ADMIN_SECRET) {
    res.sendFile(__dirname + '/admin.html');
  } else {
    res.status(403).send("Forbidden");
  }
});

// Chaos route
app.get('/chaos', (req, res) => {
  res.sendFile(__dirname + '/chaos.html');
});

// 🔥 Random GIF route
app.get('/randomgif', (req, res) => {
  res.sendFile(__dirname + '/randomgif.html');
});

// Serve static files
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send chat history on connect
  socket.emit("chat history", chatHistory);

  socket.on("chat message", (data) => {
    const msgLower = data.messageText.toLowerCase().trim();

    // 💥 /rickroll command
    if (msgLower === "/rickroll") {
      io.emit("chat message", {
        userId: "server",
        displayName: "Server",
        pfpUrl: "",
        messageText: `${data.displayName} triggered the Rickroll!`,
        timestamp: Date.now(),
      });
      io.emit("rickroll");
      return;
    }

    // 🎲 /randomgif command
    if (msgLower === "/randomgif") {
      io.emit("chat message", {
        userId: "server",
        displayName: "Server",
        pfpUrl: "",
        messageText: `${data.displayName} dropped a random gif!`,
        timestamp: Date.now(),
      });
      io.emit("randomgif");
      return;
    }

    // Standard chat message
    const processedData = {
      ...data,
      messageText: data.messageText,
      timestamp: Date.now(),
    };

    chatHistory.push(processedData);
    if (chatHistory.length > MAX_MESSAGES) chatHistory.shift();

    fs.writeFileSync(HISTORY_FILE, JSON.stringify(chatHistory, null, 2));

    io.emit("chat message", processedData);
  });

  socket.on("user update", (profileData) => {
    profiles.set(profileData.userId, profileData);
    io.emit("user updated", profileData);
    io.emit("users online", Array.from(profiles.values()));
  });

  socket.on("disconnect", () => {
    for (const [userId, profile] of profiles.entries()) {
      if (profile.socketId === socket.id) {
        profiles.delete(userId);
        io.emit("user left", userId);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
