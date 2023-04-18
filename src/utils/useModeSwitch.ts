import { useState } from 'react';
import { goerli } from 'wagmi';
import { useNetwork } from 'wagmi';

export const useModeSwitch = () => {
  const { chain } = useNetwork();
  const [mode, setMode] = useState<'normal' | 'reverse' | 'demo'>('normal');

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
