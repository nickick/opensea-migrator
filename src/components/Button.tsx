type Props = {
  onClick: () => void;
  text?: string;
  children?: React.ReactNode;
  size?: 'small' | 'large';
};

export default function Button({
  onClick,
  text,
  children,
  size = 'large',
}: Props) {
  console.log(size);
  return (
    <button
      className={`${
        size === 'small' ? 'text-sm' : 'text-xl'
      } px-6 py-4 shadow-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 whitespace-nowrap`}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}
