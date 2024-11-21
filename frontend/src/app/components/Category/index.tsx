"use client"
import { useSearchParams } from "next/navigation"

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
    const searchParams = useSearchParams()
    const isActive = searchParams.get("category") === category.id

    return (
        <div className={`${styles.wrapper} ${isActive ? styles.secondary : styles.primary}`}>
            <button className={styles.category}>
                {category.name}
            </button>
            <button aria-label="Add to favorites" className={styles.favorite}>
                <Icon isFavorite={category.favorite} />
            </button>
        </div>
    )
}