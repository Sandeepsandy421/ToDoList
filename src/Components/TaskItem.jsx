import React from "react";
import Swal from "sweetalert2";

function TaskItem({ task, onToggle, onDelete }) {
  const formatDate = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      onDelete(task.id);
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  };

  return (
    <li
      className={`group relative p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 hover:border-indigo-300 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${
        task.isCompleted ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggle(task)}
          className={`mt-1 flex-shrink-0 h-5 w-5 rounded border flex items-center justify-center transition-colors ${
            task.isCompleted
              ? "bg-indigo-500 border-indigo-600"
              : "bg-gray-50 border-gray-300 hover:border-indigo-500"
          }`}
          aria-label={
            task.isCompleted
              ? "Mark task as incomplete"
              : "Mark task as complete"
          }
        >
          {task.isCompleted && (
            <svg
              className="h-3 w-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className="ml-3 flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold ${
              task.isCompleted
                ? "line-through text-gray-500"
                : "text-gray-800 group-hover:text-indigo-600"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="flex-shrink-0 mr-1.5 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {formatDate(task.date)}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors duration-150"
          aria-label="Delete task"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
