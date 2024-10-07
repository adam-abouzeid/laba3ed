"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner"; // Import toast notifications
import { deleteRequest } from "./action";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type StoredNeed = {
  needId: number;
  deletionToken: string;
};

const DeleteRequest = ({ requestId }: { requestId: number }) => {
  const storedNeeds = JSON.parse(localStorage.getItem("needs") || "[]");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const isDeletable = !!storedNeeds.find(
    (need: StoredNeed) => need.needId === requestId
  );

  const handleDelete = async () => {
    const storedNeeds = JSON.parse(localStorage.getItem("needs") || "[]");

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

      router.replace("/");
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
    <Button onClick={handleDelete} variant="destructive" disabled={isDeleting}>
      {isDeleting ? "Deleting..." : <FaTrashAlt />}
    </Button>
  );
};

export default DeleteRequest;
