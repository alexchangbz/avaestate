import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/header/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ava Estate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <Header />
      
    </div>
  )
}
