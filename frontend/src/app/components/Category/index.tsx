"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CATEGORIES_QUERY_KEY } from "@/app/categoriesContainer"
import { Category as CategoryType } from "@/app/types"

import styles from "./category.module.css"

const Icon = ({ isFavorite }: { isFavorite: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.99998 1.41333L11.4458 6.4075L16.9166 7.21333L12.9583 11.0983L13.8925 16.5867L8.99998 13.9942L4.10748 16.5867L5.04165 11.0983L1.08331 7.21333L6.55331 6.4075L8.99998 1.41333Z"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const Category = ({ category }: { category: CategoryType }) => {
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const isActive = searchParams.get("category") === category.id
    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://localhost:9000/categories/${category.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...category,
                    favorite: !category.favorite,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
        }
    })

    const handleCategoryClick = () => {
        router.push(`${pathname}?category=${category.id}`)
    }

    const handleToggleFavorite = () => {
        if (mutation.isPending) return
        
        mutation.mutate()
    }

    return (
        <div className={`${styles.wrapper} ${isActive ? styles.secondary : styles.primary}`}>
            <button className={styles.category} onClick={handleCategoryClick}>
                {category.name}
            </button>
            <button
                aria-label={`${category.favorite ? "Remove from" : "Add to"} favorites`}
                aria-disabled={mutation.isPending}
                className={styles.favorite}
                onClick={handleToggleFavorite}
            >
                <Icon isFavorite={category.favorite} />
            </button>
        </div>
    )
}