import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Button from 'src/components/Button';
import React, { useEffect, useState } from 'react';
import ChoosePieces from './steps/ChoosePieces';
import SetApprovals from './steps/SetApprovals';
import WrapPieces from './steps/WrapPieces';

type StepProps = {
  moveBackStep: () => void;
  moveToNextStep: () => void;
  stepOrder: number;
  currentStep: number;
};

type MigratorStepsProps = {
  steps: React.FunctionComponent<StepProps>[];
};

const MigratorSteps = ({ steps }: MigratorStepsProps) => {
  const [step, setStep] = useState(0);

  const MAX_STEP = steps.length;

  const moveToNextStep = () => {
    setStep(Math.min(step + 1, MAX_STEP - 1));
  };

  const moveBackStep = () => {
    setStep(Math.max(step - 1, 0));
  };

  return (
    <div className="w-full h-full p-10 flex flex-col space-y-4">
      {steps.map((stepComponent, i) => {
        return React.createElement<StepProps>(stepComponent, {
          moveBackStep,
          moveToNextStep,
          stepOrder: i,
          currentStep: step,
          key: i,
        });
      })}
    </div>
  );
};

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
    <div
      className="bg-gray-50/90 w-full"
      style={{
        height: '40rem',
      }}
    >
      {!isConnected || !accountLoaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <Button onClick={() => connect()}>Connect Wallet</Button>
        </div>
      ) : (
        <MigratorSteps steps={[ChoosePieces, SetApprovals, WrapPieces]} />
      )}
    </div>
  );
}
