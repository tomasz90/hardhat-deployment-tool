import { ethers } from 'hardhat'
import hardhatConfig from '../hardhat.config'
import { getScanUrl } from '../networks.config'
const hre = require('hardhat')

async function main() {
    const ContractFactory = await ethers.getContractFactory(hardhatConfig.contract)

    const signers = await ethers.getSigners() // includes provider
    const deployer = signers[hardhatConfig.deployerIndex]

    console.log(`Deployer [${hardhatConfig.deployerIndex}], address: ${deployer.address}`)
    console.log(`Deploying: ${hardhatConfig.contract} with args[]: ${hardhatConfig.contractArgs} and value: ${ethers.utils.formatEther(hardhatConfig.value)} ETH`)

    let contract = await ContractFactory.connect(deployer).deploy(...hardhatConfig.contractArgs, { value: hardhatConfig.value })
    contract = await contract.deployed()

    console.log(`Deployed to: ${getScanUrl(hre.network)}/address/${contract.address}`)
    console.log(`At tx: ${getScanUrl(hre.network)}/tx/${contract.deployTransaction.hash}`)

    console.log(`Calculating cost...`)

    const receipt = await contract.deployTransaction.wait()
    const cost = ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
    console.log(`Cost: ${cost} ETH`)
    console.log(`Gas used: ${receipt.gasUsed}`)

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
