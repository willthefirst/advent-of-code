import { read } from "../utils";

const parseInput = async (filename: string) => {
	return read(filename).then((string: string) => {
		return string.split("\n");
	});
};

const applyBitmask = (bitmask: string, initial32BitValue: string): string => {
	let newValue = "";
	for (let i = 0; i < initial32BitValue.length; i++) {
		if (bitmask[i] === "X") {
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
	return "0".repeat(36 - dec.length) + dec;
};

const bitsToNum = (bits: string): number => {
	return parseInt(bits, 2);
};

const initializeFromInstructions = (instructions: string[]): { [key: number]: string } => {
	let mem: { [key: number]: string } = {};
	let currentMask = "";

	instructions.forEach((line) => {
		if (line.includes("mask")) {
			currentMask = line.slice(7);
		} else {
			let address: number = Number(line.slice(line.indexOf("[") + 1, line.indexOf("]")));
			let value: number = Number(line.slice(line.indexOf("=") + 2));
			mem[address] = applyBitmask(currentMask, numTo32Bit(value));
		}
	});

	return mem;
};

const solvePart1 = async () => {
	const instructions = await parseInput("day14");
	const memory = initializeFromInstructions(instructions);
	let result = 0;
	for (let key in memory) {
		result += bitsToNum(memory[key]);
    }
    return result;
};

console.log(solvePart1().then((result) => console.log("Part 1 solution:", result)));
