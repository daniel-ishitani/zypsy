"use client"

import { useSearchParams } from "next/navigation"

import { Category } from "@/app/types"

import { Post } from "../Post"
import { usePosts } from "./usePosts"
import styles from "./posts.module.css"

export const Posts = ({ categories }: { categories: Category[] }) => {
    const searchParams = useSearchParams()
    const category = categories.find(category => category.id === searchParams.get("category"))

    const posts = usePosts(category?.id)
    const categoryMap = categories.reduce((map, cat) => {
        map.set(cat.id, cat)
        return map
    }, new Map<string, Category>())

    return (
        <div className={styles.wrapper}>
            <div className={styles.summary}>
                {posts.isLoading ? "Loading..." : `Found ${posts.data?.length ?? 0} posts of "${category?.name}"`}
            </div>
            <div className={styles.posts}>
                {!posts.data ? "No posts yet." : posts.data.map(post => (
                    <Post post={post} categoryMap={categoryMap} key={post.id}/>
                ))}
            </div>
        </div>
    )
}
