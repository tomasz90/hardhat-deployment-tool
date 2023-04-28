import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { parseEther } from 'ethers/lib/utils'
import { Sender__factory } from '../typechain-types'
import { cost } from './util'

describe('Sender', function() {
    async function deployFixture() {
        const [owner, account1, account2] = await ethers.getSigners()
        const sender = await new Sender__factory(owner).deploy()
        const initialBalance = await account1.getBalance()
        return { sender, owner, account1, account2, initialBalance }
    }

    describe('Sender test', function() {
        it('It should send ether to two users', async function() {
            // given
            const { sender, account1, account2, initialBalance } = await loadFixture(deployFixture)
            const accounts = [account1.address, account2.address]
            const sendValue = parseEther('1')
            const valuePerAccount = sendValue.div(accounts.length)

            // when
            await sender.bulkSend(accounts, { value: sendValue })

            // and
            const tx = await sender.connect(account1).withdraw()
            const receipt = await tx.wait()

            // then
            const expectedBalance = initialBalance.add(valuePerAccount).sub(cost(receipt))
            await expect(await account1.getBalance()).is.eq(expectedBalance, 'Balance is not correct after withdraw')
        })
    })
})
