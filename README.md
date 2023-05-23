# Hardhat Deployment Tool

Easily deploy smart contracts with the same address on any network using CREATE2.

I used example contract called "Sender.sol".

To deploy any contract just create yours inside contracts dir, compile and tweak deploy.ts file to meet your needs.

```shell
npm run xdeploy # deploy contracts on multiple networks defined in hardhat.config.ts
npm run deploy $networkName  # deploy contract on one desired network
```
