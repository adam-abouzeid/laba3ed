import RecaptchaProvider from "@/components/recaptcha-provider";

export const metadata = {
  title: "Receive",
  description: "Submit a request for help",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RecaptchaProvider>{children}</RecaptchaProvider>;
}
