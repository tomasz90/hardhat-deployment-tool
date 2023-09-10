import { HttpNetworkUserConfig, NetworksUserConfig } from 'hardhat/src/types/config'
import { Network } from './util/network.enum'

interface NetworkUserConfigWithBlockscans extends HttpNetworkUserConfig {
    scan: string
    scanApi?: string
    scanApiKeyName?: string
}

interface NetworksUserConfigWithBlockscans {
    [networkName: string]: NetworkUserConfigWithBlockscans
}

export const networks: NetworksUserConfigWithBlockscans = {
    // TESTNETS
    [Network.goerli]: {
        url: `https://goerli.blockpi.network/v1/rpc/public`,
        scan: `https://goerli.etherscan.io`,
        scanApi: `https://api-goerli.etherscan.io`,
        scanApiKeyName: `ETHERSCAN_KEY`
    },
    [Network.sepolia]: {
        url: `https://rpc.notadegen.com/eth/sepolia`,
        scan: `https://sepolia.etherscan.io`,
        scanApiKeyName: `ETHERSCAN_KEY`
    },
    [Network.arbitrumTestnet]: {
        url: `https://rpc.goerli.arbitrum.gateway.fm`,
        scan: `https://goerli.arbiscan.io`,
        scanApiKeyName: `ARBITRUMSCAN_KEY`
    },
    [Network.optimismTestnet]: {
        url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://goerli.optimistic.etherscan.io`,
        scanApiKeyName: `OPTIMISMSCAN_KEY`
    },
    [Network.mumbai]: {
        url: `https://rpc.ankr.com/polygon_mumbai`,
        scan: `https://mumbai.polygonscan.com`,
        scanApiKeyName: `POLYGONSCAN_KEY`
    },
    [Network.baseTestnet]: {
        url: `https://goerli.base.org`,
        scan: `https://goerli.basescan.org`,
        scanApiKeyName: `BASESCAN_KEY`
    },

    // MAINNETS
    [Network.ethMain]: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://etherscan.io`,
        scanApiKeyName: `ETHERSCAN_KEY`
    },
    [Network.polygon]: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://polygonscan.com`,
        scanApiKeyName: `POLYGONSCAN_KEY`
    },
    [Network.arbitrumMain]: {
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://arbiscan.io`,
        scanApiKeyName: `ARBITRUMSCAN_KEY`
    },
    [Network.optimismMain]: {
        url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://optimistic.etherscan.io`,
        scanApiKeyName: `OPTIMISMSCAN_KEY`
    },
    [Network.bscMain]: {
        url: `https://bsc-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        scan: `https://bscscan.com`,
        scanApiKeyName: `BSCSCAN_KEY`
    }
}

export function getNetworksWithArgs<T extends HttpNetworkUserConfig>(
    networks: NetworksUserConfig,
    args: T
): NetworksUserConfig {
    const updatedNetworks: NetworksUserConfig = {};
    for (const [key, value] of Object.entries(networks)) {
        updatedNetworks[key] = {
            ...value,
            ...args,
        };
    }
    return updatedNetworks;
}

export function getScanUrl(network: any): string {
    return exports.networks[network.name].scan
}

export function getApiKeys() {
    let networkName = process.env.HARDHAT_NETWORK
    if (networkName === undefined) {
        const argv = require('minimist')(process.argv.slice(2));
        networkName = argv.network
    }
    const apiKeyName = networks[networkName!!]?.scanApiKeyName;
    return apiKeyName? process.env[apiKeyName] : undefined
}
