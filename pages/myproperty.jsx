import { useState, useEffect } from 'react'
import  { ethers } from 'ethers'
import { contractAbi, contractAddress } from '../lib/constant.js'
import styles from '../styles/Property.module.css'

const getAvaEstateContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const AvaEstateContract = new ethers.Contract(contractAddress, contractAbi, signer)
    return AvaEstateContract
}

const MyProperty = () => {

    const [currentAccount, setCurrentAccount] = useState('')
    const [chainId, setChainId] = useState('')
    const [ownerProperty, setOwnerProperty] = useState([])
    const [error, setError] = useState('')

    const initialize = async () => {
        let myProperty = []
        
        if (chainId == "Ropsten") {
            const properties = await getAvaEstateContract().getProperties()
            
            for (let i = 0; i < properties.toString().split(',').length; i++) {
                let ownerAddress = await getAvaEstateContract().ownerOf(properties[i])
                let propertyOwner = await ownerAddress.toLowerCase()  

                if (currentAccount == propertyOwner) {
                    const propertyData = await getAvaEstateContract().tokenURI(properties[i])
                    myProperty.push(propertyData)
                }                   
            }
            setOwnerProperty(myProperty)
            console.log(myProperty)
        }
        
        
    }

    const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (ethereum) {
			console.log('Got the ethereum object')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            setCurrentAccount(accounts[0])
		} else {
            setError("Please install metamask wallet")
			return alert('Please install metamask wallet')
		}	
	}

    const getChainId = async () => {
        ethereum.request({ method: 'eth_chainId' })
            .then((value) => {
                const chainId = parseInt(value)
                switch (chainId) {
                    // case 1:
                    //     setChainId('Ethereum')
                    //     break
                    case 3:
                        setChainId('Ropsten')
                        break
                    // case 4:
                    //     setChainId('Rinkeby')
                    //     break
                    // case 5:
                    //     setChainId('Goerli')
                    //     break
                    // case 42:
                    //     setChainId('Kovan')
                    //     break
                    default:
                        setChainId('')
                        setError("Please connect your metamask to Ropsten Network")
                }
            })
    }

    useEffect(() => {
        
        getChainId()
        initialize()
        checkIfWalletIsConnected()

        const { ethereum } = window
        if (ethereum) {
            ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }

    }, [currentAccount, chainId])

    return (
        <>
             {chainId == "Ropsten" ? (
                 <div className={styles.myProperty}>
                    <h1>Your NFT Property Collections</h1>
                    <div className={styles.propertyBorder}>
                            {ownerProperty.map((property, index) => (
                                <div className={styles.property} key={index}>
                                    <p>{JSON.parse(property).title}</p>
                                    <div>
                                        <img 
                                            src={!JSON.parse(property).image ? "https://img.iproperty.com.my/my-iproperty/premium/800x460-fit,format=webp/w-m9pq145199c4-4849-4a3f-83ea-ccfae19e7f40_1152x864.jpeg" : JSON.parse(property).image}          
                                            width='250'
                                            height='250'
                                        />
                                    </div>  
                                    <p>{JSON.parse(property).description}</p>
                                    <p>{JSON.parse(property).email}</p>
                                </div>
                            ))}
                    

                    </div>
                 </div>              
            ) : (
                <div>{error}</div>
            )}
            
        </> 
    )
}

export default MyProperty
