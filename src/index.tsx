import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SkeletonTheme } from 'react-loading-skeleton'
import './i18n'
import './index.css'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <SkeletonTheme baseColor='#222128' highlightColor='#3A393E'>
        <App />
        <ReactQueryDevtools />
      </SkeletonTheme>
    </Router>
  </QueryClientProvider>
)
