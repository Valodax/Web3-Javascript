import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig } from "../helper-hardhat-config"
import { MIN_DELAY } from "../helper-hardhat-config"

const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("Deploying Timelock...")

  const timelock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
}

export default deployTimeLock
