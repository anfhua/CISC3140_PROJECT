import { upgrades as upgradeData } from "../data/upgrades";
import { getUpgradeCost } from "../logic/economy";

function UpgradeShop({ coins, upgrades, onBuyUpgrade }) {
  return (
    <div className="card">
      <h2>Upgrade Shop</h2>

      {upgradeData.map((upgrade) => {
        const level = upgrades[upgrade.id];
        const cost = getUpgradeCost(upgrade.baseCost, level);

        return (
          <div key={upgrade.id} className="upgrade-item">
            <h3>{upgrade.name}</h3>
            <p>{upgrade.description}</p>
            <p>Level: {level}</p>
            <p>Cost: ${cost}</p>

            <button
              onClick={() => onBuyUpgrade(upgrade)}
              disabled={coins < cost}
            >
              Buy Upgrade
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default UpgradeShop;