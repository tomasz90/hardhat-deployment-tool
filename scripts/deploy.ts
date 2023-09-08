import { ethers } from 'hardhat'
import hardhatConfig from '../hardhat.config'

async function main() {
    const ContractFactory = await ethers.getContractFactory(hardhatConfig.contract)

    const signers = await ethers.getSigners() // includes provider
    const deployer = signers[0]

    const contract = await ContractFactory.connect(deployer).deploy()

    await contract.deployed()

    console.log(`Deployed to ${contract.address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
