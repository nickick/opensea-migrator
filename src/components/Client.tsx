import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';
import { createContext, useState } from 'react';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider,
});

type ClientProps = {
  children: React.ReactNode;
};

export const Context = createContext({
  mode: 'normal',
  setMode: (mode: 'normal' | 'reverse' | 'demo') => {},
});

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'normal' | 'reverse' | 'demo'>('normal');
  return (
    <Context.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Pass client to React Context Provider
export default function Client({ children }: ClientProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <StateProvider>{children}</StateProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
