import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Theme } from './theme.ts'
import { Reset } from 'styled-reset'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const GlobalThem = createGlobalStyle`
  body{
    background-color: black;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
`;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <Reset />
        <GlobalThem />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
