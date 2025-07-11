import React, { useState } from "react";
import toast from "react-hot-toast";

function TaskForm({ onCreate }) {
  // Function to get today's date in IST and format as YYYY-MM-DD
  const getTodayDateIST = () => {
    const now = new Date();
    const istDate = now.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata", // en-CA gives YYYY-MM-DD format
    });
    return istDate; // e.g., '2025-07-11'
  };

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: getTodayDateIST(),
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async () => {
    if (!newTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    setIsCreating(true);

    try {
      await onCreate(newTask, () => {
        setNewTask({
          title: "",
          description: "",
          date: getTodayDateIST(),
        });
      });

      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task. Please try again. " + error.message);
    }

    setIsCreating(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-lg border border-gray-300 hover:border-indigo-300 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 relative">
        Create New Task
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-indigo-500 rounded-full"></span>
      </h3>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 mt-4">
        {/* Title Field */}
        <div className="flex-1">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Task Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((t) => ({ ...t, title: e.target.value }))
            }
            disabled={isCreating}
            aria-required="true"
            aria-describedby="title-error"
          />
        </div>

        {/* Description Field */}
        <div className="flex-1">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Task Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter task description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((t) => ({ ...t, description: e.target.value }))
            }
            disabled={isCreating}
            aria-describedby="description-error"
          />
        </div>

        {/* Add Button */}
        <div className="flex items-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={isCreating}
            className={`min-w-[160px] h-[48px] bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center justify-center ${
              isCreating
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-indigo-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-200"
            }`}
            aria-label={isCreating ? "Adding task in progress" : "Add new task"}
          >
            {isCreating ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
