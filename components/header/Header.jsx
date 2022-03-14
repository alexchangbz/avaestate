import Image from 'next/image'
import Link from 'next/link'
import Main from '../../public/images/main.jpg'

const Header = () => {
  return (
    <div className="header">

        <div className="background">
            <div className="background-filter">
                
            </div>
        </div>

        <div className="leftColumn">
            <div className="text">
                <h1>Discover a Decentralized Real Estate Marketplace</h1>
                <p>Ava Estate allows you to tokenize your properties</p>
            </div>
            
            <div className="btn">
                <button className='explore'>Explore</button>
                <Link href="/create">
                    <button className='create'>Create</button>
                </Link>
            </div>
        </div>

        <div className="rightColumn">
            <div className="image">
                <Image src={Main} layout="fill" objectFit='cover' />
            </div>
        </div>
    </div>
  )
}

export default Header
