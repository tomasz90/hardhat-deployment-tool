import { HttpNetworkUserConfig, NetworksUserConfig } from 'hardhat/src/types/config'
import { ethers } from 'ethers'
import { CustomHardhatUserConfig } from '../hardhat.config'
import { randomBytes } from 'crypto'

export interface XdeployConfig extends XdeployPartialConfig {
    contract: string
    contractArgs?: string[]
    signer: string
    rpcUrls: string[]
    gasLimit?: number
}

export interface XdeployPartialConfig {
    salt?: string
    networks: string[]
}

export function createXdeployConfig(
    hardhatConfig: CustomHardhatUserConfig,
    xdeployPartialConfig: XdeployPartialConfig
): XdeployConfig {
    console.log(xdeployPartialConfig.salt)

    const salt = xdeployPartialConfig.salt ? xdeployPartialConfig.salt : randomBytes(32).toString('hex')
    console.log(salt)
    hardhatConfig.networks = Object.keys(hardhatConfig.networks!)
        .filter((networkName) => xdeployPartialConfig.networks.includes(networkName))
        .reduce((obj: NetworksUserConfig, networkName) => {
            obj[networkName] = hardhatConfig.networks![networkName]
            return obj
        }, {})

    const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC!).privateKey

    const rpcUrls = xdeployPartialConfig.networks.map(
        (networkName) => (hardhatConfig.networks![networkName] as HttpNetworkUserConfig).url!
    )

    return {
        contract: hardhatConfig.contract,
        contractArgs: hardhatConfig.contractArgs,
        salt: salt,
        networks: xdeployPartialConfig.networks,
        gasLimit: hardhatConfig.gasLimit,
        signer: signer,
        rpcUrls: rpcUrls
    }
}
