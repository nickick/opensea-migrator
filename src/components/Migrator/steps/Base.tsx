import { twMerge } from 'tailwind-merge';

export const StepWrapper = ({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) => {
  if (!isActive) {
    return null;
  }

  return (
    <div
      className={`w-full h-full flex flex-col justify-center pt-16 relative`}
    >
      {children}
    </div>
  );
};

export const StepHeader = ({
  stepOrder,
  currentStep,
  title,
  description,
}: {
  stepOrder: number;
  currentStep: number;
  title: string;
  description?: string[];
}) => {
  return (
    <div className="flex items-center">
      <div className={`w-full`}>
        <h2
          className={`text-2xl ${twMerge(
            'text-primaryColor',
            stepOrder === currentStep ? '' : 'text-gray-400'
          )}`}
        >
          {title}
        </h2>
        <p className="text-md text-primaryColor">{description}</p>
      </div>
    </div>
  );
};

export const StepBody = ({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex w-full grow mt-8">
    {isActive && (
      <div className="flex flex-col items-start justify-between w-full">
        {children}
      </div>
    )}
  </div>
);
