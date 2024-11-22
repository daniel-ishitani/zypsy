import { QueryClient } from '@tanstack/react-query';
import { screen } from '@testing-library/react'
import "@testing-library/jest-dom";

import { Category, Post as PostType } from '@/app/types';

import { Post } from '../src/app/components/Post'
import { renderWithClient } from '../utils/renderWithClient';
 
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    useSearchParams() {
        return { get: jest.fn() }
    },
    usePathname() {
        return "/"
    }
}));

describe('Post', () => {
    it('renders a heading and a description', () => {
        const queryClient = new QueryClient()
        const postMock: PostType = {
            id: "1",
            description: "A post",
            date: "2024-11-21",
            categories: ["first"]
        }
        const categoryMapMock = new Map<string, Category>()
        categoryMapMock.set("first", { id: "first", name: "First", favorite: false })
        renderWithClient(queryClient, <Post post={postMock} categoryMap={categoryMapMock} />)
    
        const heading = screen.getByRole("heading", { level: 2 })
        const description = screen.getByText("A post")
        const category = screen.getByText("First")
    
        expect(heading.textContent).toBe('Wednesday, November 20, 2024')
        expect(description).toBeDefined()
        expect(category).toBeDefined()
    })
})
