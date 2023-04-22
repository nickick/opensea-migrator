import ShinyButton from 'src/components/ShinyButton';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from '../Base';
import PiecesGallery from './Gallery';
import { Nft } from 'alchemy-sdk';

type Props = {
  nfts: Nft[];
  loading: boolean;
  currentStep: number;
  moveToNextStep: () => void;
  selectedPieces: Set<string>;
  setSelected: (token_id: string) => () => void;
  stepOrder: number;
  text: StepText;
};

const ChoosePieces = ({
  currentStep,
  loading,
  nfts,
  moveToNextStep,
  setSelected,
  selectedPieces,
  stepOrder,
  text,
}: Props) => {
  const isActive = stepOrder === currentStep;

  return (
    <StepWrapper isActive={isActive}>
      <StepHeader
        title={text.title}
        description={text.description}
        stepOrder={stepOrder}
        currentStep={currentStep}
      />
      <StepBody isActive={isActive}>
        <PiecesGallery
          nfts={nfts}
          selectedPieces={selectedPieces}
          setSelected={setSelected}
          loading={loading}
        />
        <div className="flex space-x-4 self-end absolute bottom-6 right-8">
          <ShinyButton
            onClick={moveToNextStep}
            disabled={selectedPieces.size === 0}
            background="bg-currentStepColor disabled:bg-opacity-20 transition-all"
            className="rounded-full"
          >
            Continue
          </ShinyButton>
        </div>
      </StepBody>
    </StepWrapper>
  );
};

export default ChoosePieces;
