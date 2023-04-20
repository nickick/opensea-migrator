import { BigNumber } from 'ethers';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

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

export const useIsContractAdmin = (
  operatorAddress: `0x${string}`,
  address: `0x${string}`
) => {
  const { data } = useContractRead({
    address: operatorAddress,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
        ],
        name: 'isAdmin',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'isAdmin',
    args: [address],
  });

  return data;
};

export const useResetTokenWrappability = (
  tokenId: string,
  operatorAddress: `0x${string}`
) => {
  const { config } = usePrepareContractWrite({
    address: operatorAddress,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'oldTokenId',
            type: 'uint256',
          },
        ],
        name: 'resetTokenWrappability',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [tokenId ? BigNumber.from(tokenId) : BigNumber.from(0)],
    functionName: 'resetTokenWrappability',
  });

  return useContractWrite(config);
};

export const useResetTokens = (
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
