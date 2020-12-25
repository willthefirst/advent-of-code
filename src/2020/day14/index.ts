import { read } from '../../../shared/utils';

const parseInput = async (filename: string) => {
  return read(filename).then((string: string) => {
    return string.split('\n');
  });
};

const applyBitmask = (bitmask: string, initial32BitValue: string): string => {
  let newValue = '';
  for (let i = 0; i < initial32BitValue.length; i++) {
    if (bitmask[i] === 'X') {
      newValue += initial32BitValue[i];
    } else {
      newValue += bitmask[i];
    }
  }
  return newValue;
};

const numTo32Bit = (num: number): string => {
  if (num < 0) {
    console.error("negative values! don't know how to deal.");
  }
  const dec = num.toString(2);
  return '0'.repeat(36 - dec.length) + dec;
};

const bitsToNum = (bits: string): number => {
  return parseInt(bits, 2);
};

const extractMaskFromLine = (line: string): string => {
  return line.slice(7);
};

const extractAddressFromLine = (line: string): number => {
  return Number(line.slice(line.indexOf('[') + 1, line.indexOf(']')));
};

const extractValueFromLine = (line: string): number => {
  return Number(line.slice(line.indexOf('=') + 2));
};

const initializeFromInstructions = (
  instructions: string[]
): { [key: number]: string } => {
  let mem: { [key: number]: string } = {};
  let currentMask = '';

  instructions.forEach((line) => {
    if (line.includes('mask')) {
      currentMask = extractMaskFromLine(line);
    } else {
      let address: number = extractAddressFromLine(line);
      let value: number = extractValueFromLine(line);
      mem[address] = applyBitmask(currentMask, numTo32Bit(value));
    }
  });

  return mem;
};

const solvePart1 = async () => {
  const instructions = await parseInput('day14');
  const memory = initializeFromInstructions(instructions);
  let result = 0;
  for (let key in memory) {
    result += bitsToNum(memory[key]);
  }
  return result;
};

const applyFloatingBitmask = (
  bitmask: string,
  initial32BitValue: string
): string => {
  let floatingBit = '';

  for (let i = 0; i < initial32BitValue.length; i++) {
    if (bitmask[i] === 'X') {
      floatingBit += 'X';
    } else if (bitmask[i] === '1') {
      floatingBit += 1;
    } else {
      floatingBit += initial32BitValue[i];
    }
  }
  return floatingBit;
};

const getAddressesFromFloatingBitmask = (mask: string): number[] => {
  let masks: any = [''];

  for (let i = 0; i < mask.length; i++) {
    const char = mask[i];
    if (char === 'X') {
      masks = masks.map((mask: string) => {
        return [[mask + '1'], [mask + '0']];
      });
    } else {
      masks = masks.map((mask: string) => {
        return mask + char;
      });
    }
    masks = masks.flat();
  }
  return masks.map((mask: string) => bitsToNum(mask));
};

const initializeWithMemAddressDecoder = (
  instructions: string[]
): { [key: number]: string } => {
  let mem: { [key: number]: string } = {};
  let currentMask = '';

  instructions.forEach((line) => {
    if (line.includes('mask')) {
      currentMask = extractMaskFromLine(line);
    } else {
      let value: number = extractValueFromLine(line);
      let bitAddress = numTo32Bit(extractAddressFromLine(line));
      let floatingBitmask: string = applyFloatingBitmask(
        currentMask,
        bitAddress
      );
      let addresses: number[] = getAddressesFromFloatingBitmask(
        floatingBitmask
      );

      addresses.forEach((address: number) => {
        mem[address] = numTo32Bit(value);
      });
    }
  });
  return mem;
};

const solvePart2 = async () => {
  const instructions = await parseInput('day14');
  const memory = initializeWithMemAddressDecoder(instructions);
  let result = 0;
  for (let key in memory) {
    result += bitsToNum(memory[key]);
  }
  return result;
};

solvePart1().then((result) => console.log('Part 1 solution:', result));
solvePart2().then((result) => console.log('Part 2 solution:', result));
