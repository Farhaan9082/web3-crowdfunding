import Loader from "@/campaign/Loader";
import User from "@/assets/user-icon.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { calculateBarPercentage, daysLeft } from "utils";
import { useStateContext } from "context";
import Button from "@/shared/Button";
import CountBox from "@/campaign/CountBox";
import { ParsedUrlQuery } from "querystring";
import Page from "@/shared/Page";

interface QueryProps extends ParsedUrlQuery {
  pId: string;
  title: string;
  owner: string;
  description: string;
  deadline: string;
  amountCollected: string;
  image: string;
  target: string;
}

export default function CampaignDetails({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const { donate, getDonations, contract, address } = useStateContext();

  const router = useRouter();
  const state = router.query as QueryProps;
  const remainingDays = daysLeft(Number(state.deadline));

  const fetchDonators = async () => {
    const data = await getDonations(Number(state.pId));
    setDonators(data);
  };

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    router.push("/");
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && state.pId != undefined) fetchDonators();
  }, [contract, address, state]);

  return (
    <Page title="Campaign Details">
      <div className="container py-8">
        {isLoading && <Loader />}

        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={state.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    Number(state.target),
                    Number(state.amountCollected)
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox
              title={`Raised of ${state.target}`}
              value={state.amountCollected}
            />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>

        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <Image
                    src={User}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {state.owner}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    10 Campaigns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Story
              </h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {state.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Donators
              </h4>

              <div className="mt-[20px] flex flex-col gap-4 lg:max-w-lg">
                {donators.length > 0 ? (
                  donators.map((item: any, index: number) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] truncate">
                        {index + 1}. {item.donator}
                      </p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Fund
            </h4>

            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
              <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund the campaign
              </p>
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                    Back it because you believe in it.
                  </h4>
                  <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                    Support the project for no reward, just because it speaks to
                    you.
                  </p>
                </div>

                <Button
                  type="button"
                  title="Fund Campaign"
                  bg="bg-[#8c6dfd] w-full"
                  onClick={handleDonate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
