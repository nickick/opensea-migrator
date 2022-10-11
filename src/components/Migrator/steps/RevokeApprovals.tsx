import Button from 'src/components/Button';
import { useState } from 'react';
import { StepText } from 'src/utils/types';

type Props = {
  moveToBeginning: () => void;
  moveBackStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
};

const WrapPieces: React.FunctionComponent<Props> = ({
  moveToBeginning,
  moveBackStep,
  text,
  stepOrder,
  currentStep,
}) => {
  const stepStyles =
    stepOrder === currentStep
      ? 'bg-currentStepColor text-white'
      : stepOrder > currentStep
      ? 'bg-futureStepColor text-black'
      : 'bg-previousStepColor opacity-50 text-white';

  const isActive = stepOrder === currentStep;

  const [disabled, setDisabled] = useState(true);

  return (
    <div
      className={`w-full justify-center ${
        isActive ? 'grow' : 'grow-0'
      }  flex flex-col`}
    >
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
          Revoke Approvals
        </div>
      </div>
      <div className="flex grow">
        <div className="w-1/12" />
        {stepOrder === currentStep && (
          <div className="flex flex-col items-start justify-between w-11/12 grow">
            {text.description?.map((desc) => (
              <p key={desc.slice(0, 10)}>{desc}</p>
            ))}
            <Button
              onClick={() => setDisabled(false)}
              type="action"
              disabled={!disabled}
            >
              {disabled ? text.buttonText : text.buttonConfirmationText}
            </Button>
            <div className="flex space-x-4 justify-self-end self-end">
              <Button onClick={moveBackStep} type="secondary">
                Back
              </Button>
              <Button onClick={moveToBeginning} disabled={disabled}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrapPieces;