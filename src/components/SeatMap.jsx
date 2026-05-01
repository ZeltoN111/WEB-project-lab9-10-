import styles from "./SeatMap.module.css";

function SeatMap({ wagon, selectedSeats, onToggleSeat }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Вагон {wagon.number} — {wagon.type}
        </h3>
        <div className={styles.legend}>
          <span className={`${styles.legendItem} ${styles.free}`}>Вільне</span>
          <span className={`${styles.legendItem} ${styles.selected}`}>Обране</span>
          <span className={`${styles.legendItem} ${styles.taken}`}>Зайняте</span>
        </div>
      </div>

      <div className={styles.grid}>
        {wagon.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          const isTaken = seat.taken;

          let seatClass = styles.seat;
          if (isTaken) seatClass += ` ${styles.seatTaken}`;
          else if (isSelected) seatClass += ` ${styles.seatSelected}`;
          else seatClass += ` ${styles.seatFree}`;

          return (
            <button
              key={seat.id}
              className={seatClass}
              disabled={isTaken}
              onClick={() => !isTaken && onToggleSeat(seat.id)}
              title={`Місце ${seat.number}${isTaken ? " (зайняте)" : ""}`}
              aria-label={`Місце ${seat.number}`}
            >
              {seat.number}
            </button>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <p className={styles.selectedInfo}>
          Обрано місць: <strong>{selectedSeats.length}</strong>
        </p>
      )}
    </div>
  );
}

export default SeatMap;