import { enemyTemplates } from "../data/enemies";

export function createEnemy(template, dungeonLevel) {
  const levelMultiplier = 1 + (dungeonLevel - 1) * 0.45;
  const bossMultiplier = template.isBoss ? 1.8 : 1;

  const health = Math.floor(
    template.baseHealth * levelMultiplier * bossMultiplier
  );

  const reward = Math.floor(
    template.baseReward * levelMultiplier * bossMultiplier
  );

  return {
    ...template,
    dungeonLevel,
    health,
    currentHealth: health,
    reward,
  };
}

export function getFirstEnemy(dungeonLevel) {
  return createEnemy(enemyTemplates[0], dungeonLevel);
}

export function getNextEnemy(currentEnemyIndex, dungeonLevel) {
  const nextEnemyIndex = currentEnemyIndex + 1;

  if (nextEnemyIndex >= enemyTemplates.length) {
    return {
      nextEnemyIndex: 0,
      nextDungeonLevel: dungeonLevel + 1,
      enemy: createEnemy(enemyTemplates[0], dungeonLevel + 1),
      advancedDungeon: true,
    };
  }

  return {
    nextEnemyIndex,
    nextDungeonLevel: dungeonLevel,
    enemy: createEnemy(enemyTemplates[nextEnemyIndex], dungeonLevel),
    advancedDungeon: false,
  };
}