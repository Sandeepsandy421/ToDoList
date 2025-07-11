import React, { useEffect, useState, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TaskForm from "./TaskForm";
import TaskListHeader from "./TaskListHeader";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function TaskList() {
  const getToday = () => format(new Date(), "yyyy-MM-dd");

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getToday);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTasks(selectedDate); // selectedDate in yyyy-MM-dd
      setTasks(data);
      setError("");
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreate = async (newTask, resetForm) => {
    setError("");

    if (!newTask.title.trim() || !newTask.description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    const payload = {
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      isCompleted: false,
      date: newTask.date || selectedDate,
    };

    try {
      const response = await createTask(payload);
      setTasks([...tasks, response]);
      resetForm();
    } catch (err) {
      console.error("Error creating task:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to create task";
      setError(`Failed to create task: ${msg}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleToggle = async (task) => {
    const originalTasks = [...tasks];
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));

    try {
      await updateTask(task.id, updatedTask);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task status.");
      setTasks(originalTasks);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-t-2xl">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* Form */}
          <div>
            <TaskForm onCreate={handleCreate} />
          </div>

          {/* Header */}
          <div>
            <TaskListHeader tasks={tasks} />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Date
            </label>
            <DatePicker
              selected={new Date(selectedDate)}
              onChange={(date) => setSelectedDate(format(date, "yyyy-MM-dd"))}
              dateFormat="yyyy-MM-dd"
              className="w-full md:w-60 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <hr className="border-gray-200" />

          {/* Task List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id} className="py-4 px-2">
                  <TaskItem
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
