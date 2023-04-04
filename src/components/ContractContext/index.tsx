import { ethers } from 'ethers';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import abi from './abi.json';

const minimalViableABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xe985e9c5',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xa22cb465',
  },
];

const [migrateFromAddress, migrateToAddress] = [
  process.env.NEXT_PUBLIC_MIGRATE_FROM_CONTRACT_ADDRESS,
  process.env.NEXT_PUBLIC_MIGRATE_TO_CONTRACT_ADDRESS,
];
