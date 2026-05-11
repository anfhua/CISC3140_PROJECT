function EnemyPanel({ enemy, onAttack }) {
  const healthPercent = (enemy.currentHealth / enemy.health) * 100;

  return (
    <div className={`card enemy-card ${enemy.isBoss ? "boss-card" : ""}`}>
      <h2>{enemy.isBoss ? "Boss Stage" : "Current Enemy"}</h2>

      <div className="enemy-level-badge">Dungeon Level {enemy.dungeonLevel}</div>

      <div className="character-area enemy-area">
        <div className="enemy-avatar">
        <img src={enemy.image} alt={enemy.name} className="sprite-image" />
      </div>

        <div>
          <h3>{enemy.name}</h3>
          <p>{enemy.isBoss ? "Inspection Day" : "Normal Day"}</p>
          <p>Reward: ${enemy.reward}</p>
        </div>
      </div>

      <p>
        Health: {enemy.currentHealth} / {enemy.health}
      </p>

      <div className="health-bar">
        <div
          className={`health-fill ${enemy.isBoss ? "boss-health-fill" : ""}`}
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>

      <button onClick={onAttack}>
        {enemy.isBoss ? "Attack Boss" : "Attack Enemy"}
      </button>
    </div>
  );
}

export default EnemyPanel;