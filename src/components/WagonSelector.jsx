import { countFreeSeats } from "../data/trains";
import styles from "./WagonSelector.module.css";

function WagonSelector({ wagons, selectedWagonId, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.label}>Оберіть вагон</h3>
      <div className={styles.list}>
        {wagons.map((wagon) => {
          const free = countFreeSeats(wagon);
          const isActive = wagon.id === selectedWagonId;
          return (
            <button
              key={wagon.id}
              className={`${styles.wagon} ${isActive ? styles.active : ""}`}
              onClick={() => onSelect(wagon.id)}
            >
              <span className={styles.wagonNum}>Вагон {wagon.number}</span>
              <span className={styles.wagonType}>{wagon.type}</span>
              <span className={styles.wagonFree}>{free} місць</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WagonSelector;