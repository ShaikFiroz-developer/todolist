import User from "../models/user";
import TodoTask from "../models/tolist";

export const updatetaskstatus = async (req, res) => {
  const { user, taskid, task } = req.body;
  console.log(taskid);

  try {
    let userExist = await User.findOne({ userEmail: user });
    console.log(userExist);
    if (userExist) {
      const updata = await TodoTask.findOneAndUpdate(
        {
          userId: userExist._id,
          _id: taskid,
        },
        {
          booleanCompleted: true,
        },
        { new: true }
      );
      if (updata.booleanCompleted) {
        res.status(201).json({ message: "Task completed hurray" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } else {
      res.status(405).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};
