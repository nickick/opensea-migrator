// Small api endpoint to process wallet NFTs for Opensea's contract and the migrating contract.

import { NextApiRequest, NextApiResponse } from 'next';
import Moralis from 'moralis';
import { fetchMoralis } from 'src/utils/fetchMoralis';

try {
  // in case it's already been initialized
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
} catch (error) {
  console.log(error);
}

const fetchWalletNFTs = async (id: string) => {
  const results = await fetchMoralis(
    id,
    process.env.NEXT_PUBLIC_MIGRATE_FROM_CONTRACT_ADDRESS || '',
    process.env.NEXT_PUBLIC_CHAIN_NAME || ''
  );
  return results;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    const { id } = req.query;

    fetchWalletNFTs([id].join(''))
      .then((nfts) => {
        res.status(200).send(nfts);
        resolve(nfts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
        resolve(error);
      });
  });
}
