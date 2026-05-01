import { useParams, useNavigate } from "react-router-dom";
import { getTrainById, formatTime, formatDate, formatDuration } from "../data/trains";
import { Train, Clock, MapPin } from "lucide-react";
import styles from "./Booking.module.css";

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = getTrainById(trainId);

  if (!train) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <p>Рейс не знайдено</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              На головну
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Інфо про рейс */}
        <section className={styles.trainInfo}>
          <div className={styles.trainBadge}>
            <Train size={15} />
            Потяг № {train.number}
          </div>

          <div className={styles.routeRow}>
            <div className={styles.routeCity}>
              <MapPin size={14} />
              <span className={styles.cityName}>{train.from}</span>
              <span className={styles.cityTime}>{formatTime(train.departureTime)}</span>
            </div>

            <div className={styles.routeArrow}>→</div>

            <div className={`${styles.routeCity} ${styles.routeCityEnd}`}>
              <MapPin size={14} />
              <span className={styles.cityName}>{train.to}</span>
              <span className={styles.cityTime}>{formatTime(train.arrivalTime)}</span>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span>
              <Clock size={13} /> {formatDuration(train.durationMinutes)}
            </span>
            <span>{formatDate(train.departureTime)}</span>
          </div>
        </section>

        {/* Плейсхолдер — заповнимо в наступних комітах */}
        <section className={styles.bookingArea}>
          <p className={styles.hint}>
            ← Оберіть вагон та місця (буде реалізовано в наступних кроках)
          </p>
        </section>
      </div>
    </main>
  );
}

export default Booking;