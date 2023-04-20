import { useCallback, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useModeSwitch } from './useModeSwitch';
import { Context } from 'src/components/Client';

export type NFT = {
  image: string;
  name: string;
  tokenId: string;
};

export const useSelectPieces = () => {
  const [loading, setLoading] = useState(false);
  const { nfts, setNfts, selectedPieces, setSelectedPieces } =
    useContext(Context);
  const { address } = useAccount();
  const { mode } = useModeSwitch();

  async function fetchNFTs({ setFn }: { setFn: (nfts: NFT[]) => void }) {
    setLoading(true);
    const nftResponse = await fetch(
      mode === 'normal'
        ? `/api/wallet/${address}/unwrapped`
        : `/api/wallet/${address}/wrapped`
    );
    const nftRes: NFT[] = await nftResponse.json();
    setFn(nftRes);
    setLoading(false);
  }

  const memoizedFetchNFT = useCallback(fetchNFTs, [address, mode]);

  useEffect(() => {
    setNfts([]);
  }, [mode, setNfts]);

  useEffect(() => {
    if (!loading && address && nfts.length === 0) {
      memoizedFetchNFT({ setFn: setNfts });
    }
  }, [address, memoizedFetchNFT, loading, nfts.length, mode, setNfts]);

  const setSelected = (token_id: string) => {
    return () => {
      const newSelectedNFts = new Set(selectedPieces);
      selectedPieces.has(token_id)
        ? newSelectedNFts.delete(token_id)
        : newSelectedNFts.add(token_id);
      setSelectedPieces(newSelectedNFts);
    };
  };

  const clearSelected = () => {
    setSelectedPieces(new Set());
  };

  return {
    loading,
    nfts,
    selectedPieces,
    setSelected,
    clearSelected,
  };
};
