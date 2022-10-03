import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import { shortenAddress } from 'src/utils/shortenAddress';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ConnectButton() {
  const [accountLoaded, setIsAccountLoaded] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setIsAccountLoaded(true);
  }, [accountLoaded]);

  if (accountLoaded && isConnected && address) {
    return (
      <Button size="small" onClick={disconnect}>
        {shortenAddress(address)}
      </Button>
    );
  }

  return (
    <Button size="small" onClick={() => connect()}>
      Connect Wallet
    </Button>
  );
}
