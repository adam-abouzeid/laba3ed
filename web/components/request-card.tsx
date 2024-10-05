"use client";

import { Need } from "@prisma/client";
import { GoLocation } from "react-icons/go";
import { format, formatDistanceToNow } from "date-fns";
import ReportButton from "./report-button";
import { Badge } from "@/components/ui/badge";

const RequestCard = ({ request }: { request: Need }) => {
  const createdAt = new Date(request.createdAt);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return (
    <div className="bg-background shadow rounded-lg border transition-shadow duration-200 flex flex-col justify-between">
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <Badge variant={"outline"}>
            {request.category[0] + request.category.slice(1).toLowerCase()}
          </Badge>
          <p className="flex items-center ">
            <GoLocation className="inline-block shrink-0 mr-1" />
            {request.area}
          </p>
        </div>

        <p className="leading-7 mb-2">{request.description}</p>
        <a href={`tel:${request.contact}`} className="font-semibold">
          {request.contact}
        </a>
      </div>

      <div className="flex justify-between items-center bg-secondary p-3">
        <time className="text-secondary-foreground text-sm">
          {createdAt > sevenDaysAgo
            ? formatDistanceToNow(createdAt, { addSuffix: true })
            : format(createdAt, "MMMM d, yyyy")}
        </time>

        <ReportButton requestId={request.id} />
      </div>
    </div>
  );
};

export default RequestCard;
