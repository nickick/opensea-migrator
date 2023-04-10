import { BigNumber } from 'ethers';
import Image from 'next/image';
import { useState } from 'react';
import Button from 'src/components/Button';
import ShinyButton from 'src/components/ShinyButton';
import Spinner from 'src/components/Spinner';
import { NFT } from 'src/components/usePieces';
import { StepText } from 'src/utils/types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from '../Base';

type WrapPieceProps = {
  image_url: string;
  token_id: string;
  name: string;
};

const WrapPiece = ({ image_url, token_id, name }: WrapPieceProps) => {
  const { config } = usePrepareContractWrite({
    address: process.env
      .NEXT_PUBLIC_MIGRATE_TO_CONTRACT_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'wrap',
        inputs: [
          { internalType: 'uint256', name: 'oldTokenId', type: 'uint256' },
        ],
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [BigNumber.from(token_id)],
    functionName: 'wrap',
  });

  const { data, write, isLoading, isSuccess, isError } =
    useContractWrite(config);

  return (
    <div className="flex p-2 space-x-4 items-center">
      <Image src={image_url} alt={name} width={32} height={32} className="" />
      <div>{name}</div>
      <ShinyButton className="rounded-full" onClick={() => write?.()}>
        {isLoading && <Spinner />}
        {isSuccess && <>Wrapped!</>}
        {!isLoading && !isSuccess && <>Wrap</>}
      </ShinyButton>
    </div>
  );
};

type WrapPiecesProps = {
  moveToNextStep: () => void;
  moveBackStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
  nfts: NFT[];
  selectedPieces: Set<string>;
};

const WrapPieces: React.FunctionComponent<WrapPiecesProps> = ({
  moveToNextStep,
  moveBackStep,
  text,
  stepOrder,
  currentStep,
  nfts,
  selectedPieces,
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
              <div className="flex flex-col">
                {nfts.map(({ token_id, image_url, name }) => {
                  if (!selectedPieces.has(token_id)) {
                    return null;
                  }
                  return (
                    <WrapPiece
                      key={token_id}
                      image_url={image_url}
                      token_id={token_id}
                      name={name}
                    />
                  );
                })}
              </div>
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
