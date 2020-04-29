import '../styles/app.css'

import Header from '../components/header'
import { SearchProvider } from '../contexts/search'

export default function App({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Header></Header>
      <Component {...pageProps} />
    </SearchProvider>
  )
}
