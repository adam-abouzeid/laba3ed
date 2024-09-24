import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex  justify-around bg-red-400 h-[100px] items-center">
      <Image
        src="/images/image.png"
        width={100}
        height={100}
        alt="Lebanese Flag"
      />
      <div className="flex gap-4">
        <Link href="/">Requests</Link>

        <Link href="/request">Receive</Link>
      </div>
    </div>
  );
};

export default Navbar;
