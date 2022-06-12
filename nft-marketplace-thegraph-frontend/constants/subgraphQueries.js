import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 12) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`
console.log(`Active items: ${GET_ACTIVE_ITEMS}`)
export default GET_ACTIVE_ITEMS
