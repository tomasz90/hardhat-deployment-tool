import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'xdeployer'
import { networks, populateCommonArgs } from './networks.config'
import { Network } from './util/network.enum'
import { createXdeployConfig, XdeployPartialConfig } from './util/xdeploy-config-creator'
import { randomUUID } from 'crypto'
import { HttpNetworkAccountsUserConfig } from 'hardhat/types'
import * as dotenv from 'dotenv'

dotenv.config()

const accounts: HttpNetworkAccountsUserConfig = { mnemonic: process.env.MNEMONIC!, count: 100 }

export interface CustomHardhatUserConfig extends HardhatUserConfig {
    contract: string,
    gasLimit?: number,
    contractArgs: any[],
}

export const config: CustomHardhatUserConfig = {
    contract: 'BulkSender',
    contractArgs: [], // todo: this is not working for xdeployConfig right now
    solidity: '0.8.18',
    etherscan: { apiKey: process.env.ETHERSCAN_KEY },
    gasLimit: undefined
}

const xdeployConfig: XdeployPartialConfig = {
    salt: randomUUID(),
    networks: [Network.goerli] // specify the networks you want to deploy to
}

config.networks = populateCommonArgs(networks,{ gas: config.gasLimit, accounts: accounts })

if (process.env.XDEPLOY === 'true') config.xdeploy = createXdeployConfig(config, xdeployConfig)

export default config
