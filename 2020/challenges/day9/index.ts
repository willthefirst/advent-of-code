import { findAncestor } from "typescript";
import { read } from "../../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string.split("\n").map((s) => Number(s));
};

// Checks if n is sum of two numbers in preamble
const isValid = (n: number, preamble: number[]): boolean => {
	for (let i = 0; i < preamble.length; i++) {
		const targetNum = n - preamble[i];
		if (targetNum !== n && preamble.includes(targetNum)) {
			return true;
		}
	}
	return false;
};

const findError = (data: number[], preambleLength: number): number | null => {
	for (let i = preambleLength; i < data.length; i++) {
		const n = data[i];
		const preamble: number[] = data.slice(i - preambleLength, i);

		if (!isValid(n, preamble)) {
			return n;
		}
	}
	return null;
};

const solvePart1 = async () => {
	const data: number[] = await parseInput("day9");
	return findError(data, 25);
};

const solvePart2 = async () => {
	const data = await parseInput("day9");
	return data;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));
