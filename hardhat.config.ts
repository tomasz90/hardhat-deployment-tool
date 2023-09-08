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
    contractArgs?: string[],
    gasLimit?: number
}

export const config: CustomHardhatUserConfig = {
    contract: 'Main',
    contractArgs: [],
    solidity: '0.8.18',
    networks: networks,
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY
    },
    gasLimit: undefined
}

config.networks = {
    // TESTNETS
    [Network.goerli]: {
        url: `https://goerli.blockpi.network/v1/rpc/public`,
        accounts: accounts
    }
}//populateCommonArgs(config.networks!!,{ gas: config.gasLimit, accounts: accounts })

const xdeployConfig: XdeployPartialConfig = {
    salt: randomUUID(),
    networks: [Network.goerli] // specify the networks you want to deploy to
}

if (process.env.XDEPLOY === 'true') config.xdeploy = createXdeployConfig(config, xdeployConfig)

export default config
