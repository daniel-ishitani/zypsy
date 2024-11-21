import { Categories } from "./components/Categories";
import { ClientProvider } from "./components/ClientProvider";
import { Header } from "./components/Header";
import { Posts } from "./components/Posts";
import styles from "./page.module.css";

export default async function Home() {
  const data = await fetch("http://localhost:9000/categories")
  const categories = await data.json()

  return (
    <div className={styles.page}>
      <aside>
        <Header />
        <Categories categories={categories} />
      </aside>
      <main className={styles.main}>
        <ClientProvider>
          <Posts categories={categories} />
        </ClientProvider>
      </main>
    </div>
  );
}
