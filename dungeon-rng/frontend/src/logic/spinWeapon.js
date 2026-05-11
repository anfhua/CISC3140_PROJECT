import { weapons } from "../data/weapons";

export function spinWeapon(luckLevel) {
  const luckBonus = luckLevel * 2;

  const adjustedWeapons = weapons.map((weapon) => {
    if (weapon.rarity === "Rare") {
      return { ...weapon, chance: weapon.chance + luckBonus };
    }

    if (weapon.rarity === "Epic") {
      return { ...weapon, chance: weapon.chance + luckBonus };
    }

    if (weapon.rarity === "Legendary") {
      return { ...weapon, chance: weapon.chance + Math.floor(luckBonus / 2) };
    }

    return weapon;
  });

  const totalChance = adjustedWeapons.reduce(
    (sum, weapon) => sum + weapon.chance,
    0
  );

  let roll = Math.random() * totalChance;

  for (const weapon of adjustedWeapons) {
    if (roll < weapon.chance) {
      return weapon;
    }

    roll -= weapon.chance;
  }

  return adjustedWeapons[0];
}