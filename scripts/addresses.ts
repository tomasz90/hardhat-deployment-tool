import { ethers } from 'hardhat'
import { networks } from '../networks.config'
import { Network } from '../util/network.enum'

const maxSigners = 10
const network = Network.goerli

async function main() {

    const url = networks[network].url
    const provider = new ethers.providers.JsonRpcProvider(url)

    for (let i = 0; i < maxSigners; i++) {
        const hd_path = `m/44'/60'/0'/0/${i}`
        const wallet = await ethers.Wallet.fromMnemonic(process.env.MNEMONIC!, hd_path)
        const bal = ethers.utils.formatEther(await wallet.connect(provider).getBalance())
        console.log(`Signer [${i}], address: ${wallet.address}, balance: ${bal} ETH`)
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})