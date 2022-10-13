import Button from 'src/components/Button';
import { StepText } from 'src/utils/types';

type Props = {
  moveToNextStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
};

export const StepWrapper = ({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`w-full justify-center ${
      isActive ? 'grow' : 'grow-0'
    } flex flex-col`}
  >
    {children}
  </div>
);

export const StepHeader = ({
  stepOrder,
  currentStep,
  children,
}: {
  stepOrder: number;
  currentStep: number;
  children: React.ReactNode;
}) => {
  const stepStyles =
    stepOrder === currentStep
      ? 'bg-currentStepColor text-white'
      : stepOrder > currentStep
      ? 'bg-futureStepColor text-black'
      : 'bg-previousStepColor opacity-50 text-white';

  return (
    <div className="flex items-center">
      <div className={`flex w-1/12 justify-center items-center`}>
        <div
          className={`h-12 w-12 text-center rounded-full flex items-center justify-center ${stepStyles}`}
        >
          {stepOrder + 1}
        </div>
      </div>
      <div
        className={`text-2xl font-bold w-11/12 ${
          stepOrder === currentStep ? 'text-black' : 'text-gray-400'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const StepBody = ({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex grow">
    <div className="w-1/12" />
    {isActive && (
      <div className="flex flex-col items-start justify-between w-11/12 grow">
        {children}
      </div>
    )}
  </div>
);
