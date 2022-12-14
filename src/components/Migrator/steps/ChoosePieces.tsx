import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import { StepText } from 'src/utils/types';
import { useAccount } from 'wagmi';
import { StepBody, StepHeader, StepWrapper } from '.';

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

  const setSelected = (token_id: string) => {
    return () => {
      const newSelectedNFts = new Set(selectedNfts);
      selectedNfts.has(token_id)
        ? newSelectedNFts.delete(token_id)
        : newSelectedNFts.add(token_id);
      setSelectedNfts(newSelectedNFts);
    };
  };

  return (
    <StepWrapper isActive={isActive}>
      <StepHeader stepOrder={stepOrder} currentStep={currentStep}>
        {text.title}
      </StepHeader>
      <StepBody isActive={isActive}>
        <>
          <div className="flex flex-wrap overflow-y-scroll max-h-64 gap-4">
            {nfts.map((nft) => {
              return (
                <div
                  key={nft.image_url}
                  className={`w-48 border flex flex-col p-2 cursor-pointer ${
                    selectedNfts.has(nft.token_id)
                      ? 'border-green-500'
                      : 'border-black'
                  }`}
                  onClick={setSelected(nft.token_id)}
                >
                  <div className="w-full h-40 relative mb-2">
                    <Image src={nft.image_url} alt={nft.name} layout="fill" />
                  </div>
                  <input
                    type="checkbox"
                    id={`select-${nft.token_id}`}
                    checked={selectedNfts.has(nft.token_id)}
                    className="self-end"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex space-x-4 justify-self-end self-end">
            <Button onClick={moveToNextStep} disabled={selectedNfts.size === 0}>
              Continue
            </Button>
          </div>
        </>
      </StepBody>
    </StepWrapper>
  );
};

export default ChoosePieces;

/**
 * animation_original_url: null
animation_url: null
asset_contract: {address: '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c', asset_contract_type: 'semi-fungible', created_date: '2022-09-09T19:54:17.825024', name: 'OpenSea Collections', nft_version: null, ???}
background_color: null
collection: {banner_image_url: 'https://i.seadn.io/gcs/files/ef77f8bdcb2da1da88d23dd93b6c9f4c.jpg?w=500&auto=format', chat_url: null, created_date: '2022-10-13T04:35:23.272198+00:00', default_to_fiat: false, description: 'Some deer lights for you, a little early for Christmas', ???}
creator: {user: {???}, profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/9.png', address: '0x2b4aee945c7a7ed11fb9f86501d121e3ae816342', config: ''}
decimals: null
description: null
external_link: null
id: 137240999
image_original_url: null
image_preview_url: "https://i.seadn.io/gae/TMNmEwnn39obZ5RON0JKB9JoOFTfcjRWkhbWDYgUHYdRLFzt6jF0Va39RICzAahDxseq_HAnij7sTO0qfa0n6-r6okJZCBw_wgXHC6g?w=500&auto=format"
image_thumbnail_url: "https://i.seadn.io/gae/TMNmEwnn39obZ5RON0JKB9JoOFTfcjRWkhbWDYgUHYdRLFzt6jF0Va39RICzAahDxseq_HAnij7sTO0qfa0n6-r6okJZCBw_wgXHC6g?w=500&auto=format"
image_url: "https://i.seadn.io/gae/TMNmEwnn39obZ5RON0JKB9JoOFTfcjRWkhbWDYgUHYdRLFzt6jF0Va39RICzAahDxseq_HAnij7sTO0qfa0n6-r6okJZCBw_wgXHC6g?w=500&auto=format"
is_nsfw: false
is_presale: true
last_sale: null
listing_date: null
name: "Christmas Deer"
num_sales: 0
owner: {user: null, profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png', address: '0x0000000000000000000000000000000000000000', config: ''}
permalink: "https://testnets.opensea.io/assets/goerli/0xf4910c763ed4e47a585e2d34baa9a4b611ae448c/19581845787315820542309529478330392586387484444772608262239428008385487831041"
rarity_data: null
seaport_sell_orders: null
supports_wyvern: true
token_id: "19581845787315820542309529478330392586387484444772608262239428008385487831041"
token_metadata: null
top_bid: null
traits: []
transfer_fee: null
transfer_fee_payment_token: nul
 */
