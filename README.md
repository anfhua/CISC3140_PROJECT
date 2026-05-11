# Dungeon RNG

Dungeon RNG is a small modular web game built with React and Vite. The main idea is a simple dungeon crawler where the player rolls for weapons, uses those weapons to defeat enemies, earns coins, and buys upgrades to improve future rolls and combat strength.

## Game Idea

The player starts with a basic weapon and a small amount of coins. The goal is to defeat enemies and progress through stronger dungeon monsters.

Core gameplay loop:

1. Attack enemies using your current weapon.
2. Defeat enemies to earn coins.
3. Spend coins to roll for stronger weapons.
4. Buy upgrades to improve luck, damage, and coin rewards.
5. Use stronger weapons and upgrades to defeat harder enemies.

The game is intentionally simple.

## Features

- Weapon rolling system
- Weapon rarity system
- Enemy progression
- Coin rewards
- Upgrade shop
- Luck upgrade
- Damage upgrade
- Coin multiplier upgrade
- Game log
- Reset game button
- Modular React components
- Separated frontend and backend folders


================================================================
How to Run Locally

You need to run the frontend and backend in separate terminals.

1. Clone or open the project
2. Run the backend

Open a terminal and run:

cd backend
npm install
npm run dev

The backend should run at:

http://localhost:3000

You can test it by visiting:

http://localhost:3000/api/health

Expected response:

{
  "status": "ok",
  "message": "Backend connected successfully."
}
3. Run the frontend

Open a second terminal and run:

cd frontend
npm install
npm run dev

The frontend should run at:
http://localhost:5173

Open that link in your browser to play the game.