export function calculateReward(enemy, coinLevel) {
  const multiplier = 1 + coinLevel * 0.25;
  return Math.floor(enemy.reward * multiplier);
}

export function getUpgradeCost(baseCost, currentLevel) {
  return Math.floor(baseCost * (currentLevel + 1) * 1.5);
}