import { useNavigate } from "react-router-dom";
import { Train, Clock, MapPin, ChevronRight, Calendar } from "lucide-react";
import { formatTime, formatDate, formatDuration, countFreeSeats } from "../data/trains";
import styles from "./TrainCard.module.css";

function TrainCard({ train }) {
  const navigate = useNavigate();

  const totalFree = train.wagons.reduce(
    (sum, w) => sum + countFreeSeats(w),
    0
  );

  return (
    <article className={styles.card} onClick={() => navigate(`/booking/${train.id}`)}>
      <div className={styles.header}>
        <div className={styles.trainNumber}>
          <Train size={16} />
          <span>№ {train.number}</span>
        </div>
        <div className={styles.freeSeats}>
          <span className={styles.freeCount}>{totalFree}</span>
          <span className={styles.freeLabel}>вільних місць</span>
        </div>
      </div>

      <div className={styles.route}>
        <div className={styles.city}>
          <MapPin size={14} className={styles.pinIcon} />
          <span className={styles.cityName}>{train.from}</span>
          <span className={styles.time}>{formatTime(train.departureTime)}</span>
        </div>

        <div className={styles.routeLine}>
          <div className={styles.dot} />
          <div className={styles.line} />
          <div className={styles.dot} />
        </div>

        <div className={`${styles.city} ${styles.cityRight}`}>
          <MapPin size={14} className={styles.pinIcon} />
          <span className={styles.cityName}>{train.to}</span>
          <span className={styles.time}>{formatTime(train.arrivalTime)}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Calendar size={13} />
            {formatDate(train.departureTime)}
          </span>
          <span className={styles.metaItem}>
            <Clock size={13} />
            {formatDuration(train.durationMinutes)}
          </span>
        </div>

        <div className={styles.wagonTypes}>
          {train.wagons.map((w) => (
            <span key={w.id} className={styles.wagonBadge}>
              {w.type}
            </span>
          ))}
        </div>

        <button className={`${styles.bookBtn} btn btn-primary`}>
          Обрати місця
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default TrainCard;