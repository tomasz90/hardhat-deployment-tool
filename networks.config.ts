import { NetworksUserConfig } from 'hardhat/src/types/config'
import * as dotenv from 'dotenv'
import { Network } from './util/network.enum'
import { HttpNetworkAccountsUserConfig } from 'hardhat/types'

dotenv.config()

const mnemonic = process.env.MNEMONIC!

const accounts: HttpNetworkAccountsUserConfig = {
        mnemonic: mnemonic,
        count: 100
}

export const networks: NetworksUserConfig = {
    // TESTNETS
    [Network.goerli]: {
        url: `https://goerli.blockpi.network/v1/rpc/public`,
        accounts: accounts
    },
    [Network.arbitrumTestnet]: {
        url: `https://goerli.arbitrum.io/rpc`,
        accounts: accounts
    },
    [Network.optimismTestnet]: {
        url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: accounts
    },
    [Network.mumbai]: {
        url: `https://matic-mumbai.chainstacklabs.com`,
        accounts: accounts
    },
    [Network.baseTestnet]: {
        url: `https://goerli.base.org`,
        accounts: accounts
    },

    // MAINNETS
    [Network.polygon]: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: accounts
    },
    [Network.arbitrumMain]: {
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: accounts
    },
    [Network.optimismMain]: {
        url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: accounts
    },
    [Network.bscMain]: {
        url: `https://bsc-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: accounts
    }
}
