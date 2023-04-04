import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import ShinyButton from 'src/components/ShinyButton';
import { StepText } from 'src/utils/types';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from './Base';

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

  const { config } = usePrepareContractWrite({
    address: process.env
      .NEXT_PUBLIC_MIGRATE_FROM_CONTRACT_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'setApprovalForAll',
        inputs: [
          { internalType: 'address', name: 'operator', type: 'address' },
          { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [
      process.env.NEXT_PUBLIC_MIGRATE_TO_CONTRACT_ADDRESS as `0x${string}`,
      true,
    ],
    functionName: 'setApprovalForAll',
  });

  const { data, write } = useContractWrite(config);
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
        <div className="grow text-primaryColor space-y-4">
          {text.description?.map((desc) => (
            <p key={desc.slice(0, 10)}>{desc}</p>
          ))}
          <ShinyButton
            background="bg-currentStepColor disabled:bg-opacity-20 transition-all rounded-full whitespace-nowrap"
            disabled={!write || isLoading || isSuccess}
            loading={isLoading}
            onClick={() => {
              write?.();
            }}
          >
            {!isSuccess ? text.buttonText : text.buttonConfirmationText}
          </ShinyButton>
          <div className="flex space-x-4 justify-self-end self-end absolute bottom-6 right-8">
            <Button onClick={moveBackStep} className="rounded-full">
              Back
            </Button>
            <ShinyButton
              onClick={moveToNextStep}
              disabled={isSuccess}
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
