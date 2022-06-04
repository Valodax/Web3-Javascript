// This file uses the hardhat library
const { run, network } = require("hardhat")
const { networkConfig } = require("./helper-hardhat-config")

const verify = async (contractAddress, args) => {
  console.log("Verifying Contract...")
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: "contracts/OurToken.sol:OurToken",
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("You've already verified this contract!")
    } else {
      console.log("ERROR")
      console.log(e)
    }
  }
}

module.exports = {
  verify,
}
