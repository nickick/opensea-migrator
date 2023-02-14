import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import '@rainbow-me/rainbowkit/styles.css';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
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

// Pass client to React Context Provider
export default function Client({ children }: ClientProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
