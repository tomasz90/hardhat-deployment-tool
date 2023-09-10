import { ethers } from 'hardhat'
import { TestLongtail__factory } from './../typechain-types'
import { Network } from '../util/network.enum'
import { networks } from '../networks.config'

// config (no need to config anything in hardhat.config.ts)
const signerIndex = 0
const network = Network.sepolia
const contractAddress = '0x88a4fB4c14c09Af5CdaEf94C606d0d87e4Bb93E3'

const hd_path = `m/44'/60'/0'/0/${signerIndex}`

async function main() {
    const url = networks[network].url
    const scan = networks[network].scan
    const provider = new ethers.providers.JsonRpcProvider(url)

    const wallet = await ethers.Wallet.fromMnemonic(process.env.MNEMONIC!, hd_path)
    const signer = wallet.connect(provider)

    console.log(`Actor [${signerIndex}], address: ${await signer.getAddress()}`)

    // set contract factory and fn to call
    let contract = new TestLongtail__factory().attach(contractAddress).connect(signer)
    // add params if needed ex: await contract.test({ gasLimit: 1000000, gasPrice: 10, value: 10})
    const tx = await contract.withdraw()
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