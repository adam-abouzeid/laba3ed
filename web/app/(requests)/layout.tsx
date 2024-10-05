import RequestButton from "@/components/request-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <RequestButton />
    </>
  );
}
