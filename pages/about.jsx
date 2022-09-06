import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/images/logo.png'
import styles from '../styles/About.module.css'

const About = () => {
  return (
    <div className={styles.about}>

      <div className={styles.titleHeader}>

        <div className={styles.background}>
          <div className={styles.filter}></div>
        </div>
        
        <div className={styles.title}>
          <div className={styles.logo}>
            <Image src={Logo} width={600} height={600} contain="fill" />
          </div>
          <h1>Ava Estate</h1>
          <p>Allowing You to Own Your Property Data as NFT</p>
        </div>

      </div>
      
      
      <div className={styles.aboutContent}>

        <div className={styles.aboutBackground}></div>

        <div className={styles.info}>
          <h1>What is Ava Estate?</h1>
          <p>
            Ava Estate is a decentralized real estate marketplace that allows you to mint an NFT token which represent
            your property and list them in the marketplace for sale or rent.
          </p>
          <p>
            We have created a smart contract which allows you to store the information of your property and own them as an NFT.
            You will have full control of all the informations of your property data since you have the ownership of the NFT token.
          </p>
          <h1>How do I tokenize my property?</h1>
          <p>
            You can use Ava Estate to create your own NFT token <Link href="#"><a>here.</a></Link> All you have to do is filling
            in the information using the form and press the mint button. It is important to make sure all the information is
            correct before minting. Once your NFT token is minted, altering your data will require gas fee.
          </p>
          <h1>How much do I have to pay?</h1>
          <p>
            It is completely free to list your NFT token with Ava Estate. However, the one time cost of minting the NFT token is 0.1 AVAX. 
          </p>
        </div>

      </div>
      
      
    </div>
  )
}

export default About
