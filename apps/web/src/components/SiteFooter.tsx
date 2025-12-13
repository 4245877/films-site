import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        © {new Date().getFullYear()} Films • Minimal demo build for GitHub Pages
      </div>
    </footer>
  );
}
