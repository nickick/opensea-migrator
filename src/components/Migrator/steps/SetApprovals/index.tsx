import Button from 'src/components/Button';
import ShinyButton from 'src/components/ShinyButton';
import { StepText } from 'src/utils/types';
import { useModeSwitch } from 'src/utils/useModeSwitch';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from '../Base';
import {
  useReadIsApproved,
  useWriteContractApproval,
} from './contractInteractions';

type Props = {
  moveToNextStep: () => void;
  moveBackStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
};

const SetApprovals: React.FunctionComponent<Props> = ({
  moveToNextStep,
  moveBackStep,
  text,
  stepOrder,
  currentStep,
}) => {
  const isActive = stepOrder === currentStep;

  const { address } = useAccount();

  const { mode } = useModeSwitch();

  const migrateFromAddress =
    mode === 'normal'
      ? process.env.NEXT_PUBLIC_MIGRATE_FROM_CONTRACT_ADDRESS
      : process.env.NEXT_PUBLIC_MIGRATE_CREATOR_CONTRACT_ADDRESS;
  const operatorAddress =
    process.env.NEXT_PUBLIC_MIGRATE_OPERATOR_CONTRACT_ADDRESS;

  const {
    data: hasAccess,
    isError,
    isLoading: isReadLoading,
  } = useReadIsApproved(
    address || '0x1',
    operatorAddress as `0x${string}`,
    migrateFromAddress as `0x${string}`
  );

  const { data, write, error } = useWriteContractApproval(
    operatorAddress as `0x${string}`,
    migrateFromAddress as `0x${string}`,
    true
  );

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <StepWrapper isActive={isActive}>
      <StepHeader
        title={text.title}
        stepOrder={stepOrder}
        currentStep={currentStep}
      />
      <StepBody isActive={isActive}>
        <div className="grow text-primaryColor space-y-4 pr-12">
          {text.description?.map((desc) => (
            <p key={desc.slice(0, 10)}>{desc}</p>
          ))}
          <ShinyButton
            background="bg-currentStepColor disabled:bg-opacity-20 transition-all rounded-full whitespace-nowrap"
            disabled={!write || isLoading || isSuccess || hasAccess}
            loading={isLoading || isReadLoading}
            onClick={() => {
              write?.();
            }}
          >
            {isSuccess || hasAccess
              ? text.buttonConfirmationText
              : text.buttonText}
          </ShinyButton>
          <div className="flex space-x-4 justify-self-end self-end absolute bottom-6 right-8">
            <Button onClick={moveBackStep} className="rounded-full">
              Back
            </Button>
            <ShinyButton
              onClick={moveToNextStep}
              disabled={!hasAccess && !isSuccess}
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

export default SetApprovals;
