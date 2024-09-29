import Image from 'next/image'
import CloudImage from '../../../public/cloud-hosting.png'
import { TiTick } from 'react-icons/ti'
import styles from './hero.module.css'

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.heroLeft}>
                <h1 className={styles.title}>Cloud Hosting</h1>
                <p className={styles.desc}>The best hosting solution for your online success</p>
                <div className={styles.services}>
                    <div className={styles.service}>
                        <TiTick />  Easy To Use Controle Panel
                    </div>
                    <div className={styles.service}>
                        <TiTick />  Secure Hosting
                    </div>
                    <div className={styles.service}>
                        <TiTick />  Website Maintenance
                    </div>
                </div >
            </div>
            <div>
                <Image src={CloudImage} alt='cloud' width={500} height={500} />
            </div>

        </div>
    )
}

export default Hero