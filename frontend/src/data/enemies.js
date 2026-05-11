const BASE_URL = import.meta.env.BASE_URL;

export const enemyTemplates = [
  {
    id: 1,
    name: "Unemployed Cat",
    baseHealth: 30,
    baseReward: 15,
    image: `${BASE_URL}images/hobo.png`,
    isBoss: false,
  },
  {
    id: 2,
    name: "Productive Cat",
    baseHealth: 70,
    baseReward: 35,
    image: `${BASE_URL}images/dum.png`,
    isBoss: false,
  },
  {
    id: 3,
    name: "Clown Cat",
    baseHealth: 140,
    baseReward: 75,
    image: `${BASE_URL}images/clown.png`,
    isBoss: false,
  },
  {
    id: 4,
    name: "The Cat Boss",
    baseHealth: 350,
    baseReward: 200,
    image: `${BASE_URL}images/boss.png`,
    isBoss: true,
  },
];