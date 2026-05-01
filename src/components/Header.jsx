import { useNavigate, useLocation } from "react-router-dom";
import { Train, ArrowLeft } from "lucide-react";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <button
          className={styles.logo}
          onClick={() => navigate("/")}
          aria-label="Головна"
        >
          <div className={styles.logoIcon}>
            <Train size={18} />
          </div>
          <span className={styles.logoText}>УЗ Квитки</span>
        </button>

        {!isHome && (
          <button className={`btn btn-ghost ${styles.back}`} onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Назад
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;