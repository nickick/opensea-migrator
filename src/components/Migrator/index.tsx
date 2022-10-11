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
    <div className="w-full h-full p-10 flex">
      <div className="w-16 flex flex-col justify-between">
        {Array.from(Array(MAX_STEP).keys()).map((i) => {
          const stepStyles =
            i === step
              ? 'bg-blue-500 text-white'
              : i > step
              ? 'bg-gray-300 text-black'
              : 'bg-green-500 text-white';
          return (
            <div
              key={i}
              className={`flex justify-center items-center h-12 w-12 rounded-full ${stepStyles}`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="pl-12">
        {React.createElement<StepProps>(steps[step], {
          moveBackStep,
          moveToNextStep,
        })}
      </div>
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
    <div className="bg-gray-50/90 h-96 w-full">
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
