import connectDb from "./config/mongodbconnect";
import { addTask } from "./controllers/addtask";

const handler = async (req, res) => {
  await connectDb();
  if (req.method === "POST") {
    await addTask(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
