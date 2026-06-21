const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/chat", (req, res) => {
  console.log(req.body.message);

  res.json({
    response: "Hello from Express!",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});