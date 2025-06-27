import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
