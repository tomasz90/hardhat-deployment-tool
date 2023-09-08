import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'xdeployer'
import { networks } from './networks.config'
import { Network } from './util/network.enum'
import { createXdeployConfig, XdeployPartialConfig } from './util/xdeploy-config-creator'
import { randomUUID } from 'crypto'

interface CustomHardhatUserConfig extends HardhatUserConfig { contract: string }

const config: CustomHardhatUserConfig = {
    contract: 'Main',
    solidity: '0.8.18',
    networks: networks,
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY
    },
}

const xdeployConfig: XdeployPartialConfig = {
    contract: config.contract,
    salt: randomUUID(),
    networks: [Network.goerli] // specify the networks you want to deploy to
}

/*
Here is an example of how to use the xdeployer config with all params:

const xdeployConfig: XdeployPartialConfig = {
    contract: 'Main',
    contractArgs: [],
    salt: 'WAGMI',
    networks: [Network.mumbai, Network.goerli],
    gasLimit: 1.2 * 10 ** 6
}
*/
if (process.env.XDEPLOY === 'true') config.xdeploy = createXdeployConfig(config, xdeployConfig)

export default config
