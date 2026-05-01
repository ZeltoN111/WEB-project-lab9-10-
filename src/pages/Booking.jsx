import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrainById, formatTime, formatDate, formatDuration } from "../data/trains";
import { saveBooking, getBookedSeatsForWagon } from "../services/BookingService";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import { Train, Clock, MapPin } from "lucide-react";
import styles from "./Booking.module.css";

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = getTrainById(trainId);

  const [selectedWagonId, setSelectedWagonId] = useState(
    train ? train.wagons[0].id : null
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingDone, setBookingDone] = useState(false);

  // Завантажуємо збережені бронювання при зміні вагона
  useEffect(() => {
    if (!train || !selectedWagonId) return;
    const stored = getBookedSeatsForWagon(train.id, selectedWagonId);
    setBookedSeats(stored);
  }, [selectedWagonId, train]);

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

  const selectedWagon = train.wagons.find((w) => w.id === selectedWagonId);

  // Будуємо вагон з урахуванням збережених бронювань
  const wagonWithBooked = selectedWagon
    ? {
        ...selectedWagon,
        seats: selectedWagon.seats.map((s) => ({
          ...s,
          taken: s.taken || bookedSeats.includes(s.id),
        })),
      }
    : null;

  function handleWagonSelect(wagonId) {
    setSelectedWagonId(wagonId);
    setSelectedSeats([]);
    setBookingDone(false);
  }

  function handleToggleSeat(seatId) {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  }

  function handleBookingSuccess(bookingData) {
    saveBooking(bookingData);
    setBookedSeats((prev) => [...prev, ...bookingData.seats]);
    setSelectedSeats([]);
    setBookingDone(true);
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
            <span><Clock size={13} /> {formatDuration(train.durationMinutes)}</span>
            <span>{formatDate(train.departureTime)}</span>
          </div>
        </section>

        {/* Вибір вагона */}
        <WagonSelector
          wagons={train.wagons}
          selectedWagonId={selectedWagonId}
          onSelect={handleWagonSelect}
        />

        {/* Схема місць */}
        {wagonWithBooked && (
          <SeatMap
            wagon={wagonWithBooked}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
          />
        )}

        {/* Форма бронювання */}
        {selectedSeats.length > 0 && wagonWithBooked && !bookingDone && (
          <BookingForm
            selectedSeats={selectedSeats}
            wagon={wagonWithBooked}
            train={train}
            onSuccess={handleBookingSuccess}
          />
        )}
      </div>
    </main>
  );
}

export default Booking;