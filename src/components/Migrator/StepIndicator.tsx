import React from 'react';
import { StepText } from 'src/utils/types';

const StepIndicator = ({
  index,
  stepText,
}: {
  index: number;
  stepText: StepText[];
}) => {
  return (
    <div className="flex flex-col space-y-6 grow pt-16">
      {stepText.map((step, stepNumber) => (
        <div
          key={step.title}
          className={`flex text-primaryColor ml-16 items-center transition-opacity duration-500 ${
            index === stepNumber ? 'opacity-100' : 'opacity-30'
          }`}
        >
          <div className="rounded-full border border-primaryColor h-10 w-10 mr-2 flex justify-center items-center text-lg">
            {stepNumber + 1}
          </div>
          <div className="whitespace-nowrap">{step.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
