import { useEffect, useState } from 'react';

export const useConfirming = (data: any) => {
  const [confirmed, setConfirmed] = useState(false);
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  useEffect(() => {
    if (data) {
      setWaitingForConfirmation(true);
      data?.wait(3).then(() => {
        setConfirmed(true);
        setWaitingForConfirmation(false);
      });
    }
  }, [data]);

  return {
    confirmed,
    waitingForConfirmation,
  };
};
