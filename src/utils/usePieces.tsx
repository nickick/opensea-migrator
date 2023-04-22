import { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from 'src/components/Client';
import { useAccount } from 'wagmi';
import { useModeSwitch } from './useModeSwitch';
import { Nft } from 'alchemy-sdk';

export const useSelectPieces = () => {
  const { selectedPieces, setSelectedPieces } = useContext(Context);

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
    selectedPieces,
    setSelected,
    clearSelected,
  };
};

export const useGetPieces = () => {
  const { address } = useAccount();
  const { mode } = useModeSwitch();
  const [loading, setLoading] = useState(false);
  const { nfts, setNfts } = useContext(Context);

  async function fetchNFTs({ setFn }: { setFn: (nfts: Nft[]) => void }) {
    if (nfts.length) return nfts;
    if (!loading) {
      setLoading(true);
      const nftResponse = await fetch(
        mode === 'normal'
          ? `/api/wallet/${address}/unwrapped`
          : `/api/wallet/${address}/wrapped`
      );
      const nftRes: Nft[] = await nftResponse.json();
      setFn(nftRes);
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedFetchNFT = useCallback(fetchNFTs, [mode, address]);

  useEffect(() => {
    setNfts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (!loading && address && nfts.length === 0) {
      memoizedFetchNFT({ setFn: setNfts });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, mode]);

  return {
    loading,
    nfts,
  };
};
