import { ContractReceipt } from 'ethers'

export function cost(receipt: ContractReceipt){
    return receipt.gasUsed.mul(receipt.effectiveGasPrice)
}