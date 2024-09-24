"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner"; // Import toast notification
import { createRequest } from "./actions"; // Import your server action

const RecievePage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);

    startTransition(() => {
      createRequest(formData)
        .then((data) => {
          if (data?.errors) {
            setError("Something went wrong!"); // Handle error case
            toast.error("Something went wrong!"); // Show error notification
          } else {
            toast.success("Request created successfully!"); // Show success notification
            event.target.reset(); // Reset the form after success
          }
        })
        .catch(() => {
          setError("Something went wrong!");
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Need something? We got your back, make a request!
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            name="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Title for the need"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            name="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Describe the need"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Your contact number e.g. +961 11 11 11 11"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <select
            name="category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="FOOD">Food</option>
            <option value="CLOTHING">Clothing</option>
            <option value="SHELTER">Shelter</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="MEDICINE">Medicine</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isPending && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isPending ? "Submitting..." : "Create Request"}
        </button>
      </form>
    </div>
  );
};

export default RecievePage;
