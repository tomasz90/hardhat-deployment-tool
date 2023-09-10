import { HttpNetworkUserConfig, NetworksUserConfig, NetworkUserConfig } from 'hardhat/src/types/config'
import { Network } from './util/network.enum'

interface NetworkUserConfigWithBlockscans extends HttpNetworkUserConfig {
    scan: string
    scanApi?: string
}

interface NetworksUserConfigWithBlockscans {
    [networkName: string]: NetworkUserConfigWithBlockscans
}

export const networks: NetworksUserConfigWithBlockscans = {
    // TESTNETS
    [Network.goerli]: {
        url: `https://goerli.blockpi.network/v1/rpc/public`,
        scan: `https://goerli.etherscan.io`,
        scanApi: `https://api-goerli.etherscan.io`
    },
    [Network.arbitrumTestnet]: {
        url: `https://rpc.goerli.arbitrum.gateway.fm`,
        scan: `https://goerli.arbiscan.io`
    },
    [Network.optimismTestnet]: {
        url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://goerli.optimistic.etherscan.io`
    },
    [Network.mumbai]: {
        url: `https://rpc.ankr.com/polygon_mumbai`,
        scan: `https://mumbai.polygonscan.com`
    },
    [Network.baseTestnet]: {
        url: `https://goerli.base.org`,
        scan: `https://goerli.basescan.org`
    },

    // MAINNETS
    [Network.ethMain]: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://etherscan.io`
    },
    [Network.polygon]: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://polygonscan.com`
    },
    [Network.arbitrumMain]: {
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://arbiscan.io`
    },
    [Network.optimismMain]: {
        url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://optimistic.etherscan.io`
    },
    [Network.bscMain]: {
        url: `https://bsc-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://bscscan.com`
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

export function getScanUrl(network: any): string {
    return exports.networks[network.name].scan
}
