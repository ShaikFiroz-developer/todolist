import User from "../models/user";
import TodoTask from "../models/tolist";

const gettaskcontroller = async (req, res) => {
  const { useEmail, userImg, filter } = req.query; // Corrected query parameter name to userEmail

  try {
    const userexist = await User.findOne({ userEmail: useEmail });

    if (userexist) {
      const data = await TodoTask.find({
        userId: userexist._id,
        booleanCompleted: filter,
      });

      if (data.length >= 0) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ msg: "No tasks found" });
      }
    } else {
      res.status(404).json({ msg: "User does not exist" });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log the error for debugging
    res.status(500).json({ msg: "Something went wrong from our server" });
  }
};

export default gettaskcontroller;
