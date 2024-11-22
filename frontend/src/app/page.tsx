import { getCategories } from "./api";
import { CategoriesContainer } from "./categoriesContainer";
import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { Posts } from "./components/Posts";
import styles from "./page.module.css";

export default async function Home() {
  const initialCategories = await getCategories()

  return (
    <div className={styles.page}>
      <CategoriesContainer initialCategories={initialCategories}>
        <aside>
          <Header />
          <Categories />
        </aside>
        <main className={styles.main}>
          <Posts />
        </main>
      </CategoriesContainer>
    </div>
  );
}
