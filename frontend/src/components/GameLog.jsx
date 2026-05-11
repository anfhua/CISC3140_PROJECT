function GameLog({ logs }) {
  return (
    <div className="card">
      <h2>Game Log</h2>

      <div className="log-box">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default GameLog;