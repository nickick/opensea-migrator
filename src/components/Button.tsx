type Props = {
  onClick: () => void;
  text?: string;
  children?: React.ReactNode;
  size?: 'small' | 'large';
  type?: 'primary' | 'secondary';
};

export default function Button({
  onClick,
  text,
  children,
  size = 'large',
  type = 'primary',
}: Props) {
  return (
    <button
      className={`${size === 'small' ? 'text-sm' : 'text-xl'} ${
        type === 'primary'
          ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
          : 'border-black border'
      } px-6 py-4 shadow-lg whitespace-nowrap`}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}
