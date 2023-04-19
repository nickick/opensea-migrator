import { BigNumber } from 'ethers';
import Image from 'next/image';
import { useState } from 'react';
import Button from 'src/components/Button';
import ShinyButton from 'src/components/ShinyButton';
import Spinner from 'src/components/Spinner';
import { NFT } from 'src/utils/usePieces';
import { StepText } from 'src/utils/types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from '../Base';
import { useMoveTokens } from './contractInteractions';
import { useModeSwitch } from 'src/utils/useModeSwitch';

type WrapPieceProps = {
  image: string;
  name: string;
  tokenId: string;
};

const WrapPiece = ({ image, tokenId, name }: WrapPieceProps) => {
  const operatorAddress = process.env
    .NEXT_PUBLIC_MIGRATE_OPERATOR_CONTRACT_ADDRESS as `0x${string}`;

  const { mode } = useModeSwitch();
  const pre = mode === 'reverse' ? '(Un)' : '';

  const { data, write, isLoading, isSuccess, isError } = useMoveTokens(
    tokenId,
    operatorAddress,
    mode === 'normal' || mode === 'demo'
  );

  return (
    <div className="flex p-2 space-x-4 items-center">
      <Image src={image} alt={name} width={32} height={32} className="" />
      <div>{name}</div>
      <ShinyButton className="rounded-full" onClick={() => write?.()}>
        {isLoading && <Spinner />}
        {isSuccess && <>{pre}Wrapped!</>}
        {!isLoading && !isSuccess && <>{pre}Wrap</>}
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
                {nfts.map(({ tokenId, image, name }) => {
                  if (!selectedPieces.has(tokenId)) {
                    return null;
                  }
                  return (
                    <WrapPiece
                      key={tokenId}
                      image={image}
                      tokenId={tokenId}
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
