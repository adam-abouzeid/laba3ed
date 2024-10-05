"use client";

import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GoSearch, GoX } from "react-icons/go";

export default function Filter() {
  const t = useTranslations("requestsPage");

  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  const handleChangeCategory = (val: keyof typeof Category) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", val);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (search.length > 0) {
      params.set("q", search);
      params.set("page", "1");
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (search) return;

    const params = new URLSearchParams(searchParams);
    params.delete("q");
    router.replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div className="mb-6 flex gap-2">
      {/* Form to select category and submit */}

      <Select
        defaultValue={searchParams.get("category") || "ALL"}
        onValueChange={handleChangeCategory}
      >
        <SelectTrigger className="w-fit min-w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["ALL", ...Object.values(Category)].map((category) => (
            <SelectItem key={category} value={category}>
              {t(category.toLowerCase())}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <form className="flex-1 flex" onSubmit={handleSearch}>
        <div className="relative w-full">
          <Input
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="rounded-r-none peer"
          />
          {search.length > 0 && (
            <Button
              type="button"
              className="absolute right-0 top-0 rounded-full"
              size={"icon"}
              variant={"ghost"}
              onClick={() => setSearch("")}
            >
              <GoX className="size-4" />
            </Button>
          )}
        </div>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="rounded-l-none w-16 border-l-0 peer-focus:ring-1 peer-focus:ring-primary"
        >
          <GoSearch className="size-4" />
        </Button>
      </form>
    </div>
  );
}
