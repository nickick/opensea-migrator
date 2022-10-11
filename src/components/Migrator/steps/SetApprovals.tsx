import Button from 'src/components/Button';

type Props = {
  moveToNextStep: () => void;
  moveBackStep: () => void;
  stepOrder: number;
  currentStep: number;
};

const SetApprovals: React.FunctionComponent<Props> = ({
  moveToNextStep,
  moveBackStep,
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
          Set Approvals
        </div>
      </div>
      <div className="flex grow">
        <div className="w-1/12" />
        {stepOrder === currentStep && (
          <div className="flex flex-col items-start justify-between w-11/12 grow">
            Set approvals
            <div className="flex space-x-4 justify-self-end self-end">
              <Button onClick={moveBackStep} type="secondary">
                Back
              </Button>
              <Button onClick={moveToNextStep}>Continue</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetApprovals;
