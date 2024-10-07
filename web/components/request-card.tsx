import { Need } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import RequestCardTime from "./request-card-time";
import { useTranslations } from "next-intl";
import { HiPhone } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

const RequestCard = ({ request }: { request: Need }) => {
  const t = useTranslations("categories");

  return (
    <Link
      href={`/${request.id}`}
      className="bg-background shadow rounded-lg border transition-shadow duration-200 flex flex-col justify-between"
    >
      <div className="p-3">
        <div className="flex justify-between">
          <Badge variant={"outline"}>{t(request.category.toLowerCase())}</Badge>

          <RequestCardTime createdAt={request.createdAt} />
        </div>

        <p className="leading-7 mt-4">{request.description}</p>
      </div>

      <div className="bg-secondary p-3 space-y-1.5">
        <div className="gap-1.5 flex items-center">
          <HiPhone className="shrink-0" />
          {request.contact}
        </div>

        <div className="gap-1.5 flex items-center">
          <IoLocationSharp className="shrink-0" />
          {request.area}
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
