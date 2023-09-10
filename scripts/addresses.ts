import { ethers } from 'hardhat'

const maxSigners = 10

async function main() {

    const signers = await ethers.getSigners()

    for (let i = 0; i < maxSigners; i++) {
        const bal = ethers.utils.formatEther(await signers[i].getBalance())
        console.log(`Signer [${i}], address: ${signers[i].address}, balance: ${bal} ETH`)
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})