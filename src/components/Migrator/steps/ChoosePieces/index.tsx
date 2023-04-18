import ShinyButton from 'src/components/ShinyButton';
import { NFT, useSelectPieces } from 'src/utils/usePieces';
import { StepText } from 'src/utils/types';
import { StepBody, StepHeader, StepWrapper } from '../Base';
import PiecesGallery from './Gallery';
import { useModeSwitch } from 'src/utils/useModeSwitch';

type Props = {
  nfts: NFT[];
  loading: boolean;
  currentStep: number;
  moveToNextStep: () => void;
  selectedPieces: Set<string>;
  setSelected: (token_id: string) => () => void;
  stepOrder: number;
  text: StepText;
};

const ChoosePieces: React.FunctionComponent<Props> = ({
  currentStep,
  loading,
  nfts,
  moveToNextStep,
  setSelected,
  selectedPieces,
  stepOrder,
  text,
}) => {
  const isActive = stepOrder === currentStep;
  const { mode } = useModeSwitch();

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
