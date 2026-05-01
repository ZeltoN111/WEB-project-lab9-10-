export const trains = [
  {
    id: "1",
    number: "741",
    from: "Київ",
    to: "Львів",
    departureTime: "2025-06-15T07:30:00",
    arrivalTime: "2025-06-15T13:00:00",
    durationMinutes: 330,
    wagons: [
      {
        id: "w1",
        number: 1,
        type: "Купе",
        totalSeats: 36,
        seats: generateSeats(36, [3, 7, 15, 22, 28]),
      },
      {
        id: "w2",
        number: 2,
        type: "Плацкарт",
        totalSeats: 54,
        seats: generateSeats(54, [1, 5, 12, 19, 25, 33, 40, 47]),
      },
      {
        id: "w3",
        number: 3,
        type: "СВ",
        totalSeats: 18,
        seats: generateSeats(18, [2, 8, 14]),
      },
    ],
  },
  {
    id: "2",
    number: "099",
    from: "Харків",
    to: "Одеса",
    departureTime: "2025-06-15T09:15:00",
    arrivalTime: "2025-06-15T18:45:00",
    durationMinutes: 570,
    wagons: [
      {
        id: "w4",
        number: 1,
        type: "Купе",
        totalSeats: 36,
        seats: generateSeats(36, [2, 9, 16, 23]),
      },
      {
        id: "w5",
        number: 2,
        type: "Плацкарт",
        totalSeats: 54,
        seats: generateSeats(54, [4, 11, 18, 27, 35, 42]),
      },
    ],
  },
  {
    id: "3",
    number: "155",
    from: "Дніпро",
    to: "Київ",
    departureTime: "2025-06-16T06:00:00",
    arrivalTime: "2025-06-16T10:40:00",
    durationMinutes: 280,
    wagons: [
      {
        id: "w6",
        number: 1,
        type: "СВ",
        totalSeats: 18,
        seats: generateSeats(18, [1, 6, 11]),
      },
      {
        id: "w7",
        number: 2,
        type: "Купе",
        totalSeats: 36,
        seats: generateSeats(36, [4, 10, 20, 30]),
      },
    ],
  },
  {
    id: "4",
    number: "321",
    from: "Львів",
    to: "Запоріжжя",
    departureTime: "2025-06-16T14:20:00",
    arrivalTime: "2025-06-17T02:10:00",
    durationMinutes: 710,
    wagons: [
      {
        id: "w8",
        number: 1,
        type: "Плацкарт",
        totalSeats: 54,
        seats: generateSeats(54, [6, 13, 20, 31, 44]),
      },
      {
        id: "w9",
        number: 2,
        type: "Купе",
        totalSeats: 36,
        seats: generateSeats(36, [5, 18, 27]),
      },
    ],
  },
  {
    id: "5",
    number: "412",
    from: "Київ",
    to: "Харків",
    departureTime: "2025-06-17T11:00:00",
    arrivalTime: "2025-06-17T16:30:00",
    durationMinutes: 330,
    wagons: [
      {
        id: "w10",
        number: 1,
        type: "Купе",
        totalSeats: 36,
        seats: generateSeats(36, [1, 8, 19, 26, 32]),
      },
      {
        id: "w11",
        number: 2,
        type: "СВ",
        totalSeats: 18,
        seats: generateSeats(18, [3, 9, 15]),
      },
    ],
  },
];

// Допоміжна функція — генерує масив місць, де takenSeatNumbers = зайняті
function generateSeats(total, takenSeatNumbers = []) {
  return Array.from({ length: total }, (_, i) => ({
    id: `seat-${i + 1}`,
    number: i + 1,
    taken: takenSeatNumbers.includes(i + 1),
  }));
}

// Утиліти для роботи з даними
export function getTrainById(id) {
  return trains.find((t) => t.id === id) || null;
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}г ${m}хв` : `${h}г`;
}

export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function countFreeSeats(wagon) {
  return wagon.seats.filter((s) => !s.taken).length;
}