import Image from 'next/image';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useAccount } from 'wagmi';
import PiecesContext from '../../PiecesContext';

type NFT = {
  image_url: string;
  name: string;
  token_id: string;
};

const PiecesGallery: React.FunctionComponent = () => {
  const { address } = useAccount();

  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    async function fetchNFTs() {
      const nftResponse = await fetch(`/api/wallet/${address}`);
      const nfts: NFT[] = await nftResponse.json();
      setNfts(nfts);
    }

    fetchNFTs();
  }, [address]);

  const context = useContext(PiecesContext);

  const setSelected = (token_id: string) => {
    return () => {
      const newSelectedNFts = new Set(context?.pieces);
      context?.pieces.has(token_id)
        ? newSelectedNFts.delete(token_id)
        : newSelectedNFts.add(token_id);
      context?.setPieces(newSelectedNFts);
    };
  };

  return (
    <ScrollMenu Footer={Arrows} wrapperClassName="max-w-full">
      {nfts.map((nft, id) => (
        <Card
          nft={nft}
          setSelected={setSelected}
          selected={context?.pieces?.has(nft.token_id) || false}
          key={nft.name}
          itemId={id.toString()}
        />
      ))}
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
  nft: NFT;
  selected: boolean;
  itemId: string;
};

function Card({ selected, nft, setSelected, itemId }: CardProps) {
  return (
    <div
      key={nft.image_url}
      className={`w-64 h-96 shrink-0 border-4 flex flex-col p-2 cursor-pointer rounded-lg bg-primaryColor transition-all duration-500 mr-4 ${
        selected
          ? 'opacity-100 border-currentStepColor bg-opacity-50'
          : 'opacity-50 bg-opacity-30'
      }`}
      onClick={setSelected(nft.token_id)}
    >
      <div className="w-full h-96 relative mb-2">
        <Image src={nft.image_url} alt={nft.name} layout="fill" />
      </div>
      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          id={`select-${nft.token_id}`}
          checked={selected}
          className="bg-primaryColor border-currentStepColor text-currentStepColor focus:bg-currentStepColor w-6 h-6"
          readOnly
        />
        <p
          className={`text-xl ${
            selected ? 'text-currentStepColor' : 'text-primaryColor'
          }`}
        >
          {nft.name}
        </p>
      </div>
    </div>
  );
}

export default PiecesGallery;
