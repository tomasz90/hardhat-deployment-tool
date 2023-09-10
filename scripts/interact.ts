import { ethers } from 'hardhat'
import { Test__factory } from './../typechain-types'
import { Network } from '../util/network.enum'
import { networks } from '../networks.config'

// config (no need to config anything in hardhat.config.ts)
const signerIndex = 0
const network = Network.goerli
const contractAddress = '0xbDbB032e0b8933a4aCf33F56e31d8ce882bFf8Cd'

const hd_path = `m/44'/60'/0'/0/${signerIndex}`

async function main() {
    const url = networks[network].url
    const scan = networks[network].scan
    const provider = new ethers.providers.JsonRpcProvider(url)

    const wallets = await ethers.Wallet.fromMnemonic(process.env.MNEMONIC!, hd_path)
    const signer = wallets.connect(provider)

    console.log(`Actor [${signerIndex}], address: ${await signer.getAddress()}`)

    // set contract factory and fn to call
    let contract = new Test__factory().attach(contractAddress).connect(signer)
    // add params if needed ex: await contract.test({ gasLimit: 1000000, gasPrice: 10, value: 10})
    const tx = await contract.test()
    const receipt = await tx.wait()

    console.log(`Interacted with: ${scan}/address/${contractAddress}`)
    console.log(`At tx: ${scan}/tx/${receipt.transactionHash}`)

    const cost = ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
    console.log(`Cost: ${cost} ETH`)
    console.log(`Gas used: ${receipt.gasUsed}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})