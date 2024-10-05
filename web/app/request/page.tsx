"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner"; // Import toast notification
import { createRequest } from "./actions"; // Import your server action
import { useTranslations } from "next-intl";
import { Category } from "@prisma/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { Input } from "@/components/ui/input";

const ReceivePage = () => {
  const t = useTranslations("makeRequestPage");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    startTransition(() => {
      createRequest(formData)
        .then((data) => {
          if (data?.errors) {
            setError("Something went wrong!"); // Handle error case
            toast.error("Something went wrong!"); // Show error notification
          } else {
            toast.success("Request created successfully!"); // Show success notification
            target.reset(); // Reset the form after success
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
        <div className="space-y-1.5">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            {t("requestType")}
          </label>
          <select
            name="category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            defaultValue="" // Initial value is an empty string, which will not be valid for the form submission
          >
            <option value="" disabled>
              {t("selectRequestType")}
            </option>
            {Object.values(Category).map((category) => (
              <option key={category} value={category}>
                {t(category.toLowerCase())}
              </option>
            ))}
          </select>
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
            placeholder={t("descriptionPlaceholder")}
            required
            maxLength={150}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700"
          >
            {t("location")}
          </label>
          <Input name="area" placeholder={t("locationPlaceholder")} required />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor=" "
            className="block text-sm font-medium text-gray-700"
          >
            {t("contact")}
          </label>
          <div className="flex focus-within:ring-2 focus-within:ring-blue-500 border border-gray-300 rounded-md shadow-sm items-baseline">
            <span className="sm:text-sm pl-2">+961</span>
            <input
              name="contact"
              className="block w-full bg-transparent p-2 sm:text-sm outline-none"
              placeholder={t("contactPlaceholder")}
              required
            />
          </div>
        </div>

        <Alert>
          <GoAlert className="h-4 w-4" />
          <AlertDescription className="leading-7">
            {t("disclaimer")}
          </AlertDescription>
        </Alert>

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

export default ReceivePage;
