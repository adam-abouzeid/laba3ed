"use client";

import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner"; // Import toast notifications
import { deleteRequest } from "./action";

const DeleteRequest = ({ requestId }: { requestId: number }) => {
  const [isDeletable, setIsDeletable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const storedNeeds = JSON.parse(localStorage.getItem("needs") || "[]");

    const foundNeed = storedNeeds.find(
      (need: any) => need.needId === requestId
    );

    if (foundNeed) {
      setIsDeletable(true);
    }
  }, [requestId]);

  const handleDelete = async () => {
    const storedNeeds = JSON.parse(localStorage.getItem("needs") || "[]");
    type StoredNeed = {
      needId: number;
      deletionToken: string;
    };
    const foundNeed = storedNeeds.find(
      (need: StoredNeed) => need.needId === requestId
    );

    if (!foundNeed) {
      toast.error("Deletion token not found!");
      return;
    }

    const deletionToken = foundNeed.deletionToken;

    setIsDeleting(true);

    try {
      await deleteRequest(requestId, deletionToken);
      toast.success("Request deleted successfully");

      const updatedNeeds = storedNeeds.filter(
        (need: StoredNeed) => need.needId !== requestId
      );
      localStorage.setItem("needs", JSON.stringify(updatedNeeds));
    } catch (error) {
      toast.error("Failed to delete the request");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isDeletable) {
    return null; // Don't render anything if the request is not deletable
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : <FaTrashAlt />}{" "}
    </button>
  );
};

export default DeleteRequest;
