import styles from "./LoadingSpinner.module.css";

export default function DataLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className={styles.spinner}></div>
    </div>
  );
}
