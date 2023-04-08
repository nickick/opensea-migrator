import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export type NFT = {
  image_url: string;
  name: string;
  token_id: string;
};

export const useSelectPieces = () => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set());
  const { address } = useAccount();

  async function fetchNFTs() {
    setLoading(true);
    const nftResponse = await fetch(`/api/wallet/${address}`);
    const nftRes: NFT[] = await nftResponse.json();
    setNfts(nftRes);
    setLoading(false);
  }

  const memoizedFetchNFT = useCallback(fetchNFTs, [address]);

  useEffect(() => {
    if (!loading && address && nfts.length === 0) {
      memoizedFetchNFT();
    }
  }, [address, memoizedFetchNFT, loading, nfts.length]);

  const setSelected = (token_id: string) => {
    return () => {
      const newSelectedNFts = new Set(selectedPieces);
      selectedPieces.has(token_id)
        ? newSelectedNFts.delete(token_id)
        : newSelectedNFts.add(token_id);
      setSelectedPieces(newSelectedNFts);
    };
  };

  return {
    loading,
    nfts,
    selectedPieces,
    setSelected,
  };
};
