import Button from 'src/components/Button';

type Props = {
  moveBackStep: () => void;
  moveToNextStep: () => void;
};

const WrapPieces: React.FunctionComponent<Props> = ({
  moveBackStep,
  moveToNextStep,
}) => {
  return (
    <div className="flex flex-col h-full items-start justify-between">
      <div>
        <div className="text-2xl font-bold">Wrap Pieces</div>
        Wrap Pieces
      </div>
      <div className="flex space-x-4 justify-self-end self-end">
        <Button onClick={moveBackStep} type="secondary">
          Back
        </Button>
        <Button onClick={moveToNextStep}>Continue</Button>
      </div>
    </div>
  );
};

export default WrapPieces;
