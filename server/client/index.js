const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose.connect("mongodb+srv://studentUser:studentPass123@advanced-mern.onexehz.mongodb.net/academicDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
