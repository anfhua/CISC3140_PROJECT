import { getRarityClass } from "../utils/rarityStyles";
import { getWeaponSellValue } from "../logic/weaponValue";

function WeaponSection({
  coins,
  spinCost,
  onSpin,
  isSpinning,
  lastSpunWeapon,
  inventory,
  currentWeapon,
  onEquipWeapon,
  onSellWeapon,
}) {
  return (
    <div className="card weapon-section">
      <h2>Weapons</h2>

      <div className="weapon-section-grid">
        <div>
          <h3>Weapon Roll</h3>

          <div className={`spin-box ${isSpinning ? "spinning" : ""}`}>
            {isSpinning ? (
              <span>🎲 Rolling...</span>
            ) : lastSpunWeapon ? (
              <div
                className={`spin-result ${getRarityClass(
                  lastSpunWeapon.rarity
                )}`}
              >
                <h3>{lastSpunWeapon.name}</h3>
                <p>{lastSpunWeapon.rarity}</p>
                <p>Damage: {lastSpunWeapon.damage}</p>
              </div>
            ) : (
              <span>Ready to roll</span>
            )}
          </div>

          <p>Roll cost: ${spinCost}</p>

          <button onClick={onSpin} disabled={coins < spinCost || isSpinning}>
            {isSpinning ? "Rolling..." : "Roll for Weapon"}
          </button>
        </div>

        <div>
          <h3>Weapon Inventory</h3>

          {inventory.length === 0 ? (
            <p>No weapons yet. Roll to get weapons.</p>
          ) : (
            <div className="inventory-list">
              {inventory.map((weapon, index) => {
                const isEquipped = currentWeapon.inventoryId === weapon.inventoryId;
                const sellValue = getWeaponSellValue(weapon);

                return (
                  <div
                    key={weapon.inventoryId}
                    className={`inventory-item ${getRarityClass(
                      weapon.rarity
                    )} ${isEquipped ? "equipped" : ""}`}
                  >
                    <div>
                      <h3>{weapon.name}</h3>
                      <p>{weapon.rarity}</p>
                      <p>Damage: {weapon.damage}</p>
                      <p>Sell value: ${sellValue}</p>
                    </div>

                    <div className="inventory-actions">
                      <button
                        onClick={() => onEquipWeapon(weapon)}
                        disabled={isEquipped}
                      >
                        {isEquipped ? "Equipped" : "Equip"}
                      </button>

                      <button
                        className="sell-button"
                        onClick={() => onSellWeapon(weapon)}
                        disabled={isEquipped}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeaponSection;