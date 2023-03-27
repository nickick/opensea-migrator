import Button from 'src/components/Button';
import { useState } from 'react';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from './Base';

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
        {text.description?.map((desc) => (
          <p key={desc.slice(0, 10)}>{desc}</p>
        ))}
        <Button onClick={() => setDisabled(false)} disabled={!disabled}>
          {disabled ? text.buttonText : text.buttonConfirmationText}
        </Button>
        <div className="flex space-x-4 justify-self-end self-end">
          <Button onClick={moveBackStep}>Back</Button>
          <Button onClick={moveToBeginning} disabled={disabled}>
            Start Over
          </Button>
        </div>
      </StepBody>
    </StepWrapper>
  );
};

export default WrapPieces;
