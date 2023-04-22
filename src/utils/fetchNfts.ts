import { Alchemy, Network } from 'alchemy-sdk';
import { MIGRATING_FROM_TOKEN_IDS } from './tokenIds';

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network:
    process.env.NEXT_PUBLIC_CHAIN_NAME === 'goerli'
      ? Network.ETH_GOERLI
      : Network.ETH_MAINNET,
});

export const fetchNfts = async (address: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(address);

  const unwrappedNFts = nfts.ownedNfts.filter((nft) => {
    return (
      nft.contract.address ===
        process.env.NEXT_PUBLIC_MIGRATE_FROM_CONTRACT_ADDRESS &&
      MIGRATING_FROM_TOKEN_IDS.includes(nft.tokenId)
    );
  });
  const wrappedNFts = nfts.ownedNfts.filter((nft) => {
    return (
      nft.contract.address ===
      process.env.NEXT_PUBLIC_MIGRATE_CREATOR_CONTRACT_ADDRESS
    );
  });

  return {
    unwrappedNFts,
    wrappedNFts,
  };
};
