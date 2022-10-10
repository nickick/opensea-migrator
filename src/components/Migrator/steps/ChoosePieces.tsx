import Button from 'src/components/Button';

type Props = {
  moveToNextStep: () => void;
};

const ChoosePieces: React.FunctionComponent<Props> = ({ moveToNextStep }) => {
  return (
    <div className="flex flex-col h-full items-start justify-between">
      <div>
        <div className="text-2xl font-bold">Choose piece(s)</div>
        Some pieces
      </div>
      <div className="flex space-x-4 justify-self-end self-end">
        <Button onClick={moveToNextStep}>Continue</Button>
      </div>
    </div>
  );
};

export default ChoosePieces;
