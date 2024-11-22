import { render } from '@testing-library/react'
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// https://tkdodo.eu/blog/testing-react-query
export function renderWithClient(client: QueryClient, ui: React.ReactElement) {
    const { rerender, ...result } = render(
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    )
    return {
      ...result,
      rerender: (rerenderUi: React.ReactElement) =>
        rerender(
          <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
        ),
    }
}
