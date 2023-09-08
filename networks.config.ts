import { HttpNetworkUserConfig, NetworksUserConfig } from 'hardhat/src/types/config'
import { Network } from './util/network.enum'

export const networks: NetworksUserConfig = {
    // TESTNETS
    [Network.goerli]: {
        url: `https://goerli.blockpi.network/v1/rpc/public`
    },
    [Network.arbitrumTestnet]: {
        url: `https://goerli.arbitrum.io/rpc`
    },
    [Network.optimismTestnet]: {
        url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    },
    [Network.mumbai]: {
        url: `https://matic-mumbai.chainstacklabs.com`
    },
    [Network.baseTestnet]: {
        url: `https://goerli.base.org`
    },

    // MAINNETS
    [Network.ethMain]: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    },
    [Network.polygon]: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    },
    [Network.arbitrumMain]: {
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    },
    [Network.optimismMain]: {
        url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    },
    [Network.bscMain]: {
        url: `https://bsc-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    }
}

export function populateCommonArgs(networks: NetworksUserConfig, args: HttpNetworkUserConfig): NetworksUserConfig {
    const updatedNetworks: NetworksUserConfig = {}
    for (const [key, value] of Object.entries(networks)) {
        updatedNetworks[key] = {
            ...value,
            accounts: args.accounts,
            gas: args.gas
        }
    }
    return updatedNetworks
}
