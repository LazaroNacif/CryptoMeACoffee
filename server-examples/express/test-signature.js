import { verifyTypedData, recoverTypedDataAddress } from 'viem';

// Test data from your latest attempt
const domain = {
  name: 'USDC',
  version: '2',
  chainId: 84532,
  verifyingContract: '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
};

const types = {
  TransferWithAuthorization: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' }
  ]
};

const message = {
  from: '0xb147D459D494471c248A6C652dcF3F1cabFfe31D',
  to: '0xb147D459D494471c248A6C652dcF3F1cabFfe31D',
  value: '1000000',
  validAfter: '0',
  validBefore: '1763332242',
  nonce: '0x19a8e93ce0c93169605aaba98000000000000000000000000000000000000000'
};

const signature = '0xc5a1e7b15413bb6831166d4f765d38a179fc158aaf03c750fe3687232fc86f845b0faa4c74e03b09aedcd3d6e0914799d709c9444e47122bc6f1d6d5147b9acb1b';

async function testSignature() {
  try {
    console.log('Testing signature recovery...\n');

    const recoveredAddress = await recoverTypedDataAddress({
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message,
      signature
    });

    console.log('Expected address:', message.from);
    console.log('Recovered address:', recoveredAddress);
    console.log('Match:', recoveredAddress.toLowerCase() === message.from.toLowerCase());

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSignature();
