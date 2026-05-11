import { useState } from "react";

import { weapons } from "./data/weapons";
import { enemies } from "./data/enemies";

import { spinWeapon } from "./logic/spinWeapon";
import { attackEnemy } from "./logic/combat";
import { calculateReward, getUpgradeCost } from "./logic/economy";
import { getWeaponSellValue } from "./logic/weaponValue";

import PlayerStats from "./components/PlayerStats";
import EnemyPanel from "./components/EnemyPanel";
import UpgradeShop from "./components/UpgradeShop";
import GameLog from "./components/GameLog";
import WeaponSection from "./components/WeaponSection";

function createInventoryWeapon(weapon) {
  return {
    ...weapon,
    inventoryId: crypto.randomUUID(),
  };
}

function App() {
  const spinCost = 25;

  const starterWeapon = createInventoryWeapon(weapons[0]);

  const [coins, setCoins] = useState(100);
  const [weapon, setWeapon] = useState(starterWeapon);
  const [inventory, setInventory] = useState([starterWeapon]);
  const [lastSpunWeapon, setLastSpunWeapon] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const [enemyIndex, setEnemyIndex] = useState(0);

  const [currentEnemy, setCurrentEnemy] = useState({
    ...enemies[0],
    currentHealth: enemies[0].health,
  });

  const [upgrades, setUpgrades] = useState({
    luck: 0,
    damage: 0,
    coins: 0,
  });

  const [logs, setLogs] = useState([
    "Welcome to Dungeon RNG!",
    "Defeat enemies, earn coins, roll weapons, and upgrade your power.",
  ]);

  function addLog(message) {
    setLogs((prevLogs) => [message, ...prevLogs].slice(0, 12));
  }

  function handleSpin() {
    if (coins < spinCost || isSpinning) {
      addLog("Not enough coins to roll.");
      return;
    }

    setCoins((prevCoins) => prevCoins - spinCost);
    setIsSpinning(true);
    setLastSpunWeapon(null);

    setTimeout(() => {
      const rolledWeapon = spinWeapon(upgrades.luck);
      const inventoryWeapon = createInventoryWeapon(rolledWeapon);

      setWeapon(inventoryWeapon);
      setInventory((prevInventory) => [inventoryWeapon, ...prevInventory]);
      setLastSpunWeapon(inventoryWeapon);
      setIsSpinning(false);

      addLog(
        `You rolled ${inventoryWeapon.name} (${inventoryWeapon.rarity}) and equipped it.`
      );
    }, 1000);
  }

  function handleAttack() {
    const result = attackEnemy(currentEnemy, weapon, upgrades.damage);

    if (result.enemyDefeated) {
      const reward = calculateReward(currentEnemy, upgrades.coins);

      setCoins((prevCoins) => prevCoins + reward);

      addLog(`You defeated ${currentEnemy.name} and earned $${reward}!`);

      const nextEnemyIndex = Math.min(enemyIndex + 1, enemies.length - 1);
      const nextEnemy = enemies[nextEnemyIndex];

      setEnemyIndex(nextEnemyIndex);
      setCurrentEnemy({
        ...nextEnemy,
        currentHealth: nextEnemy.health,
      });

      if (nextEnemyIndex === enemies.length - 1) {
        addLog("The Dungeon Dragon awaits...");
      }
    } else {
      setCurrentEnemy(result.enemy);
      addLog(`You dealt ${result.damageDealt} damage to ${currentEnemy.name}.`);
    }
  }

  function handleBuyUpgrade(upgrade) {
    const currentLevel = upgrades[upgrade.id];
    const cost = getUpgradeCost(upgrade.baseCost, currentLevel);

    if (coins < cost) {
      addLog("Not enough coins for this upgrade.");
      return;
    }

    setCoins((prevCoins) => prevCoins - cost);

    setUpgrades((prevUpgrades) => ({
      ...prevUpgrades,
      [upgrade.id]: prevUpgrades[upgrade.id] + 1,
    }));

    addLog(`Purchased ${upgrade.name}.`);
  }

  function handleEquipWeapon(selectedWeapon) {
    setWeapon(selectedWeapon);
    addLog(`Equipped ${selectedWeapon.name}.`);
  }

  function handleSellWeapon(selectedWeapon) {
    if (selectedWeapon.inventoryId === weapon.inventoryId) {
      addLog("You cannot sell your equipped weapon.");
      return;
    }

    const sellValue = getWeaponSellValue(selectedWeapon);

    setInventory((prevInventory) =>
      prevInventory.filter(
        (item) => item.inventoryId !== selectedWeapon.inventoryId
      )
    );

    setCoins((prevCoins) => prevCoins + sellValue);

    addLog(`Sold ${selectedWeapon.name} for $${sellValue}.`);
  }

  function handleReset() {
    const newStarterWeapon = createInventoryWeapon(weapons[0]);

    setCoins(100);
    setWeapon(newStarterWeapon);
    setInventory([newStarterWeapon]);
    setLastSpunWeapon(null);
    setIsSpinning(false);
    setEnemyIndex(0);

    setCurrentEnemy({
      ...enemies[0],
      currentHealth: enemies[0].health,
    });

    setUpgrades({
      luck: 0,
      damage: 0,
      coins: 0,
    });

    setLogs(["Game restarted."]);
  }

  return (
    <main className="app">
      <header className="game-header">
        <h1>Dungeon RNG</h1>
        <p>Roll for weapons. Defeat enemies. Upgrade your luck.</p>
        <button onClick={handleReset}>Reset Game</button>
      </header>

      <section className="enemy-top-section">
        <EnemyPanel enemy={currentEnemy} onAttack={handleAttack} />
      </section>

      <section className="game-layout">
        <div className="player-dashboard">
          <h2 className="dashboard-title">Player Dashboard</h2>

          <div className="player-dashboard-grid">
            <PlayerStats coins={coins} weapon={weapon} upgrades={upgrades} />

            <UpgradeShop
              coins={coins}
              upgrades={upgrades}
              onBuyUpgrade={handleBuyUpgrade}
            />

            <WeaponSection
              coins={coins}
              spinCost={spinCost}
              onSpin={handleSpin}
              isSpinning={isSpinning}
              lastSpunWeapon={lastSpunWeapon}
              inventory={inventory}
              currentWeapon={weapon}
              onEquipWeapon={handleEquipWeapon}
              onSellWeapon={handleSellWeapon}
            />
          </div>
        </div>

        <aside className="log-sidebar">
          <GameLog logs={logs} />
        </aside>
      </section>
    </main>
  );
}

export default App;