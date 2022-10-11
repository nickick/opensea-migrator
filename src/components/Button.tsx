type Props = {
  onClick: () => void;
  text?: string;
  children?: React.ReactNode;
  size?: 'small' | 'large';
  type?: 'primary' | 'secondary' | 'action';
  disabled?: boolean;
};

export default function Button({
  onClick,
  text,
  children,
  size = 'large',
  type = 'primary',
  disabled = false,
}: Props) {
  return (
    <button
      className={`${size === 'small' ? 'text-sm' : 'text-xl'} ${
        type === 'primary'
          ? disabled
            ? 'bg-gradient-to-r from-indigo-500/50 to-blue-500/50 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
          : type === 'action'
          ? disabled
            ? 'bg-ctaButtonColor text-white opacity-50'
            : 'bg-ctaButtonColor text-white'
          : 'border-black border'
      }
        px-6 py-4 shadow-lg whitespace-nowrap`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}
