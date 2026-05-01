import { useState } from "react";
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
          <p className={styles.subtitle}>Залізничні квитки</p>
          <h1 className={styles.title}>
            Знайди свій <br />
            <span className={styles.accent}>рейс</span>
          </h1>
        </header>

        <TrainList trains={filtered} />
      </div>
    </main>
  );
}

export default Home;