"use client"

import { createContext } from "react"

import { getCategories } from "./api"
import { Category } from "./types"
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query"

export const CategoriesContext = createContext<DefinedUseQueryResult<Category[], Error> | null>(null)
export const CATEGORIES_QUERY_KEY = ['categories']

export const CategoriesContainer = ({ children, initialCategories }: { children: React.ReactNode, initialCategories: Category[] }) => {
    const categories = useQuery({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: () => getCategories(),
        initialData: initialCategories,
    })

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    )
}