import { useState } from "react";

import { weapons } from "./data/weapons";
import { enemies } from "./data/enemies";
import { upgrades as upgradeData } from "./data/upgrades";

import { spinWeapon } from "./logic/spinWeapon";
import { attackEnemy } from "./logic/combat";
import { calculateReward, getUpgradeCost } from "./logic/economy";

import PlayerStats from "./components/PlayerStats";
import WeaponSpin from "./components/WeaponSpin";
import EnemyPanel from "./components/EnemyPanel";
import UpgradeShop from "./components/UpgradeShop";
import GameLog from "./components/GameLog";

function App() {
  const spinCost = 25;

  const [coins, setCoins] = useState(100);
  const [weapon, setWeapon] = useState(weapons[0]);
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
    "Welcome to Dungeon Spinner!",
    "Defeat enemies, earn coins, spin weapons, and upgrade your power.",
  ]);

  function addLog(message) {
    setLogs((prevLogs) => [message, ...prevLogs].slice(0, 8));
  }

  function handleSpin() {
    if (coins < spinCost) {
      addLog("Not enough coins to spin.");
      return;
    }

    const newWeapon = spinWeapon(upgrades.luck);

    setCoins((prevCoins) => prevCoins - spinCost);
    setWeapon(newWeapon);

    addLog(`You spun and received: ${newWeapon.name} (${newWeapon.rarity})`);
  }

  function handleAttack() {
    const result = attackEnemy(currentEnemy, weapon, upgrades.damage);

    if (result.enemyDefeated) {
      const reward = calculateReward(currentEnemy, upgrades.coins);

      setCoins((prevCoins) => prevCoins + reward);

      addLog(
        `You defeated ${currentEnemy.name} and earned $${reward}!`
      );

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
      addLog(
        `You dealt ${result.damageDealt} damage to ${currentEnemy.name}.`
      );
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

  function handleReset() {
    setCoins(100);
    setWeapon(weapons[0]);
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
        <h1>Dungeon Spinner</h1>
        <p>Spin weapons. Defeat enemies. Upgrade your luck.</p>
        <button onClick={handleReset}>Reset Game</button>
      </header>

      <section className="game-grid">
        <PlayerStats
          coins={coins}
          weapon={weapon}
          upgrades={upgrades}
        />

        <EnemyPanel enemy={currentEnemy} onAttack={handleAttack} />

        <WeaponSpin
          coins={coins}
          spinCost={spinCost}
          onSpin={handleSpin}
        />

        <UpgradeShop
          coins={coins}
          upgrades={upgrades}
          onBuyUpgrade={handleBuyUpgrade}
        />

        <GameLog logs={logs} />
      </section>
    </main>
  );
}

export default App;