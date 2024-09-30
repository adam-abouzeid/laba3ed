import { createRequest } from "@/actions";

const RequestForm = () => {
  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Need something? We got your back, make a request!
      </h1>

      <form action={createRequest} className="space-y-4">
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
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
