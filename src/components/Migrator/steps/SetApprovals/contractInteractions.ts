import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi';

export const useReadIsApproved = (
  address: `0x${string}`,
  operatorContract: `0x${string}`,
  fromContract: `0x${string}`
) => {
  const { data, isError, isLoading } = useContractRead({
    address: fromContract,
    abi: [
      {
        inputs: [
          { internalType: 'address', name: '_owner', type: 'address' },
          { internalType: 'address', name: '_operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: 'isOperator', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'isApprovedForAll',
    args: [address, operatorContract],
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const useWriteContractApproval = (
  operatorContract: `0x${string}`,
  fromContract: `0x${string}`,
  willBeApproved: boolean
) => {
  const { config } = usePrepareContractWrite({
    address: fromContract,
    abi: [
      {
        name: 'setApprovalForAll',
        inputs: [
          { internalType: 'address', name: 'operator', type: 'address' },
          { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [operatorContract, willBeApproved],
    functionName: 'setApprovalForAll',
  });

  return useContractWrite(config);
};
