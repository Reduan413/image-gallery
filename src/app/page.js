import Image from 'next/image'
import styles from './page.module.css'
import Gallery from './components/Gallery'

export default function Home() {
  return (
    <>
      <h1 style={{ textAlign:'center' }}>Image Gallery</h1>
      <Gallery/>
    </>
  )
}
