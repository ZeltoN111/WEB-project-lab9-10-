import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTrainById, formatTime, formatDate, formatDuration } from "../data/trains";
import { saveBooking, getBookedSeatsForWagon } from "../services/BookingService";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import { Train, Clock, MapPin, CheckCircle2 } from "lucide-react";
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
  const [lastBooking, setLastBooking] = useState(null);

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
  }

  function handleToggleSeat(seatId) {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  }

  function handleBookingSuccess(bookingData) {
    const saved = saveBooking(bookingData);
    setBookedSeats((prev) => [...prev, ...bookingData.seats]);
    setSelectedSeats([]);
    setLastBooking(saved);

    toast.success(
      `✅ Заброньовано ${bookingData.seats.length} ${
        bookingData.seats.length === 1 ? "квиток" : "квитки"
      } у вагоні №${bookingData.wagonNumber}`,
      { autoClose: 5000 }
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
            <span><Clock size={13} /> {formatDuration(train.durationMinutes)}</span>
            <span>{formatDate(train.departureTime)}</span>
          </div>
        </section>

        {/* Успішне бронювання */}
        {lastBooking && (
          <div className={styles.successBanner}>
            <CheckCircle2 size={22} className={styles.successIcon} />
            <div>
              <p className={styles.successTitle}>Бронювання підтверджено!</p>
              <p className={styles.successSub}>
                Квиток #{lastBooking.id.slice(-6).toUpperCase()} збережено.
                Можна забронювати ще місця.
              </p>
            </div>
            <button
              className={`btn btn-ghost ${styles.homeBtn}`}
              onClick={() => navigate("/")}
            >
              На головну
            </button>
          </div>
        )}

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
        {selectedSeats.length > 0 && wagonWithBooked && (
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