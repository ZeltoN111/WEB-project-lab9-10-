import { useState } from "react";
import { User, Mail, Phone, AlertCircle } from "lucide-react";
import styles from "./BookingForm.module.css";

const INITIAL = { name: "", phone: "", email: "" };

function validate(fields) {
  const errors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2) {
    errors.name = "Введіть повне ім'я (мінімум 2 символи)";
  }
  if (!/^[\+]?[\d\s\-\(\)]{10,15}$/.test(fields.phone.trim())) {
    errors.phone = "Введіть коректний номер телефону";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Введіть коректну електронну адресу";
  }
  return errors;
}

function BookingForm({ selectedSeats, wagon, train, onSuccess }) {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  }

  function handleSubmit() {
    const allTouched = { name: true, phone: true, email: true };
    setTouched(allTouched);
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSuccess({
      passenger: fields,
      seats: selectedSeats,
      wagonId: wagon.id,
      wagonNumber: wagon.number,
      wagonType: wagon.type,
      trainId: train.id,
      trainNumber: train.number,
    });
  }

  const seatNumbers = wagon.seats
    .filter((s) => selectedSeats.includes(s.id))
    .map((s) => s.number);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Дані пасажира</h3>

      {/* Підсумок бронювання */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Рейс</span>
          <span className={styles.summaryVal}>
            {train.from} → {train.to}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Вагон</span>
          <span className={styles.summaryVal}>
            №{wagon.number} ({wagon.type})
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Місця</span>
          <span className={styles.summaryVal}>{seatNumbers.join(", ")}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Кількість квитків</span>
          <span className={`${styles.summaryVal} ${styles.count}`}>
            {selectedSeats.length}
          </span>
        </div>
      </div>

      {/* Поля */}
      <div className={styles.fields}>
        <Field
          icon={<User size={16} />}
          label="Повне ім'я"
          name="name"
          type="text"
          placeholder="Наприклад: Іван Петренко"
          value={fields.name}
          error={touched.name && errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          icon={<Phone size={16} />}
          label="Номер телефону"
          name="phone"
          type="tel"
          placeholder="+380 XX XXX XX XX"
          value={fields.phone}
          error={touched.phone && errors.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          icon={<Mail size={16} />}
          label="Електронна пошта"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={fields.email}
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <button className={`btn btn-primary ${styles.submitBtn}`} onClick={handleSubmit}>
        Забронювати {selectedSeats.length}{" "}
        {selectedSeats.length === 1 ? "квиток" : "квитки"}
      </button>
    </div>
  );
}

/* Допоміжний компонент поля */
function Field({ icon, label, name, type, placeholder, value, error, onChange, onBlur }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={`${styles.inputWrap} ${error ? styles.hasError : ""}`}>
        <span className={styles.inputIcon}>{icon}</span>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.input}
          autoComplete="off"
        />
      </div>
      {error && (
        <p className={styles.error}>
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

export default BookingForm;