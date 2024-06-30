import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const my_db = process.env.MONGO_CLIENT;
console.log();
const connect = () => {
  mongoose.connect(my_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database Connected");
  });
};
export default connect;
