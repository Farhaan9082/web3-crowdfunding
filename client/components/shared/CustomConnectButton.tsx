import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Button from "./Button";

function CustomConnectButton() {
  const router = useRouter();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openChainModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    title="Connect"
                    bg="bg-[#8c6dfd]"
                  />
                );
              } else {
                if (chain.unsupported) {
                  return (
                    <Button
                      onClick={openChainModal}
                      title="Wrong Network"
                      bg="bg-[#FF3D33]"
                    />
                  );
                } else {
                  return (
                    <Button
                      onClick={() => router.push("/create-campaign")}
                      title="Create a campaign"
                      bg="bg-[#1dc071]"
                    />
                  );
                }
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default CustomConnectButton;
