const express = require("express");
const cors = require("cors");
const axios = require("axios")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/chat", async (req, res) => {
  console.log(req.body.message);
  try {
    const flaskResponse = await axios.post("https://practice-3-rx31.onrender.com/chat",
        {
            message:req.body.message,
        }
    );

    res.json(flaskResponse.data);

  } catch (error) {
    console.error(error)
    
    res.status(500).json({
        response:"There was a error in calling flask"
    })
  }
  res.json({
    response: "Hello from Express!",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
