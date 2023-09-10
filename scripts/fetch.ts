import { ethers } from 'hardhat'
import { Network } from '../util/network.enum'
import { networks } from '../networks.config'

const axios = require('axios')

// Example how to fetch contract ABI from Etherscan and interact with it
// config (no need to config anything in hardhat.config.ts)
const signerIndex = 0
const network = Network.goerli
const contractAddress = '0x509Ee0d083DdF8AC028f2a56731412edD63223B9'

const hd_path = `m/44'/60'/0'/0/${signerIndex}`

async function main() {
    const url = networks[network].url
    const scan = networks[network].scan
    const scanApi = networks[network].scanApi
    const provider = new ethers.providers.JsonRpcProvider(url)

    const wallets = await ethers.Wallet.fromMnemonic(process.env.MNEMONIC!, hd_path)
    const signer = wallets.connect(provider)

    let USDTContract = (await getContractAbi(contractAddress, scanApi!!)).connect(signer)

    const tx = await USDTContract.transfer(contractAddress, 1, {gasLimit: 1000000})
    const receipt = await tx.wait()

    console.log(`Interacted with: ${scan}/address/${contractAddress}`)
    console.log(`At tx: ${scan}/tx/${receipt.transactionHash}`)

    const cost = ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
    console.log(`Cost: ${cost} ETH`)
    console.log(`Gas used: ${receipt.gasUsed}`)

    const name = await USDTContract.name()
    const symbol = await USDTContract.symbol()
    const decimals = await USDTContract.decimals()
    const totalSupply = await USDTContract.totalSupply()

    console.log(`${symbol} (${name}) total supply is ${ethers.utils.formatUnits(totalSupply, decimals)}`)
}

async function getContractAbi(contractAddress: string, scanApi: string) {
    const httpResponse = await axios.get(
        `${scanApi}/api?` +
        `module=contract&` +
        `action=getabi&` +
        `address=${contractAddress}&` +
        `apikey=${process.env.ETHERSCAN_API_KEY}`
    )

    return new ethers.Contract(contractAddress, httpResponse.data.result)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})