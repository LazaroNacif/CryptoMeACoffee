import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder/TextDecoder for viem
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock browser APIs
global.fetch = jest.fn();

// Mock Web3 wallet
global.window = {
  ethereum: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn()
  }
};

// Mock document methods if not available
if (!global.document.createRange) {
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}
