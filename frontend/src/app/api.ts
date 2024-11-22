import { Category } from "./types"

export const getCategories = async (): Promise<Category[]> => {
    const data = await fetch("http://localhost:9000/categories")
    const categories = await data.json()

    return categories
}
