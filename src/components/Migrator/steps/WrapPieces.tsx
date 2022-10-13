import { useState } from 'react';
import Button from 'src/components/Button';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from '.';

type Props = {
  moveToNextStep: () => void;
  moveBackStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
};

const WrapPieces: React.FunctionComponent<Props> = ({
  moveToNextStep,
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
    <StepWrapper isActive={isActive}>
      <StepHeader stepOrder={stepOrder} currentStep={currentStep}>
        {text.title}
      </StepHeader>
      <StepBody isActive={isActive}>
        <>
          {disabled ? (
            <>
              {text.description?.map((desc) => (
                <p key={desc.slice(0, 10)}>{desc}</p>
              ))}
              <Button
                onClick={() => setDisabled(false)}
                type="action"
                disabled={!disabled}
              >
                {text.buttonText}
              </Button>
            </>
          ) : (
            <div>{text.buttonConfirmationText}</div>
          )}
          <div className="flex space-x-4 justify-self-end self-end">
            <Button onClick={moveBackStep} type="secondary">
              Back
            </Button>
            <Button onClick={moveToNextStep} disabled={disabled}>
              Continue
            </Button>
          </div>
        </>
      </StepBody>
    </StepWrapper>
  );
};

export default WrapPieces;
