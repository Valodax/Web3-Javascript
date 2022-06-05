// Script that deposits ETH for WETH
//
const { networkConfig } = require("../helper-hardhat-config")
const { getNamedAccounts, ethers, network } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    // call the "deposit" function on the weth contract
    // we need the abi and contract address
    // abi for weth contract got from interface
    // contract address is 0xc778417E063141139Fce010982780140Aa0cD5Ab for rinkeby

    const iWeth = await ethers.getContractAt(
        "IWeth",
        networkConfig[network.config.chainId].wethToken,
        deployer
    )

    tx = await iWeth.deposit({ value: AMOUNT })
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
