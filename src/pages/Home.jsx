import { useState } from "react";
import { Search, X } from "lucide-react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";
import styles from "./Home.module.css";

function Home() {
  const [query, setQuery] = useState("");

  const filtered = trains.filter((t) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      t.number.includes(q)
    );
  });

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <p className={styles.subtitle}>Укрзалізниця</p>
          <h1 className={styles.title}>
            Знайди свій <span className={styles.accent}>рейс</span>
          </h1>
          <p className={styles.desc}>
            Переглядай розклад, обирай вагон та бронюй квитки онлайн
          </p>
        </header>

        <div className={styles.searchBar}>
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Місто або номер потяга…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className={styles.clearBtn}
                onClick={() => setQuery("")}
                aria-label="Очистити"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.resultMeta}>
            <span className={styles.resultCount}>
              {filtered.length === trains.length
                ? `${trains.length} рейсів`
                : `Знайдено: ${filtered.length} з ${trains.length}`}
            </span>
          </div>
        </div>

        <TrainList trains={filtered} />
      </div>
    </main>
  );
}

export default Home;