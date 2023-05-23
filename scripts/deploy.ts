import { ethers } from 'hardhat'

async function main() {
    const Sender = await ethers.getContractFactory('Sender')

    const signers = await ethers.getSigners() // includes provider
    const deployer = signers[0]

    const sender = await Sender.connect(deployer).deploy()

    await sender.deployed()

    console.log(`Deployed to ${sender.address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
