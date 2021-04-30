import React from "react";
import { useGameStore } from "../engine/game";
import { RealEstate } from "../engine/types";

import ReactTooltip from "react-tooltip";

export const FactoryMarketplace: React.FC = () => {
  const usd = useGameStore((state) => state.usd);
  const phase = useGameStore((state) => state.phase);
  const acquireProperty = useGameStore((state) => state.acquireProperty);
  const realEstate = useGameStore((state) => state.realEstate);
  const spendUSD = useGameStore((state) => state.spendUSD);

  React.useEffect(() => {
    ReactTooltip.rebuild();
  }, [usd, phase]);

  if (phase < 2 || realEstate.length >= 3) return null;

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
            spendUSD(5000);
          }}
          disabled={usd < 5000}
          data-tip="Multiply hash rate by 1.3x"
        >
          Buy a server warehouse for mining ($5,000)
        </button>
      )}
      {!realEstate.includes(RealEstate.MemeFactory) && (
        <button
          onClick={() => {
            acquireProperty(RealEstate.MemeFactory);
            spendUSD(8000);
          }}
          disabled={usd < 8000}
          data-tip="Generate memes"
        >
          Buy a meme factory ($8,000)
        </button>
      )}
      {!realEstate.includes(RealEstate.Pool) && (
        <button
          onClick={() => {
            acquireProperty(RealEstate.Pool);
            spendUSD(40000);
          }}
          disabled={usd < 40000}
          data-tip="Pools are cool"
        >
          Buy a pool ($40,000)
        </button>
      )}
    </div>
  );
};
