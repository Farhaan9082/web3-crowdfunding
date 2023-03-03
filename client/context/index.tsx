import { ethers } from "ethers";
import { useContext, createContext, useState } from "react";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import abi from "../abi/CrowdFunding.json";

interface FormProps {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

interface CampaignProps {
  owner: string;
  title: string;
  description: string;
  target: { toString: () => ethers.BigNumberish };
  deadline: { toNumber: () => number };
  amountCollected: { toString: () => ethers.BigNumberish };
  image: string;
  donators: string[];
  donations: number[];
}

const StateContext = createContext<any>({});

export const StateContextProvider = ({ children }: any) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [searchTerm, setSearchTerm] = useState("");

  const contract = useContract({
    address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    abi: abi.abi,
    signerOrProvider: signer,
  });

  const { data: campaigns }: any = useContractRead({
    address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    abi: abi.abi,
    functionName: "getCampaigns",
  });

  const publishCampaign = async (form: FormProps) => {
    try {
      const tx = await contract?.createCampaign(
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      );
      await tx.wait();
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const parsedCampaings = campaigns.map(
      (campaign: CampaignProps, i: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
      })
    );

    return parsedCampaings;
  };

  const donate = async (pId: number, amount: string) => {
    const data = await contract?.donateToCampaign(pId, {
      value: ethers.utils.parseEther(amount),
    });
    await data.wait();

    return data;
  };

  const getDonations = async (pId: number) => {
    const donations = await contract?.getDonators(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        publishCampaign,
        getCampaigns,
        donate,
        getDonations,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
