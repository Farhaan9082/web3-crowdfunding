import Image from "next/image";
import Load from "@/assets/loader.svg";
import FundCard from "./FundCard";
import Link from "next/link";
import { useStateContext } from "context";

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
  const { searchTerm } = useStateContext();

  return (
    <div className="container py-8">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[20px] gap-[26px]">
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
          campaigns
            .filter((campaign: any) => {
              if (searchTerm == "") {
                return campaign;
              } else if (
                campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return campaign;
              }
            })
            .map((campaign: any) => (
              <Link
                href={{
                  pathname: `/campaign-details/${campaign.title}`,
                  query: campaign,
                }}
                key={campaign.pId}
              >
                <FundCard {...campaign} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
