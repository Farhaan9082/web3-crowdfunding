import DisplayCampaigns from "@/home/DisplayCampaigns";
import Page from "@/shared/Page";
import { useStateContext } from "context";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (address) fetchCampaigns();
  }, [address]);

  return (
    <Page title="Home">
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Page>
  );
}
