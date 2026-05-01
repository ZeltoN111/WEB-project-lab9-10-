import TrainCard from "./TrainCard";
import styles from "./TrainList.module.css";

function TrainList({ trains }) {
  if (trains.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>🚂 Рейсів не знайдено</p>
        <p className={styles.emptyHint}>Спробуйте змінити параметри пошуку</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}

export default TrainList;