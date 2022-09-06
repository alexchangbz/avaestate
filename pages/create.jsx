import { useState, useEffect } from 'react'
import styles from '../styles/Create.module.css'
import  { ethers } from 'ethers'
import { contractAbi, contractAddress } from '../lib/constant.js'

const getAvaEstateContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const AvaEstateContract = new ethers.Contract(contractAddress, contractAbi, signer)
    return AvaEstateContract
}

const initialState = {
  title: "",
  description: "",
  email: "",
  image: ""
};

const Create = () => {

    const [formData, setFormData] = useState({ title: '', description: '', email: '', image: ''})
    const [currentAccount, setCurrentAccount] = useState('')
    const [chainId, setChainId] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name] : e.target.value }))
    }

    const mintToken = async () => {
        const uri = JSON.stringify(formData)
        const etherValue = 0.1
        await getAvaEstateContract().mintEstateToken(uri, { value: ethers.utils.parseEther(etherValue.toString())})
        setFormData(initialState)
    }

    const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (ethereum) {
			console.log('Got the ethereum object')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            setCurrentAccount(accounts[0])
            if (!currentAccount) {
                setError("Please connect to metamask")
            }
            
		    
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
    })

    return (
        <>
            {chainId === "Ropsten" && currentAccount ? (
                <div className={styles.create}>

                    <div className={styles.formGroup}>
                        <h1>Create a New Property NFT</h1>
                        <div className={styles.form}>
                            <div className={styles.inputForm}>
                                 <label htmlFor="title">Title: </label>
                                <input placeholder="Title" type="text" name="title" value={formData.title} onChange={(e) => handleChange(e, "title")} />
                            </div>

                            <div className={styles.inputForm}>
                                <label htmlFor="description">Description: </label>
                                <input placeholder="Description" type="text" name="description" value={formData.description} onChange={(e) => handleChange(e, "description")} />
                            </div>

                            <div className={styles.inputForm}>
                                <label htmlFor="email">Contact Email: </label>
                                 <input placeholder="Email" type="email" name="email" value={formData.email} onChange={(e) => handleChange(e, "email")} />
                            </div>
                            <div className={styles.inputForm}>
                                <label htmlFor="email">Image Url: </label>
                                 <input placeholder="Image Url" type="text" name="imageUrl" value={formData.image} onChange={(e) => handleChange(e, "image")} />
                            </div>
                        </div>
                        <div className={styles.btnGroup}>
                            <button onClick={mintToken}>Mint Property</button>
                        </div>
                    </div>
                    

                </div>
                
            ) : (
                <div>{error}</div>
            )}
            
        </>
    )
}

export default Create
