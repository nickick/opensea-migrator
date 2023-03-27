import React, { useEffect, useState } from 'react';
import { StepText } from 'src/utils/types';
import { useAccount } from 'wagmi';
import ConnectButton from '../ConnectButton';
import StepIndicator from './StepIndicator';
import ChoosePieces from './steps/ChoosePieces';
import RevokeApprovals from './steps/RevokeApprovals';
import SetApprovals from './steps/SetApprovals';
import WrapPieces from './steps/WrapPieces';

type StepProps = {
  moveBackStep: () => void;
  moveToNextStep: () => void;
  moveToBeginning: () => void;
  stepOrder: number;
  currentStep: number;
  text: StepText;
};

type MigratorStepsProps = {
  steps: React.FunctionComponent<StepProps>[];
  stepText: StepText[];
};

const MigratorSteps = ({ steps, stepText }: MigratorStepsProps) => {
  const [step, setStep] = useState(0);

  const MAX_STEP = steps.length;

  const moveToNextStep = () => {
    setStep(Math.min(step + 1, MAX_STEP - 1));
  };

  const moveBackStep = () => {
    setStep(Math.max(step - 1, 0));
  };

  const moveToBeginning = () => {
    setStep(0);
  };

  return (
    <div className="w-full flex">
      <div className="w-1/4 flex justify-center">
        <StepIndicator index={step} stepText={stepText} />
      </div>
      <div className="w-3/4 h-full flex flex-col space-y-4">
        {steps.map((stepComponent, i) => {
          return React.createElement<StepProps>(stepComponent, {
            moveBackStep,
            moveToNextStep,
            moveToBeginning,
            stepOrder: i,
            currentStep: step,
            text: stepText[i],
            key: i,
          });
        })}
      </div>
    </div>
  );
};

export default function Migrator({ stepText }: { stepText: StepText[] }) {
  const [accountLoaded, setIsAccountLoaded] = useState(false);

  const { isConnected } = useAccount();

  useEffect(() => {
    setIsAccountLoaded(true);
  }, [accountLoaded]);

  return (
    <div
      className="w-full relative backdrop-blur-xl flex justify-start"
      style={{
        height: '40rem',
      }}
    >
      {/* <div
        className="w-full h-full absolute z-0 border border-[#34B9E5]"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          mixBlendMode: 'overlay',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
        }}
      /> */}
      <div />
      {!isConnected || !accountLoaded ? (
        <ConnectButton background="bg-[#665EF1]" border="" />
      ) : (
        <MigratorSteps
          steps={[ChoosePieces, SetApprovals, WrapPieces, RevokeApprovals]}
          stepText={stepText}
        />
      )}
    </div>
  );
}
