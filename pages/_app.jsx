import '../styles/globals.css'
import '../components/navbar/Navbar.css'
import '../components/header/Header.css'
import Navbar from '../components/navbar/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
