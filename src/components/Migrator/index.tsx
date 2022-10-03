import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Button from 'src/components/Button';
import { useEffect, useState } from 'react';

export default function Migrator() {
  const [accountLoaded, setIsAccountLoaded] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setIsAccountLoaded(true);
  }, [accountLoaded]);

  return (
    <div className="bg-gray-50/90 h-96 w-full">
      {!isConnected || !accountLoaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <Button onClick={() => connect()}>Connect Wallet</Button>
        </div>
      ) : (
        <div>
          Connected to {address}
          <br />
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
      )}
    </div>
  );
}
