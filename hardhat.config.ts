import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'xdeployer'
import { networks, populateCommonArgs } from './networks.config'
import { Network } from './util/network.enum'
import { createXdeployConfig, XdeployPartialConfig } from './util/xdeploy-config-creator'
import { randomUUID } from 'crypto'
import { HttpNetworkAccountsUserConfig } from 'hardhat/types'
import * as dotenv from 'dotenv'
import { BigNumberish } from '@ethersproject/bignumber/src.ts/bignumber'

dotenv.config()

const accounts: HttpNetworkAccountsUserConfig = { mnemonic: process.env.MNEMONIC!, count: 100 }

export interface CustomHardhatUserConfig extends HardhatUserConfig {
    contract: string,
    contractArgs: any[],
    value: BigNumberish,
    deployerIndex: number,
    gasLimit?: number,
}

export const config: CustomHardhatUserConfig = {
    contract: 'TestLongtail',
    contractArgs: [],
    value: BigInt(5e16),
    deployerIndex: 0,
    gasLimit: undefined,
    solidity: '0.8.18',
    etherscan: { apiKey: process.env.ETHERSCAN_KEY }
}

const xdeployConfig: XdeployPartialConfig = {
    salt: randomUUID(),
    networks: [Network.goerli, Network.sepolia]
}

config.networks = populateCommonArgs(networks,{ gas: config.gasLimit, accounts: accounts })

if (process.env.XDEPLOY === 'true') config.xdeploy = createXdeployConfig(config, xdeployConfig)

export default config
