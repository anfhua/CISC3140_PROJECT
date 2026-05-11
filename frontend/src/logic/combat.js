export function getCriticalChance(luckLevel) {
  const baseCritChance = 10;
  const luckBonus = luckLevel * 2;

  return Math.min(baseCritChance + luckBonus, 50);
}

export function attackEnemy(enemy, weapon, damageLevel, luckLevel) {
  const damageBonus = damageLevel * 5;
  const baseDamage = weapon.damage + damageBonus;

  const criticalChance = getCriticalChance(luckLevel);
  const roll = Math.random() * 100;
  const isCriticalHit = roll < criticalChance;

  const totalDamage = isCriticalHit ? baseDamage * 2 : baseDamage;

  const newHealth = enemy.currentHealth - totalDamage;

  return {
    baseDamage,
    damageDealt: totalDamage,
    isCriticalHit,
    criticalChance,
    enemyDefeated: newHealth <= 0,
    enemy: {
      ...enemy,
      currentHealth: Math.max(newHealth, 0),
    },
  };
}