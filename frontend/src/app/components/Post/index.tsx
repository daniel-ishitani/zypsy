import { Category as CategoryType, Post as PostType } from "@/app/types"

import { Category } from "../Category"
import { formatDate } from "./helpers"
import styles from "./post.module.css"

const Placeholder = () => (
    <div className={styles.post}>
        <div className={styles.placeholder} />
        <div className={styles.descriptionPlaceholder}>
            {Array(3).fill(null).map((placeholder, i) => <div className={styles.placeholder} key={i} />)}
        </div>
        <div className={styles.categoryPlaceholder} />
    </div>
)

export const Post = ({ post, categoryMap }: { post: PostType, categoryMap: Map<string, CategoryType> }) => {
    const categories = post.categories.map(category => categoryMap.get(category) as CategoryType)

    return (
        <article className={styles.post}>
            <h2 className={styles.date}>{formatDate(post.date)}</h2>
            <p className={styles.description}>{post.description}</p>
            <div className={styles.categories}>
                {categories.map(category => (
                    <Category category={category} key={category.id}/>
                ))}
            </div>
        </article>
    )
}

Post.Placeholder = Placeholder
