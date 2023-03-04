import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Search from "@/assets/search.svg";
import CustomConnectButton from "./CustomConnectButton";
import Link from "next/link";
import { useStateContext } from "context";

const Navbar = () => {
  const { setSearchTerm } = useStateContext();

  return (
    <nav className="container py-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-8">
          <Link href="/" className="bg-[#2c2f32] p-3 rounded-lg w-fit">
            <Image className="w-7" alt="logo" src={Logo} />
          </Link>
          <div className="hidden lg:block">
            <div className="w-[458px] flex flex-row py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
              <input
                type="text"
                placeholder="Search for campaigns"
                className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                <Image
                  className="w-[15px] h-[15px] object-contain"
                  alt="search"
                  src={Search}
                />
              </div>
            </div>
          </div>
        </div>
        <CustomConnectButton />
      </div>
      <div className="mt-8 lg:hidden">
        <div className="lg:flex-1 flex flex-row py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            type="text"
            placeholder="Search for campaigns"
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <Image
              className="w-[15px] h-[15px] object-contain"
              alt="search"
              src={Search}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
