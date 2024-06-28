import User from "../models/user";
import TodoTask from "../models/tolist";

export const addTask = async (req, res) => {
  const { userEmail, task, todoCompletiontime, userName, userImg } = req.body;

  try {
    let userExist = await User.findOne({ userEmail });

    if (!userExist) {
      userExist = new User({
        userName,
        userEmail,
        userImg,
      });
      await userExist.save();
    }

    const newTask = new TodoTask({
      userId: userExist._id, // Storing the ObjectId of the user
      task,
      todoCompletiontime,
      booleanCompleted: false,
    });

    await newTask.save();
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};
