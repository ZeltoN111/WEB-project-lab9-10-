const STORAGE_KEY = "railway_bookings";

export function getAllBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking) {
  const bookings = getAllBookings();
  const newBooking = {
    ...booking,
    id: `booking_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function getBookedSeatsForWagon(trainId, wagonId) {
  const bookings = getAllBookings();
  const seatIds = [];
  for (const b of bookings) {
    if (b.trainId === trainId && b.wagonId === wagonId) {
      seatIds.push(...b.seats);
    }
  }
  return seatIds;
}

export function clearAllBookings() {
  localStorage.removeItem(STORAGE_KEY);
}