"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner"; // Import toast notification
import { createRequest } from "./actions"; // Import your server action
import { useTranslations } from "next-intl";
const RecievePage = () => {
  const t = useTranslations("ReceivePage");
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
        {t("heading")}
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            {t("title")}
          </label>
          <input
            name="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t("title-placeholder")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            {t("description")}
          </label>
          <textarea
            name="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t("description-placeholder")}
            required
            maxLength={150}
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            {t("contact")}
          </label>
          <div className="flex gap-1 items-center">
            <p>+961</p>
            <input
              type="number"
              name="contact"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t("contact-placeholder")}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700"
          >
            {t("area")}
          </label>
          <input
            name="area"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t("area-placeholder")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            {t("category")}
          </label>
          <select
            name="category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            defaultValue="" // Initial value is an empty string, which will not be valid for the form submission
          >
            <option value="" disabled>
              {t("Select a category")}
            </option>
            <option value="FOOD">{t("Food")}</option>
            <option value="CLOTHING">{t("Clothing")}</option>
            <option value="SHELTER">{t("Shelter")}</option>
            <option value="TRANSPORTATION">{t("Transportation")}</option>
            <option value="MEDICINE">{t("Medicine")}</option>
            <option value="OTHER">{t("Other")}</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isPending && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isPending ? "Submitting..." : t("submit")}
        </button>
      </form>
    </div>
  );
};

export default RecievePage;
