import Image from "next/image";
import Load from "@/assets/loader.svg";
import FundCard from "./FundCard";

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: any;
}

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsProps) => {
  return (
    <div className="container py-8">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Image
            src={Load}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign: any) => (
            <FundCard key={campaign.pId} {...campaign} handleClick={() => {}} />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
