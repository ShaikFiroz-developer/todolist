import User from "../models/user";
import TodoTask from "../models/tolist";

export const deletetask = async (req, res) => {
  const { user, taskid, task } = req.body;

  try {
    let userExist = await User.findOne({ userEmail: user });

    if (userExist) {
      const deleteuser = await TodoTask.findOneAndDelete({
        userId: userExist._id,
        _id: taskid,
        task: task,
      });
      if (deleteuser) {
        res.status(201).json({ message: "Task deleted successfully" });
      }
    } else {
      res.status(405).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};
