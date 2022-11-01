import React, { useState } from "react";
import { useEffect } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert, setErrorMessage } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate("/create-battle"), 8000);
      }
    } catch (error) {
      // setErrorMessage(error);
      setShowAlert({
        status: true,
        type: "failure",
        message: `Bruhh`,
      });
    }
  };

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTOkenExists = await contract.isPlayerToken(walletAddress);
    };
  }, [contract]);

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> Web3 Battle Card Game
  </>
);
