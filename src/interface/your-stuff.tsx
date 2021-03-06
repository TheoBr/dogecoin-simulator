import React from "react";
import { DogeCounter } from "../common/doge-countup";
import { Header } from "../common/header";
import { useGameStore, useHashRate } from "../engine/game";
import "../odometer.css";
import Modal from "react-modal";
import { SettingsModal } from "./settings-modal";
import ReactGA from "react-ga";

const DogeIcon = () => (
  <img
    src="/assets/dogecoin-logo.png"
    style={{ height: "1rem", paddingRight: "0.5rem" }}
  />
);

export const MyStuff: React.FC = () => {
  const gameStore = useGameStore();
  const hashRate = useHashRate();

  const [isResetModalOpen, setResetModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (isResetModalOpen) {
      ReactGA.modalview("/settings");
    }
  }, [isResetModalOpen]);

  return (
    <div className="panel my-panel">
      <Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Much Inventory
          <img
            src="/assets/crappy-gear.svg"
            style={{ height: "1.5rem", cursor: "pointer" }}
            onClick={() => {
              setResetModalOpen(true);
              gameStore.pause();
            }}
          />
        </div>
      </Header>
      <Modal
        isOpen={isResetModalOpen}
        onRequestClose={() => {
          setResetModalOpen(false);
          gameStore.resume();
        }}
        ariaHideApp={false}
        style={{ overlay: { zIndex: 1000 } }}
      >
        <SettingsModal
          closeModal={() => {
            setResetModalOpen(false);
            gameStore.resume();
          }}
        />
      </Modal>
      <div
        style={{
          padding: 10,
          fontFamily: "Comic Mono",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ paddingRight: "0.5rem" }}>Dogecoin:</div>
          <DogeCounter dogecoin={gameStore.dogecoin} />
          <DogeIcon />
        </div>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          USD: ${gameStore.usd.toFixed(2)}
        </div>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          Level: {gameStore.phase}
        </div>

        {(gameStore.largeMiners > 0 ||
          gameStore.mediumMiners > 0 ||
          gameStore.smallMiners > 0) && (
          <>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              Mining Stuff
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              HASH RATE: {hashRate.toFixed(2)}{" "}
              <div style={{ paddingRight: "0.2rem" }} />
              <DogeIcon /> per sec
            </div>

            {gameStore.smallMiners > 0 && (
              <div>Crappy Miners: {gameStore.smallMiners}</div>
            )}
            {gameStore.mediumMiners > 0 && (
              <div>Decent Miners: {gameStore.mediumMiners}</div>
            )}
            {gameStore.largeMiners > 0 && (
              <div>Good Miners: {gameStore.largeMiners}</div>
            )}
          </>
        )}
        {gameStore.realEstate.length > 0 && (
          <>
            <div style={{ marginTop: 10, fontWeight: "bold" }}>Properties</div>
            {gameStore.realEstate.map((place) => (
              <div key={place}>{place}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
