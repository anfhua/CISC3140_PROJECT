import { getRarityClass } from "../utils/rarityStyles";

function PlayerStats({ coins, weapon, upgrades }) {
  const damageBonus = upgrades.damage * 5;
  const totalDamage = weapon.damage + damageBonus;

  return (
    <div className="card">
      <h2>Player</h2>

      <div className="character-area">
        <div className="player-avatar">🧙‍♂️</div>

        <div>
          <h3>Dungeon Adventurer</h3>
          <p>
            <strong>Coins:</strong> ${coins}
          </p>
        </div>
      </div>

      <div className={`weapon-card ${getRarityClass(weapon.rarity)}`}>
        <h3>{weapon.name}</h3>
        <p>
          <strong>Rarity:</strong> {weapon.rarity}
        </p>
        <p>
          <strong>Weapon Damage:</strong> {weapon.damage}
        </p>
        <p>
          <strong>Total Damage:</strong> {totalDamage}{" "}
          <span className="stat-bonus">(+{damageBonus} Upgrade Bonus)</span>
        </p>
      </div>

      <hr />

      <div className="stats-list">
        <p>
          <strong>Luck Upgrade:</strong> Level {upgrades.luck}
        </p>
        <p>
          <strong>Damage Upgrade:</strong> Level {upgrades.damage}
        </p>
        <p>
          <strong>Coin Upgrade:</strong> Level {upgrades.coins}
        </p>
      </div>
    </div>
  );
}

export default PlayerStats;