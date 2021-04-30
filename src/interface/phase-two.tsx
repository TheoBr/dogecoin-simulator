import React from "react";
import { useGameStore } from "../engine/game";
import { RealEstate } from "../engine/types";

export const FactoryMarketplace: React.FC = () => {
  const usd = useGameStore((state) => state.usd);
  const phase = useGameStore((state) => state.phase);
  const acquireProperty = useGameStore((state) => state.acquireProperty);
  const realEstate = useGameStore((state) => state.realEstate);
  const spendUSD = useGameStore((state) => state.spendUSD);

  if (phase < 2) return null;

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        padding: 10,
        borderRadius: 8,
        maxWidth: 300,
        margin: 20,
      }}
    >
      <div style={{ fontWeight: "bold", color: "white", paddingBottom: 10 }}>
        DOGE ESTATE
      </div>
      {!realEstate.includes(RealEstate.Server) && (
        <button
          onClick={() => {
            acquireProperty(RealEstate.Server);
            spendUSD(50000);
          }}
          disabled={usd < 50000}
        >
          Buy a server warehouse for mining ($50,000)
        </button>
      )}
      {!realEstate.includes(RealEstate.MemeFactory) && (
        <button
          onClick={() => {
            acquireProperty(RealEstate.MemeFactory);
            spendUSD(20000);
          }}
          disabled={usd < 20000}
        >
          Buy a meme factory ($20,000)
        </button>
      )}
      {!realEstate.includes(RealEstate.Pool) && (
        <button
          onClick={() => {
            acquireProperty(RealEstate.Pool);
            spendUSD(100000);
          }}
          disabled={usd < 100000}
        >
          Buy a pool ($100,000)
        </button>
      )}
    </div>
  );
};
