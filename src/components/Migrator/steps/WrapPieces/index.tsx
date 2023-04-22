import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from 'src/components/Button';
import ShinyButton from 'src/components/ShinyButton';
import Spinner from 'src/components/Spinner';
import { OLD_TOKEN_TO_NEW_TOKEN_ID_MAP } from 'src/utils/tokenIds';
import { StepText } from 'src/utils/types';
import { useModeSwitch } from 'src/utils/useModeSwitch';
import { useAccount } from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from '../Base';
import {
  useIsContractAdmin,
  useMoveTokens,
  useResetTokenWrappability,
} from './contractInteractions';
import { Nft } from 'alchemy-sdk';
import { useConfirming } from 'src/utils/useConfirming';

type WrapPieceProps = {
  image: string;
  name: string;
  tokenId: string;
  incrementWrappedCount: () => void;
};

const WrapPiece = ({
  image,
  tokenId,
  name,
  incrementWrappedCount,
}: WrapPieceProps) => {
  const operatorAddress = process.env
    .NEXT_PUBLIC_MIGRATE_OPERATOR_CONTRACT_ADDRESS as `0x${string}`;

  const { mode } = useModeSwitch();
  const pre = mode === 'reverse' ? '(Un)' : '';

  const { data, write, isLoading, isSuccess, isError } = useMoveTokens(
    tokenId,
    operatorAddress,
    mode === 'normal' || mode === 'demo'
  );

  const { confirmed, waitingForConfirmation } = useConfirming(data);

  const newTokenIdToOldTokenId: { [key: string]: string } = Object.fromEntries(
    Object.entries(OLD_TOKEN_TO_NEW_TOKEN_ID_MAP).map(([key, value]) => [
      value,
      key,
    ])
  );

  const {
    data: resetData,
    write: resetToken,
    isSuccess: finishedResetting,
    isLoading: resetLoading,
  } = useResetTokenWrappability(
    (OLD_TOKEN_TO_NEW_TOKEN_ID_MAP[tokenId]
      ? tokenId
      : newTokenIdToOldTokenId[tokenId]) as string,
    operatorAddress
  );

  const {
    confirmed: resetConfirmed,
    waitingForConfirmation: resetWaitingForConfirmation,
  } = useConfirming(resetData);

  const { address } = useAccount();
  const isAdmin = useIsContractAdmin(
    process.env.NEXT_PUBLIC_MIGRATE_OPERATOR_CONTRACT_ADDRESS as `0x${string}`,
    address as `0x${string}`
  );

  const increment = useCallback(() => {
    incrementWrappedCount();
  }, [incrementWrappedCount]);

  useEffect(() => {
    if (isAdmin && mode === 'reverse' && confirmed && resetConfirmed) {
      increment();
    } else if (confirmed) {
      increment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed, resetConfirmed, isAdmin]);

  return (
    <div className="flex p-2 space-x-4 items-center border rounded-xl">
      <div className="h-32 w-32 relative border rounded-xl overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div>{name}</div>
      <ShinyButton
        className="rounded-full"
        onClick={() => write?.()}
        disabled={isSuccess || waitingForConfirmation}
      >
        {isSuccess && confirmed ? <>{pre}Wrapped!</> : <>{pre}Wrap</>}
        {isLoading || (waitingForConfirmation && <Spinner />)}
      </ShinyButton>
      {isAdmin && (
        <Button
          disabled={
            !isAdmin || finishedResetting || resetWaitingForConfirmation
          }
          onClick={() => {
            resetToken?.();
          }}
          className="rounded-full"
        >
          {finishedResetting && resetConfirmed
            ? 'Token reset!'
            : 'Admin detected! Reset Token Wrappability'}
          {resetLoading || (resetWaitingForConfirmation && <Spinner />)}
        </Button>
      )}
    </div>
  );
};

type WrapPiecesProps = {
  moveToNextStep: () => void;
  moveBackStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
  nfts: Nft[];
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
  const isActive = stepOrder === currentStep;

  const [completed, setCompleted] = useState(false);
  const [wrappedCount, setWrappedCount] = useState(0);
  function incrementWrappedCount() {
    setWrappedCount(Math.min(wrappedCount + 1, nfts.length));
  }

  useEffect(() => {
    if (wrappedCount === selectedPieces.size) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [wrappedCount, selectedPieces.size]);

  const { mode } = useModeSwitch();
  const pre = mode === 'reverse' ? '(Un)' : '';

  return (
    <StepWrapper isActive={isActive}>
      <StepHeader
        title={`${pre}${text.title}`}
        stepOrder={stepOrder}
        currentStep={currentStep}
      />
      <StepBody isActive={isActive}>
        <div className="grow text-primaryColor space-y-4 mr-10">
          <>
            {text.description?.map((desc) => (
              <p key={desc.slice(0, 10)}>{desc}</p>
            ))}
            {nfts && nfts.map && (
              <div className="flex flex-col">
                {nfts.map(({ tokenId, media, rawMetadata }) => {
                  if (!selectedPieces.has(tokenId)) {
                    return null;
                  }
                  return (
                    <WrapPiece
                      key={tokenId}
                      image={media[0]?.raw}
                      tokenId={tokenId}
                      incrementWrappedCount={incrementWrappedCount}
                      name={rawMetadata?.name || ''}
                    />
                  );
                })}
              </div>
            )}

            <div>
              {pre}Wrapped {wrappedCount} / {selectedPieces.size} selected
              pieces.
            </div>
            {completed && (
              <div>
                {mode === 'normal'
                  ? text.buttonConfirmationText
                  : 'Your piece has been unwrapped and reset!'}
              </div>
            )}
          </>

          <div className="flex space-x-4 justify-self-end self-end absolute bottom-6 right-8">
            <Button onClick={moveBackStep} className="rounded-full">
              Back
            </Button>
            <ShinyButton
              onClick={moveToNextStep}
              disabled={!completed}
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
