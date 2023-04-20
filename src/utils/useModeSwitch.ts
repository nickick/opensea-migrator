import { useContext } from 'react';
import { Context } from 'src/components/Client';
import { goerli, useNetwork } from 'wagmi';
import { useSelectPieces } from './usePieces';

export const useModeSwitch = () => {
  const { chain } = useNetwork();
  const { mode, setMode } = useContext(Context);

  function switchMode(mode: 'normal' | 'reverse' | 'demo') {
    if (chain?.id !== goerli.id) {
      return;
    }

    setMode(mode);
  }

  return {
    mode,
    switchMode,
  };
};
