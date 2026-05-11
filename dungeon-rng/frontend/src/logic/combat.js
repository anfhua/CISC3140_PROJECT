export function attackEnemy(enemy, weapon, damageLevel) {
  const bonusDamage = damageLevel * 5;
  const totalDamage = weapon.damage + bonusDamage;

  const newHealth = enemy.currentHealth - totalDamage;

  return {
    damageDealt: totalDamage,
    enemyDefeated: newHealth <= 0,
    enemy: {
      ...enemy,
      currentHealth: Math.max(newHealth, 0),
    },
  };
}