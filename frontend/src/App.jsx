import { useState } from "react";

import { weapons } from "./data/weapons";

import { spinWeapon } from "./logic/spinWeapon";
import { attackEnemy } from "./logic/combat";
import { calculateReward, getUpgradeCost } from "./logic/economy";
import { getWeaponSellValue } from "./logic/weaponValue";
import { getFirstEnemy, getNextEnemy } from "./logic/dungeon";

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

  const [dungeonLevel, setDungeonLevel] = useState(1);
  const [enemyIndex, setEnemyIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(getFirstEnemy(1));

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
    const result = attackEnemy(
      currentEnemy,
      weapon,
      upgrades.damage,
      upgrades.luck
    );

    if (result.enemyDefeated) {
      const reward = calculateReward(currentEnemy, upgrades.coins);

      setCoins((prevCoins) => prevCoins + reward);

      if (result.isCriticalHit) {
        addLog(
          `CRITICAL HIT! You defeated ${currentEnemy.name} and earned $${reward}!`
        );
      } else {
        addLog(`You defeated ${currentEnemy.name} and earned $${reward}!`);
      }

      const nextStage = getNextEnemy(enemyIndex, dungeonLevel);

      setEnemyIndex(nextStage.nextEnemyIndex);
      setDungeonLevel(nextStage.nextDungeonLevel);
      setCurrentEnemy(nextStage.enemy);

      if (nextStage.advancedDungeon) {
        addLog(`You cleared Dungeon Level ${dungeonLevel}!`);
        addLog(`Entering Dungeon Level ${nextStage.nextDungeonLevel}.`);
      } else if (nextStage.enemy.isBoss) {
        addLog(`Boss stage reached: ${nextStage.enemy.name}!`);
      }
    } else {
      setCurrentEnemy(result.enemy);

      if (result.isCriticalHit) {
        addLog(
          `CRITICAL HIT! You dealt ${result.damageDealt} damage to ${currentEnemy.name}.`
        );
      } else {
        addLog(`You dealt ${result.damageDealt} damage to ${currentEnemy.name}.`);
      }
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

    setDungeonLevel(1);
    setEnemyIndex(0);
    setCurrentEnemy(getFirstEnemy(1));

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
            <PlayerStats
              coins={coins}
              weapon={weapon}
              upgrades={upgrades}
              dungeonLevel={dungeonLevel}
            />

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