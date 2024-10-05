"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { reportRequest } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoReport } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Need } from "@prisma/client";

const RequestCard = ({ request }: { request: Need }) => {
  const t = useTranslations("requestCard");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [reportedRequests, setReportedRequests] = useState<number[]>(
    JSON.parse(localStorage.getItem("reportedRequests") || "[]")
  );

  // Check if the current request is already reported
  const isReported = reportedRequests.includes(request.id);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (isReported) {
      toast.error("You have already reported this request.");
      return;
    }

    // Create a formData object with the selected reason and request ID
    const formData = new FormData();
    formData.append("reason", selectedReason ?? "");
    formData.append("needId", String(request.id));

    startTransition(() => {
      reportRequest(formData)
        .then((data) => {
          if (data?.errors) {
            setError("Something went wrong!");
            toast.error("Something went wrong!");
          } else {
            toast.success("Report submitted successfully!");
            setIsDialogOpen(false);

            // Mark this request as reported
            const updatedReports = [...reportedRequests, request.id];
            setReportedRequests(updatedReports);
            localStorage.setItem(
              "reportedRequests",
              JSON.stringify(updatedReports)
            );
          }
        })
        .catch(() => {
          setError("Something went wrong!");
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">{request.title}</h2>

        <div className="min-w-[30px]">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <GoReport
                cursor={"pointer"}
                size={"30px"}
                color="red"
                height={50}
                width={50}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[460px]">
              <DialogHeader>
                <DialogTitle>{t("reportTitle")}</DialogTitle>
                <DialogDescription>{t("reportDescription")}</DialogDescription>
              </DialogHeader>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              {/* Form for selecting reason */}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <Select onValueChange={setSelectedReason} required>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue placeholder={t("selectReasonPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("reasons.title")}</SelectLabel>
                        <SelectItem value="fulfilledByLister">
                          {t("reasons.fulfilledByLister")}
                        </SelectItem>
                        <SelectItem value="spamScam">
                          {t("reasons.spamScam")}
                        </SelectItem>
                        <SelectItem value="fulfilledByOwner">
                          {t("reasons.fulfilledByOwner")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isPending || !selectedReason || isReported}
                    className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                      isPending || isReported
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isPending
                      ? "Submitting..."
                      : isReported
                      ? "Already Reported"
                      : t("submitReport")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <p className="text-gray-600">{request.description}</p>
      <p className="text-gray-600">+961 {request.contact}</p>

      <div className="mt-4 gap-2 flex">
        <span className="inline-block  bg-blue-100 text-blue-600 text-sm font-medium px-3 py-2 rounded-full">
          {request.category}
        </span>
        <span className="inline-block bg-blue-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">
          {request.area}
        </span>
      </div>
    </div>
  );
};

export default RequestCard;
