import Button from 'src/components/Button';

type Props = {
  moveBackStep: () => void;
  moveToNextStep: () => void;
};

export default function SetApprovals({ moveBackStep, moveToNextStep }: Props) {
  return (
    <div className="flex flex-col h-full items-start justify-between">
      <div>
        <div className="text-2xl font-bold">2. Set approvals</div>
        Set Approvals
      </div>
      <div className="flex space-x-4 justify-self-end self-end">
        <Button onClick={moveBackStep} type="secondary">
          Back
        </Button>
        <Button onClick={moveToNextStep}>Continue</Button>
      </div>
    </div>
  );
}
