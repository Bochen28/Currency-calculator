import styles from "./header.module.sass";

function Header() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Przelicznik walut</h1>
      </div>
    </>
  );
}

export default Header;
