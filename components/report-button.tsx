"use client";

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
import { GoAlert } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { reportRequest } from "../app/actions";

export default function ReportButton({ requestId }: { requestId: number }) {
  const t = useTranslations("requestCard");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [reportedRequests, setReportedRequests] = useState<number[]>([]);

  // Check if the current request is already reported
  const isReported = reportedRequests.includes(requestId);

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
    formData.append("needId", String(requestId));

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
            const updatedReports = [...reportedRequests, requestId];
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
    <div className="min-w-[30px]">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="gap-1.5">
            <GoAlert className="size-5 text-destructive" />
            {t("report")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>{t("reportTitle")}</DialogTitle>
            <DialogDescription>{t("reportDescription")}</DialogDescription>
          </DialogHeader>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Form for selecting reason */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Select onValueChange={setSelectedReason} required>
                <SelectTrigger>
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
                  isPending || isReported ? "opacity-50 cursor-not-allowed" : ""
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
  );
}
