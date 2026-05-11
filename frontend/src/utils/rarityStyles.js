export function getRarityClass(rarity) {
  switch (rarity) {
    case "Common":
      return "rarity-common";
    case "Uncommon":
      return "rarity-uncommon";
    case "Rare":
      return "rarity-rare";
    case "Epic":
      return "rarity-epic";
    case "Legendary":
      return "rarity-legendary";
    default:
      return "rarity-common";
  }
}