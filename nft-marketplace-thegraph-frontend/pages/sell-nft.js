import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Input, Form, useNotification, Button, Info } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]
    const dispatch = useNotification()
    const [proceeds, setProceeds] = useState("0")
    const [approved, setApproved] = useState("No")
    const { runContractFunction } = useWeb3Contract()
    const [nftAddress, setNftAddress] = useState()
    const [tokenId, setTokenId] = useState()
    const [price, setPrice] = useState()

    async function approve(nftAddress, tokenId) {
        // let nftAddress = data.data[0].inputResult
        // let tokenId = data.data[1].inputResult
        // let price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()
        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(),
            onError: (error) => {
                console.log(error)
            },
        })
    }

    async function handleApproveSuccess() {
        dispatch({
            type: "success",
            message: "You have successfully approved your NFT.",
            title: "Success!",
            position: "topR",
        })
        return setApproved("Yes")
    }

    async function list(nftAddress, tokenId, price) {
        console.log("test")
        // let nftAddress = data.data[0].inputResult
        // let tokenId = data.data[1].inputResult
        // let price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        })
    }

    async function handleListSuccess() {
        dispatch({
            type: "success",
            message: "You have successfully listed your NFT.",
            title: "Success!",
            position: "topR",
        })
    }

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            message: "You have successfully withdrawn your proceeds",
            title: "Success!",
            position: "topR",
        })
    }

    async function getProceeds() {
        const returnedProceeds = await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        })
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString())
        }
    }

    useEffect(() => {
        getProceeds()
    }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 text-2xl font-sanserif">Sell your NFT!</h1>
            <div className="pl-4">
                <Input
                    label="NFT Address"
                    width="50%"
                    name="NFT Address"
                    onBlur={function noRefCheck() {}}
                    type="text"
                    value=""
                    key="nftAddress"
                    onChange={(e) => setNftAddress(e.target.value)}
                />
                <br />
                <Input
                    label="Token ID"
                    name="Test text Input"
                    onBlur={function noRefCheck() {}}
                    type="number"
                    valueAsNumber=""
                    key="token"
                    onChange={(e) => setTokenId(e.target.value)}
                />
                <br />
                <Input
                    label="Price (in ETH)"
                    name="Test text Input"
                    onBlur={function noRefCheck() {}}
                    type="number"
                    valueAsNumber=""
                    key="price"
                    onChange={(e) => setPrice(ethers.utils.parseUnits(e.target.value, "ether"))}
                />
                <br />
                <div>
                    {approved == "No" ? (
                        <Button
                            size="medium"
                            theme="outline"
                            onClick={() => {
                                approve(nftAddress, tokenId)
                            }}
                            text="Approve"
                        />
                    ) : (
                        <Button
                            size="medium"
                            theme="outline"
                            onClick={() => {
                                list(nftAddress, tokenId, price)
                            }}
                            text="List"
                        />
                    )}
                </div>
            </div>
            <br />
            <div className="pl-4">
                {proceeds != 0 ? (
                    <Button
                        size="large"
                        theme="primary"
                        onClick={() => {
                            runContractFunction({
                                params: {
                                    abi: nftMarketplaceAbi,
                                    contractAddress: marketplaceAddress,
                                    functionName: "withdrawProceeds",
                                    params: {},
                                },
                                onError: (error) => console.log(error),
                                onSuccess: () => handleWithdrawSuccess,
                            })
                        }}
                        text={`Withdraw ${ethers.utils.formatUnits(proceeds, "ether")} ETH`}
                        type="button"
                    />
                ) : (
                    <Button
                        theme="ghost"
                        size="large"
                        text="No profits detected"
                        disabled
                    ></Button>
                )}
            </div>
        </div>
    )
}
