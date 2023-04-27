import { NetworksUserConfig } from 'hardhat/src/types/config'
import * as dotenv from 'dotenv'
import { Network } from './util/network.enum'

dotenv.config()

const mnemonic = process.env.MNEMONIC!
export const networks: NetworksUserConfig = {
    // TESTNETS
    [Network.goerli]: {
        url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: { mnemonic: mnemonic }
    },
    [Network.arbitrumTestnet]: {
        url: `https://goerli.arbitrum.io/rpc`,
        accounts: { mnemonic: mnemonic }
    },
    [Network.optimismTestnet]: {
        url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: { mnemonic: mnemonic }
    },
    [Network.mumbai]: {
        url: `https://matic-mumbai.chainstacklabs.com`,
        accounts: { mnemonic: mnemonic }
    },

    // MAINNETS
    [Network.polygon]: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: { mnemonic: mnemonic }
    },
    [Network.arbitrumMain]: {
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: { mnemonic: mnemonic }
    },
    [Network.optimismMain]: {
        url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: { mnemonic: mnemonic }
    },
    [Network.bscMain]: {
        url: `https://bsc-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: { mnemonic: mnemonic }
    }
}
