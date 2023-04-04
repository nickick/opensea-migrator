import { useContext, useEffect, useState } from 'react';
import ShinyButton from 'src/components/ShinyButton';
import { StepText } from 'src/utils/types';
import { useAccount } from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from '../Base';
import PiecesGallery from './Gallery';
import PiecesContext from '../../PiecesContext';

type Props = {
  moveToNextStep: () => void;
  text: StepText;
  stepOrder: number;
  currentStep: number;
};

type nft = {
  image_url: string;
  name: string;
  token_id: string;
};

const ChoosePieces: React.FunctionComponent<Props> = ({
  moveToNextStep,
  stepOrder,
  currentStep,
  text,
}) => {
  const isActive = stepOrder === currentStep;

  const { address } = useAccount();

  const [nfts, setNfts] = useState<nft[]>([]);

  const [selectedNfts, setSelectedNfts] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchNFTs() {
      const nftResponse = await fetch(`/api/wallet/${address}`);
      const nfts: nft[] = await nftResponse.json();
      setNfts(nfts);
    }

    fetchNFTs();
  }, [address]);

  const piecesContext = useContext(PiecesContext);

  return (
    <StepWrapper isActive={isActive}>
      <StepHeader
        title={text.title}
        description={text.description}
        stepOrder={stepOrder}
        currentStep={currentStep}
      />
      <StepBody isActive={isActive}>
        <PiecesGallery />
        <div className="flex space-x-4 self-end absolute bottom-6 right-8">
          <ShinyButton
            onClick={moveToNextStep}
            disabled={piecesContext?.pieces.size === 0}
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
