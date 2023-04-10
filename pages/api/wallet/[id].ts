// Small api endpoint to process wallet NFTs for Opensea's contract and the migrating contract.

import { NextApiRequest, NextApiResponse } from 'next';
import { MIGRATING_FROM_TOKEN_IDS } from 'src/utils/tokenIds';

const sdk = require('api')('@opensea/v1.0#7dtmkl3ojw4vb');

const fetchWalletNFTs = async (id: string) => {
  const fetchFn =
    process.env.NODE_ENV === 'production'
      ? sdk.retrievingAssets
      : sdk.retrievingAssetsRinkeby;

  const results = await fetchFn({
    owner: id,
    token_ids: MIGRATING_FROM_TOKEN_IDS,
  });

  const migratedResults = await sdk.retrievingAssetsRinkeby({
    owner: id,
    collection: process.env.NEXT_PUBLIC_MIGRATE_CREATOR_CONTRACT_ADDRESS,
  });

  return [results.assets || [], migratedResults.assets || []];
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
