import Button from 'src/components/Button';
import { useState } from 'react';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from './Base';
import ShinyButton from 'src/components/ShinyButton';

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
          {text.description?.map((desc) => (
            <p key={desc.slice(0, 10)}>{desc}</p>
          ))}
          <ShinyButton
            className="bg-currentStepColor disabled:bg-opacity-20 transition-all rounded-full"
            onClick={() => setDisabled(false)}
            disabled={!disabled}
          >
            {disabled ? text.buttonText : text.buttonConfirmationText}
          </ShinyButton>
          <div className="flex space-x-4 justify-self-end self-end absolute bottom-6 right-8">
            <Button onClick={moveBackStep} className="rounded-full">
              Back
            </Button>
            <ShinyButton
              onClick={moveToBeginning}
              disabled={disabled}
              background="bg-currentStepColor disabled:bg-opacity-20 transition-all"
              className="rounded-full"
            >
              Start Over
            </ShinyButton>
          </div>
        </div>
      </StepBody>
    </StepWrapper>
  );
};

export default WrapPieces;
