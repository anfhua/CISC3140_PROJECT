function EnemyPanel({ enemy, onAttack }) {
  const healthPercent = (enemy.currentHealth / enemy.health) * 100;

  return (
    <div className="card">
      <h2>Enemy</h2>

      <h3>{enemy.name}</h3>

      <p>
        Health: {enemy.currentHealth} / {enemy.health}
      </p>

      <div className="health-bar">
        <div
          className="health-fill"
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>

      <p>Reward: ${enemy.reward}</p>

      <button onClick={onAttack}>Attack</button>
    </div>
  );
}

export default EnemyPanel;