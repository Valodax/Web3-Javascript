import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
  networkConfig,
  ADDRESS_ZERO,
} from "../helper-hardhat-config"
import { ethers } from "hardhat"

const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const timeLock = await ethers.getContract("TimeLock", deployer)
  const governor = await ethers.getContract("GovernorContract", deployer)

  log("Setting up roles...")
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
  await proposerTx.wait(1)
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  executorTx.wait(1)
  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  revokeTx.wait(1)
}

export default setupContracts
