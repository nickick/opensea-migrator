import { useState } from 'react';
import Button from 'src/components/Button';
import ShinyButton from 'src/components/ShinyButton';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from './Base';

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
      <StepHeader
        title={text.title}
        stepOrder={stepOrder}
        currentStep={currentStep}
      />
      <StepBody isActive={isActive}>
        <div className="grow text-primaryColor space-y-4">
          {disabled ? (
            <>
              {text.description?.map((desc) => (
                <p key={desc.slice(0, 10)}>{desc}</p>
              ))}
              <ShinyButton
                className="bg-currentStepColor disabled:bg-opacity-20 transition-all rounded-full"
                onClick={() => setDisabled(false)}
                disabled={!disabled}
              >
                {text.buttonText}
              </ShinyButton>
            </>
          ) : (
            <div>{text.buttonConfirmationText}</div>
          )}
          <div className="flex space-x-4 justify-self-end self-end absolute bottom-6 right-8">
            <Button onClick={moveBackStep} className="rounded-full">
              Back
            </Button>
            <ShinyButton
              onClick={moveToNextStep}
              disabled={disabled}
              background="bg-currentStepColor disabled:bg-opacity-20 transition-all"
              className="rounded-full"
            >
              Continue
            </ShinyButton>
          </div>
        </div>
      </StepBody>
    </StepWrapper>
  );
};

export default WrapPieces;
