// manual way
const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    //check version
    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    const version1 = await proxyBoxV1.version()
    console.log(`Version ${version1.toString()}`)

    //upgrade
    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    //check version
    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const version2 = await proxyBoxV2.version()
    console.log(`Version ${version2.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
