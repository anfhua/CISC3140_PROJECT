function EnemyPanel({ enemy, onAttack }) {
  const healthPercent = (enemy.currentHealth / enemy.health) * 100;

  return (
    <div className="card enemy-card">
      <h2>Current Enemy</h2>

      <div className="character-area enemy-area">
        <div className="enemy-avatar">👹</div>

        <div>
          <h3>{enemy.name}</h3>
          <p>Reward: ${enemy.reward}</p>
        </div>
      </div>

      <p>
        Health: {enemy.currentHealth} / {enemy.health}
      </p>

      <div className="health-bar">
        <div
          className="health-fill"
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>

      <button onClick={onAttack}>Attack Enemy</button>
    </div>
  );
}

export default EnemyPanel;