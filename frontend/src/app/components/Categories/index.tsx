"use client"

import { useContext, useState } from "react"
import * as RadioGroup from "@radix-ui/react-radio-group";

import { CategoriesContext } from "@/app/categoriesContainer";

import { Category } from "../Category"
import styles from "./categories.module.css"

type FilterBy = "all" | "favorites"

const Option = ({ id, label }: {
    id: FilterBy, label: string
}) => (
    <div className={styles.option}>
        <RadioGroup.Item
            id={id}
            value={id}
            className={styles.radio}
        >
            <RadioGroup.Indicator className={styles.indicator} />
        </RadioGroup.Item>
        <label htmlFor={id}>{label}</label>
    </div>
)

export const Categories = () => {
    const categories = useContext(CategoriesContext)
    const [filterBy, setFilterBy] = useState<FilterBy>("all")

    const handleFilterChange = (nextFilterBy: string) => {
        setFilterBy(nextFilterBy as FilterBy)
    }

    const filteredCategories = filterBy === "all" ? categories?.data : categories?.data.filter(category => category.favorite)

    return (
        <nav className={styles.nav}>
            <RadioGroup.Root value={filterBy} onValueChange={handleFilterChange} aria-label="Filter categories by" className={styles.filter}>
                <Option id="all" label="All categories" />
                <Option id="favorites" label="Favorite categories" />
            </RadioGroup.Root>

            <div className={styles.categories}>
                {filteredCategories?.map(category => (
                    <Category category={category} key={category.id}/>
                ))}
            </div>
        </nav>
    )
}