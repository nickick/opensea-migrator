// Small api endpoint to process wallet NFTs for Opensea's contract and the migrating contract.

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchNfts } from 'src/utils/fetchNfts';

const fetchWalletNFTs = async (id: string) => {
  const { unwrappedNFts } = await fetchNfts(id);

  // cause we might get a throttling message in the request data body
  return unwrappedNFts;
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
