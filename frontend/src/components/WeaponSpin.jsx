function WeaponSpin({ coins, spinCost, onSpin }) {
  return (
    <div className="card">
      <h2>Weapon Spinner</h2>

      <p>Spin cost: ${spinCost}</p>

      <button onClick={onSpin} disabled={coins < spinCost}>
        Spin for Weapon
      </button>
    </div>
  );
}

export default WeaponSpin;