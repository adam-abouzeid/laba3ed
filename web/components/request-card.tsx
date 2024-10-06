import { Need } from "@prisma/client";
import { GoLocation } from "react-icons/go";
import ReportButton from "./report-button";
import { Badge } from "@/components/ui/badge";
import RequestCardTime from "./request-card-time";
import { useTranslations } from "next-intl";
import DeleteRequest from "./request-delete";

const RequestCard = ({ request }: { request: Need }) => {
  const t = useTranslations("categories");

  return (
    <div className="bg-background shadow rounded-lg border transition-shadow duration-200 flex flex-col justify-between">
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <Badge variant={"outline"}>{t(request.category.toLowerCase())}</Badge>

          <p className="flex items-center gap-2">
            <GoLocation className="inline-block shrink-0 mr-1" />
            {request.area}
            <DeleteRequest requestId={request.id} />
          </p>
        </div>

        <p className="leading-7 mb-2">{request.description}</p>
        <a href={`tel:${request.contact}`} className="font-semibold">
          {request.contact}
        </a>
      </div>

      <div className="flex justify-between items-center bg-secondary p-3">
        <RequestCardTime createdAt={request.createdAt} />
        <ReportButton requestId={request.id} />
      </div>
    </div>
  );
};

export default RequestCard;
