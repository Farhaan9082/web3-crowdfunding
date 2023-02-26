import { ethers } from "ethers";
import { useContext, createContext } from "react";
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

  return (
    <StateContext.Provider value={{ publishCampaign, getCampaigns, address }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
