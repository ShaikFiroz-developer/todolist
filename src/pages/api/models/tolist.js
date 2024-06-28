import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true, // Indexing userEmail for faster queries
    },
    task: {
      type: String,
      required: true,
    },
    booleanCompleted: {
      // Corrected typo
      type: Boolean,
      required: true, // Corrected typo
      index: true,
    },
    todoCompletiontime: {
      type: Date,
      required: true,
      index: true, // Indexing todoCompletiontime for efficient sorting
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Check if the model is already compiled to prevent OverwriteModelError
const TodoTask =
  mongoose.models.TodoTask || mongoose.model("TodoTask", todoSchema);

export default TodoTask;
