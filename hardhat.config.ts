import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config()

const config: HardhatUserConfig = {
    solidity: '0.8.18',
    networks: {
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            chainId: 5,
            accounts: { mnemonic: process.env.MNEMONIC }
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY
    }
}

export default config
