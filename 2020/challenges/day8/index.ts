import { read } from "../../utils";

interface Instruction {
	op: string;
	arg: number;
}
const parseInput = async (filename: string): Promise<Instruction[]> => {
	const string = await read(filename);
	const code: Instruction[] = string.split("\n").map(
		(line: string): Instruction => {
			return {
				op: line.slice(0, 3),
				arg: Number(line.slice(4))
			};
		}
	);
	return code;
};

let execute = (
	code: Instruction[],
	acc: number,
	prevIndex: number,
	currIndex: number
): [prevIndex: number, acc: number] => {
	if (!code[currIndex]) {
		return [prevIndex, acc];
	}

	const op = code[currIndex].op;
	const arg = code[currIndex].arg;

	switch (op) {
		case "acc":
			return execute(code, acc + arg, currIndex, currIndex + 1);
		case "jmp":
			return execute(code, acc, currIndex, currIndex + arg);
		default:
			return execute(code, acc, currIndex, currIndex + 1);
	}
};

const catchLoop = (fn: Function) => {
	const indices: number[] = [];
	return (code: Instruction[], acc: number, prevIndex: number, currIndex: number) => {
		if (indices.includes(currIndex)) {
			return [prevIndex, acc];
		}
		indices.push(currIndex);
		const result = fn(code, acc, prevIndex, currIndex);
		return result;
	};
};

execute = catchLoop(execute);

const solvePart1 = async () => {
	const code = await parseInput("day8");
	const [prevIndex, acc] = execute(code, 0, 0, 0);
	return acc;
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day8_test");
	return puzzle;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));
