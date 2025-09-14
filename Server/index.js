require("dotenv").config();
const express = require("express");
const {connectDB} = require("./mongodb/db");
const cors = require("cors");
const authRouter = require("./Routes/auth")
const noteRouter = require("./Routes/note")
const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/auth", authRouter) 
app.use("/api/notes", noteRouter) 
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    console.log("Database connected")

    app.use(express.json());

    app.listen(PORT, () => {
      connectDB()
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
