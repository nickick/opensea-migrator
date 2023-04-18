import Moralis from 'moralis';

try {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
} catch (error) {
  // no op
}

export const fetchMoralis = async (
  id: string,
  address: string,
  chain: string
) => {
  const moralisResults = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: chain === 'goerli' ? '0x5' : '0x1',
    format: 'decimal',
    tokenAddresses: [address || ''],
    address: id,
  });

  const results = moralisResults.raw.result || [];

  const metadata = await Moralis.EvmApi.nft.getMultipleNFTs({
    chain: chain === 'goerli' ? '0x5' : '0x1',
    tokens: results.map((result) => {
      return {
        tokenAddress: address || '',
        tokenId: result.token_id,
      };
    }),
  });

  await Promise.all(
    metadata.raw.map(async (data) => {
      if (data?.metadata) {
        return;
      } else if (data?.token_uri) {
        const tokenUriFetch = await fetch(data?.token_uri);
        data.metadata = JSON.stringify(await tokenUriFetch.json());
      }
    })
  );

  return (
    metadata.raw.map((data) => {
      const parsedMetadata = JSON.parse(data?.metadata || '{}');
      return {
        ...parsedMetadata,
        tokenId: data?.token_id,
      };
    }) || []
  );
};
