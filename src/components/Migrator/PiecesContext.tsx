import { createContext } from 'react';

type PiecesContextType = {
  pieces: Set<string>;
  setPieces: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const PiecesContext = createContext<PiecesContextType | null>({
  pieces: new Set(),
  setPieces: () => {},
});

export default PiecesContext;
