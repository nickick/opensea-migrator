import Button from 'src/components/Button';
import { useState } from 'react';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from '.';

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
      <StepHeader stepOrder={stepOrder} currentStep={currentStep}>
        {text.title}
      </StepHeader>
      <StepBody isActive={isActive}>
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
      </StepBody>
    </StepWrapper>
  );
};

export default WrapPieces;
