import FormField from "@/campaign/FormField";
import Loader from "@/campaign/Loader";
import Page from "@/shared/Page";
import Money from "@/assets/money.svg";
import Image from "next/image";
import Button from "@/shared/Button";
import { useState } from "react";
import { ethers } from "ethers";
import { checkIfImage } from "utils";
import { useRouter } from "next/router";
import { useStateContext } from "context";

export default function CreateCampaign() {
  const router = useRouter();
  const { publishCampaign } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormChange = (e: any, field: string) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists: boolean) => {
      if (exists) {
        setLoading(true);
        await publishCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setLoading(false);
        router.push("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <Page title="Create Campaign">
      <div className="container py-8">
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          {loading && <Loader />}
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Start a Campaign
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                label="Your Name *"
                placeholder="John Doe"
                type="text"
                value={form.name}
                handleChange={(e: any) => {
                  handleFormChange(e, "name");
                }}
              />
              <FormField
                label="Campaign Title *"
                placeholder="Write a title"
                type="text"
                value={form.title}
                handleChange={(e: any) => {
                  handleFormChange(e, "title");
                }}
              />
            </div>
            <FormField
              label="Story *"
              placeholder="Write your story"
              isTextArea
              value={form.description}
              handleChange={(e: any) => {
                handleFormChange(e, "description");
              }}
            />
            <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
              <div className="w-[40px] h-[40px] pl-2">
                <Image src={Money} alt="money" className="object-contain" />
              </div>
              <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                You will get 100% of the raised amount
              </h4>
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                label="Goal *"
                placeholder="ETH 0.50"
                type="text"
                value={form.target}
                handleChange={(e: any) => {
                  handleFormChange(e, "target");
                }}
              />
              <FormField
                label="End Date *"
                placeholder="End Date"
                type="date"
                value={form.deadline}
                handleChange={(e: any) => {
                  handleFormChange(e, "deadline");
                }}
              />
            </div>
            <FormField
              label="Campaign image *"
              placeholder="Place image URL of your campaign"
              type="url"
              value={form.image}
              handleChange={(e: any) => {
                handleFormChange(e, "image");
              }}
            />
            <div className="flex justify-center items-center mt-[40px]">
              <Button
                type="submit"
                title="Submit new campaign"
                bg="bg-[#1dc071]"
              />
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}
