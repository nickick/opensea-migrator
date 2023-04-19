import { BigNumber } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

export const useMoveTokens = (
  tokenId: string,
  operatorAddress: `0x${string}`,
  willBeWrapped: boolean
) => {
  const { config } = usePrepareContractWrite({
    address: operatorAddress,
    abi: [
      {
        name: 'wrap',
        inputs: [
          { internalType: 'uint256', name: 'oldTokenId', type: 'uint256' },
        ],
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        name: 'unwrap',
        inputs: [
          { internalType: 'uint256', name: 'oldTokenId', type: 'uint256' },
        ],
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [BigNumber.from(tokenId)],
    functionName: willBeWrapped ? 'wrap' : 'unwrap',
  });

  return useContractWrite(config);
};
