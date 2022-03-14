import { useState, useEffect } from 'react'
import  { ethers } from 'ethers'
import { contractAbi, contractAddress } from '../lib/constant.js'
import styles from '../styles/Properties.module.css'

const getAvaEstateContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const AvaEstateContract = new ethers.Contract(contractAddress, contractAbi, signer)
    return AvaEstateContract
}

const Properties = () => {

  const [currentAccount, setCurrentAccount] = useState('')
  const [chainId, setChainId] = useState('')
  const [error, setError] = useState('')
  const [listedProperty, setListedProperty] = useState([])

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

  const initialize = async () => {
        let myProperty = []
        
        if (chainId == "Ropsten") {
          const properties = await getAvaEstateContract().getProperties()
          
          for (let i = 0; i < properties.toString().split(',').length; i++) {
              
            const listed = await getAvaEstateContract().listedProperty(properties[i])
            
            

            if (listed == true) {
                const propertyData = await getAvaEstateContract().tokenURI(properties[i])
                myProperty.push(propertyData)
            }   
            
          setListedProperty(myProperty.reverse())
          }
        }
    }

  useEffect(() => {
      
    getChainId()
    checkIfWalletIsConnected()
    initialize()

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
        <>
          <div className={styles.propertyBorder}>
            {listedProperty.map((property, index) => (
              <div className={styles.property} key={index}>
                  <p>{JSON.parse(property).title}</p>
                  <div className={styles.box}></div> 
                  <p>{JSON.parse(property).description}</p>
                  <p>{JSON.parse(property).email}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>{error}</div>
      )}
    </>
  )
}

export default Properties
