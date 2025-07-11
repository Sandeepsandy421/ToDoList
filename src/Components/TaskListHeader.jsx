import React from "react";

function TaskListHeader({ tasks }) {
  return (
    <div className="mb-6 flex justify-between items-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg border border-gray-300 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 relative">
        Your Tasks
        <span className="absolute bottom-0 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
      </h3>
      <span className="text-sm font-medium text-gray-600">
        {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
      </span>
    </div>
  );
}

export default TaskListHeader;
