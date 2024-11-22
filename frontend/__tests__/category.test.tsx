import { QueryClient } from '@tanstack/react-query';
import { screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import { useRouter } from 'next/navigation';

import { Category as CategoryType } from '@/app/types';

import { Category } from '../src/app/components/Category'
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

 
describe('Category', () => {
    it('renders a filter button, and an add to favorites button', () => {
        const queryClient = new QueryClient()
        const categoryMock: CategoryType = { id: "first", name: "First", favorite: false }
    
        renderWithClient(queryClient, <Category category={categoryMock} />)

        const filter = screen.getByText("First")
        const addToFavorites = screen.getByLabelText("Add to favorites")

        expect(filter).toBeDefined()
        expect(addToFavorites).toBeDefined()
    })

    it("navigates to the category's posts on click", () => {
        const queryClient = new QueryClient()
        const categoryMock: CategoryType = { id: "first", name: "First", favorite: false }
        const mockRouter = { push: jest.fn() }
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
        
        renderWithClient(queryClient, <Category category={categoryMock} />)

        const filter = screen.getByText("First")
        filter.click()

        expect(mockRouter.push).toHaveBeenCalledWith('/?category=first')
    })
})
