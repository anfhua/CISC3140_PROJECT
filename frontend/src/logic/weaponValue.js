export function getWeaponSellValue(weapon) {
  switch (weapon.rarity) {
    case "Common":
      return 5;
    case "Uncommon":
      return 15;
    case "Rare":
      return 40;
    case "Epic":
      return 100;
    case "Legendary":
      return 250;
    default:
      return 5;
  }
}