import { deletetask } from "./controllers/deletetask";
import connectDb from "./config/mongodbconnect";

const deletetaskk = async (req, res) => {
  await connectDb();
  if (req.method === "POST") {
    await deletetask(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default deletetaskk;
