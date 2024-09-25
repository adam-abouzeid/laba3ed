import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <div className="flex  justify-around bg-[#dfdddd] h-[100px] items-center">
      <Image
        src="/images/logo.jpeg"
        width={100}
        height={100}
        alt="Lebanese Flag"
      />
      <div className="flex gap-4">
        <Link href="/">
          <Button>Requests</Button>
        </Link>

        <Link href="/request">
          <Button variant={"outline"}>Receive</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
