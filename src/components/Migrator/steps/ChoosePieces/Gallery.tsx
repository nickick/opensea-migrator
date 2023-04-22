import { Nft } from 'alchemy-sdk';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Spinner from 'src/components/Spinner';
import { useModeSwitch } from 'src/utils/useModeSwitch';
import { useSelectPieces } from 'src/utils/usePieces';

type Props = {
  nfts: Nft[];
  loading: boolean;
  setSelected: (token_id: string) => () => void;
  selectedPieces: Set<string>;
};

const PiecesGallery = ({
  nfts,
  loading,
  setSelected,
  selectedPieces,
}: Props) => {
  const { mode } = useModeSwitch();
  const { clearSelected } = useSelectPieces();

  useEffect(() => {
    clearSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (loading) {
    return (
      <div className="text-primaryColor flex items-center">
        Finding your Seerlight {mode === 'reverse' ? 'wrapped' : ''} pieces...{' '}
        <Spinner />
      </div>
    );
  }

  if (!loading && nfts.length === 0) {
    return (
      <div className="text-primaryColor flex items-center">
        No Seerlight {mode === 'reverse' ? 'wrapped' : 'unwrapped'} pieces
        found.
      </div>
    );
  }

  return (
    <ScrollMenu Footer={Arrows} wrapperClassName="max-w-full">
      {nfts && nfts.map && (
        <div className="flex">
          {nfts.map((nft, id) => (
            <Card
              nft={nft}
              setSelected={setSelected}
              selected={selectedPieces.has(nft.tokenId) || false}
              key={`${nft.rawMetadata?.name}-${id}`}
              itemId={id.toString()}
            />
          ))}
        </div>
      )}
    </ScrollMenu>
  );
};

const Arrows = () => (
  <div className="flex space-x-2 mt-6">
    <LeftArrow />
    <RightArrow />
  </div>
);

function LeftArrow() {
  const { isFirstItemVisible, scrollToItem, getPrevElement } =
    useContext(VisibilityContext);
  const clickHandler = () => scrollToItem(getPrevElement(), 'smooth', 'start');
  return (
    <button
      disabled={isFirstItemVisible}
      onClick={() => clickHandler()}
      className="py-3 px-6 bg-primaryColor bg-opacity-20 rounded-full border-gray-100 flex justify-center items-center"
    >
      <Image
        src="/arrow-right.svg"
        alt="Right gallery selector"
        height="24"
        width="24"
        className="rotate-180"
      />
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollToItem, getNextElement } =
    useContext(VisibilityContext);
  const clickHandler = () => scrollToItem(getNextElement(), 'smooth', 'start');
  return (
    <button
      disabled={isLastItemVisible}
      onClick={() => clickHandler()}
      className="py-3 px-6 bg-primaryColor bg-opacity-20 rounded-full border-gray-100 flex justify-center items-center"
    >
      <Image
        src="/arrow-right.svg"
        alt="Right gallery selector"
        height="24"
        width="24"
      />
    </button>
  );
}

type CardProps = {
  setSelected: (token_id: string) => () => void;
  nft: Nft;
  selected: boolean;
  itemId: string;
};

function Card({ selected, nft, setSelected }: CardProps) {
  return (
    <div
      key={nft.tokenId}
      className={`w-64 h-96 shrink-0 border-4 flex flex-col p-2 cursor-pointer rounded-lg bg-primaryColor transition-all duration-500 mr-4 ${
        selected
          ? 'opacity-100 border-currentStepColor bg-opacity-50'
          : 'opacity-50 bg-opacity-30'
      }`}
      onClick={setSelected(nft.tokenId)}
    >
      <div className="w-full h-96 relative mb-2">
        <Image
          src={nft.media[0]?.raw}
          alt={nft.rawMetadata?.name}
          layout="fill"
        />
      </div>
      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          id={`select-${nft.tokenId}`}
          checked={selected}
          className="bg-primaryColor border-currentStepColor text-currentStepColor focus:bg-currentStepColor w-6 h-6"
          readOnly
        />
        <p
          className={`text-xl ${
            selected ? 'text-currentStepColor' : 'text-primaryColor'
          }`}
        >
          {nft.rawMetadata?.name}
        </p>
      </div>
    </div>
  );
}

export default PiecesGallery;
