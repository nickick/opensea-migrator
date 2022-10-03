import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Button from 'src/components/Button';
import { useEffect, useState } from 'react';
import ChoosePieces from './1-choose-pieces';
import SetApprovals from './2-set-approvals';
import WrapPieces from './3-wrap-pieces';

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

  const [step, setStep] = useState(0);

  const MAX_STEP = 4;

  const moveToNextStep = () => {
    setStep(Math.min(step + 1, MAX_STEP));
  };

  const moveBackStep = () => {
    setStep(Math.max(step - 1, 0));
  };

  return (
    <div className="bg-gray-50/90 h-96 w-full">
      {!isConnected || !accountLoaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <Button onClick={() => connect()}>Connect Wallet</Button>
        </div>
      ) : (
        <div className="w-full h-full p-10">
          {step === 0 ? (
            <ChoosePieces moveToNextStep={moveToNextStep} />
          ) : step === 1 ? (
            <SetApprovals
              moveBackStep={moveBackStep}
              moveToNextStep={moveToNextStep}
            />
          ) : (
            <WrapPieces
              moveBackStep={moveBackStep}
              moveToNextStep={moveToNextStep}
            />
          )}
        </div>
      )}
    </div>
  );
}
