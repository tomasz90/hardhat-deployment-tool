import { HttpNetworkUserConfig, NetworksUserConfig } from 'hardhat/src/types/config'
import { ethers } from 'ethers'
import { HardhatUserConfig } from 'hardhat/config'
import { randomBytes } from 'crypto'

export interface XdeployConfig extends XdeployPartialConfig {
    signer: string
    rpcUrls: string[]
}

export interface XdeployPartialConfig {
    contract: string
    contractArgs?: string[]
    salt?: string
    networks: string[]
    gasLimit?: number
}

export function createXdeployConfig(
    config: HardhatUserConfig,
    xdeployPartialConfig: XdeployPartialConfig
): XdeployConfig {
    console.log(xdeployPartialConfig.salt)

    const salt = xdeployPartialConfig.salt ? xdeployPartialConfig.salt : randomBytes(32).toString('hex')
    console.log(salt)
    config.networks = Object.keys(config.networks!)
        .filter((networkName) => xdeployPartialConfig.networks.includes(networkName))
        .reduce((obj: NetworksUserConfig, networkName) => {
            obj[networkName] = config.networks![networkName]
            return obj
        }, {})

    const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC!).privateKey

    const rpcUrls = xdeployPartialConfig.networks.map(
        (networkName) => (config.networks![networkName] as HttpNetworkUserConfig).url!
    )

    return {
        contract: xdeployPartialConfig.contract,
        contractArgs: xdeployPartialConfig.contractArgs,
        salt: salt,
        networks: xdeployPartialConfig.networks,
        gasLimit: xdeployPartialConfig.gasLimit,
        signer: signer,
        rpcUrls: rpcUrls
    }
}
