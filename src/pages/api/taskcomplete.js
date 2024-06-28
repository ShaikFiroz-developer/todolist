import connectDb from "./config/mongodbconnect";
import { updatetaskstatus } from "./controllers/taskcomplete";

const taskcomplete = async (req, res) => {
  await connectDb();
  if (req.method === "POST") {
    await updatetaskstatus(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default taskcomplete;
