// Small api endpoint to process wallet NFTs a little more securely with Moralis API key.

import { NextApiRequest, NextApiResponse } from 'next';

const sdk = require('api')('@opensea/v1.0#7dtmkl3ojw4vb');

const MIGRATING_FROM_TOKEN_IDS = [
  // Goerli test values
  '19581845787315820542309529478330392586387484444772608262239428011684022714369',
  '19581845787315820542309529478330392586387484444772608262239428009484999458817',
  '19581845787315820542309529478330392586387484444772608262239428010584511086593',
  '19581845787315820542309529478330392586387484444772608262239428007285976203265',
  '19581845787315820542309529478330392586387484444772608262239428006186464575489',
];

const fetchWalletNFTs = async (id: string) => {
  const results = await sdk.retrievingAssetsRinkeby({
    owner: id,
    token_ids: MIGRATING_FROM_TOKEN_IDS,
    include_orders: 'false',
  });

  return results.assets;
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
