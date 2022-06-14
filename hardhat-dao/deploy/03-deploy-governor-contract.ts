import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
  networkConfig,
} from "../helper-hardhat-config"

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  log("Deploying Timelock...")
  const governanceToken = await get("GovernanceToken")
  const timeLock = await get("TimeLock")
  log("Deploying governor")
  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
}

export default deployGovernorContract
