import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../public/images/logo.png"

// import { ethers } from "ethers"
// import { contractAbi, contractAddress } from "../../lib/constant"

// const getAvaEstateContract = () => {
//     const provider = new ethers.providers.Web3Provider(ethereum)
//     const signer = provider.getSigner()
//     const AvaEstateContract = new ethers.Contract(contractAddress, contractAbi, signer)

//     return AvaEstateContract
// }

const Navbar = () => {

    const [currentAccount, setCurrentAccount] = useState('')

    const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (ethereum) {
			console.log('Got the ethereum object')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
		    setCurrentAccount(accounts[0])
		} else {
			console.log('No Wallet found. Connect Wallet')
		}

		
	}

    const connectWallet = async () => {
        try {
        const { ethereum } = window
        console.log(ethereum)
        if(!ethereum) return ("Please install metamask")      
        const accounts = await ethereum.request({ method: "eth_requestAccounts"})
        setCurrentAccount(accounts[0])
        } catch (error) {
        console.log(error)
        throw new Error("No ethereum object found.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        const { ethereum } = window
        if(!ethereum) return ("Please install metamask") 
        if (ethereum) {
            ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }
    }, [])

  return (
      <>
        <div className="navbar">

            <Link href="/">
                <nav>
                    <div className="logo">
                        <Image src={Logo} width={600} height={600} contain="fill" />
                    </div>
                    <h1>AvaEstate</h1>
                </nav>
            </Link>

            <ul>
                <li>
                    <Link href="/properties">
                        <a>Explore</a>
                    </Link>
                </li>
                <li>
                    <Link href="/myproperty">
                        My Property
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About
                    </Link>
                </li>
            </ul>

            {!currentAccount ? (<button className="connectBtn" onClick={connectWallet}>Connect Wallet</button>) : (<div className="wallet">
                Wallet: {`${currentAccount.slice(0,6)}...${currentAccount.slice(-6)}`}
            </div>) }

        </div>
      </>
 
  )
}

export default Navbar
