import connectDb from "./config/mongodbconnect";
import getlatesttask from "./controllers/getlatesttask";

const handler = async (req, res) => {
  await connectDb();
  if (req.method === "GET") {
    await getlatesttask(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
