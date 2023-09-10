import { ethers } from 'hardhat'
import hardhatConfig from '../hardhat.config'
const hre = require('hardhat')

async function main() {
    const ContractFactory = await ethers.getContractFactory(hardhatConfig.contract)

    const signers = await ethers.getSigners() // includes provider
    const deployer = signers[0]

    console.log(`Deployer address: ${deployer.address}`)
    console.log(`Deploying: ${hardhatConfig.contract} with args[]: ${hardhatConfig.contractArgs}`)

    const contract = await ContractFactory.connect(deployer).deploy(...hardhatConfig.contractArgs, { value: hardhatConfig.value })
    await contract.deployed()

    console.log(`Deployed to ${contract.address}`)

    if (process.env.VERIFY === 'true') {
        console.log(`Verifying on Etherscan...`)
        await contract.deployTransaction.wait(5)

        await hre.run('verify:verify', {
            address: contract.address,
            constructorArguments: hardhatConfig.contractArgs
        })
        console.log(`Verified.`)
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
