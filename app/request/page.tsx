"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner"; // Import toast notification
import { createRequest } from "./actions"; // Import your server action
import { useTranslations } from "next-intl";
import { Category, Need } from "@prisma/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const ReceivePage = () => {
  const t = useTranslations("makeRequestPage");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const updateLocalStorage = (need: Need, token: string) => {
    const needs = JSON.parse(localStorage.getItem("needs") || "[]");
    const newNeed = {
      needId: need.id,
      deletionToken: token,
    };
    localStorage.setItem("needs", JSON.stringify([...needs, newNeed]));
  };
  const router = useRouter();
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

            return;
          }
          router.push(`/${data.need.id}`);
          toast.success("Request created successfully!"); // Show success notification
          updateLocalStorage(data.need, data.token);
          target.reset(); // Reset the form after success
        })
        .catch(() => {
          setError("Something went wrong!");
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="max-w-md mx-auto md:p-8 md:shadow md:border md:rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        {t("heading")}
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="category">{t("requestType")}</Label>

          <Select name="category" required>
            <SelectTrigger id="category">
              <SelectValue placeholder={t("selectRequestType")} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Category).map((category) => (
                <SelectItem key={category} value={category}>
                  {t(category.toLowerCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">{t("description")}</Label>
          <Textarea
            name="description"
            id="description"
            placeholder={t("descriptionPlaceholder")}
            required
            maxLength={150}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="area">{t("location")}</Label>
          <Input
            id="area"
            name="area"
            placeholder={t("locationPlaceholder")}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact">{t("contact")}</Label>
          <Input
            id="contact"
            name="contact"
            type="tel"
            placeholder={t("contactPlaceholder")}
            required
          />
        </div>

        <Alert>
          <GoAlert className="h-4 w-4" />
          <AlertDescription className="leading-7">
            {t("disclaimer")}
          </AlertDescription>
        </Alert>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Submitting..." : t("submit")}
        </Button>
      </form>
    </div>
  );
};

export default ReceivePage;
