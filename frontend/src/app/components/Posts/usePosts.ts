import { useQuery } from "@tanstack/react-query"

import { Post } from "@/app/types"

const getPosts = async (categoryId?: string): Promise<Post[]> => {
    const response = await fetch(`http://localhost:9000/categories/${categoryId}/posts`)
    const posts = await response.json()

    return posts
}

export const usePosts = (categoryId?: string) => {
    const posts = useQuery({
        queryKey: ["posts", categoryId],
        queryFn: () => getPosts(categoryId),
        enabled: Boolean(categoryId),
    })

    return posts
}
