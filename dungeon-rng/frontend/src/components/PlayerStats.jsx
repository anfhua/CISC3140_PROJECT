function PlayerStats({ coins, weapon, upgrades }) {
  return (
    <div className="card">
      <h2>Player Stats</h2>

      <p>
        <strong>Coins:</strong> ${coins}
      </p>

      <p>
        <strong>Current Weapon:</strong> {weapon.name}
      </p>

      <p>
        <strong>Rarity:</strong> {weapon.rarity}
      </p>

      <p>
        <strong>Damage:</strong> {weapon.damage}
      </p>

      <hr />

      <p>Luck Level: {upgrades.luck}</p>
      <p>Damage Level: {upgrades.damage}</p>
      <p>Coin Level: {upgrades.coins}</p>
    </div>
  );
}

export default PlayerStats;