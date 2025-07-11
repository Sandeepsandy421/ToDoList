import React from "react";

function EmptyState() {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks yet</h3>
      <p className="mt-1 text-gray-500">
        Get started by adding a new task above
      </p>
    </div>
  );
}

export default EmptyState;
