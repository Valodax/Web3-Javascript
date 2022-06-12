import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flew-row justify-between items-center">
            <Link href="/">
                <h1 className="py-4 px-4 text-3xl font-semibold">NFT Marketplace</h1>
            </Link>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6 hover:font-semibold">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6 hover:font-semibold">Sell NFT</a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
