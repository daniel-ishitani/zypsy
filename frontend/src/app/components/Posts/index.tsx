"use client"

import { useContext } from "react"
import { useSearchParams } from "next/navigation"

import { CategoriesContext } from "@/app/categoriesContainer"
import { Category } from "@/app/types"

import { Post } from "../Post"
import { usePosts } from "./usePosts"
import styles from "./posts.module.css"

export const Posts = () => {
    const categories = useContext(CategoriesContext)
    const searchParams = useSearchParams()
    const category = categories?.data.find(category => category.id === searchParams.get("category"))
    const posts = usePosts(category?.id)
    const categoryMap = categories?.data.reduce((map, cat) => {
        map.set(cat.id, cat)
        return map
    }, new Map<string, Category>()) || new Map<string, Category>()

    return (
        <div className={styles.wrapper}>
            {category && (
                <div className={styles.summary}>
                    {posts.isLoading ? "Loading..." : `Found ${posts.data?.length ?? 0} posts of "${category.name}"`}
                </div>
            )}
            <div className={styles.posts}>
                {posts.isLoading
                    ? Array(3).fill(null).map((placeholder, i) => <Post.Placeholder key={i} />)
                    : posts.data?.map(post => <Post post={post} categoryMap={categoryMap} key={post.id}/>)
                }
            </div>
        </div>
    )
}
