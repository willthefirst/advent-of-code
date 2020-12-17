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
	currIndex: number,
	cb: Function
): [prevIndex: number, acc: number] => {
	if (currIndex < 0 || currIndex >= code.length) {
		// Outside scope of rules.
		return [prevIndex, acc];
	}

	if (prevIndex === code.length - 1) {
		// Successful termination.
		return [prevIndex, acc];
	}

	const op = code[currIndex].op;
	const arg = code[currIndex].arg;

	switch (op) {
		case "acc":
			return cb(code, acc + arg, currIndex, currIndex + 1, cb);
		case "jmp":
			return cb(code, acc, currIndex, currIndex + arg, cb);
		default:
			return cb(code, acc, currIndex, currIndex + 1, cb);
	}
};

const catchLoop = (fn: Function) => {
	const indices: number[] = [];
	return (code: Instruction[], acc: number, prevIndex: number, currIndex: number, cb: Function) => {
		if (indices.includes(currIndex)) {
			// Hit an infinite loop
			return [prevIndex, acc];
		}
		indices.push(currIndex);
		const result = fn(code, acc, prevIndex, currIndex, cb);
		return result;
	};
};

const solvePart1 = async () => {
	let execute_ = catchLoop(execute);
	const code = await parseInput("day8");
	const [prevIndex, acc] = execute_(code, 0, 0, 0, execute_);
	return acc;
};

const switchJmpAndNop = ({ op, arg }: Instruction): Instruction => {
	if (op === "jmp") {
		return { op: "nop", arg };
	} else {
		return { op: "jmp", arg };
	}
};

const attemptSingleExecution = (code: Instruction[]): [prevIndex: number, acc: number] => {
	let execute_ = catchLoop(execute);
	return execute_(code, 0, 0, 0, execute_);
};

const getAccAfterFix = (code: Instruction[]): number | undefined => {
	for (let i = 0; i < code.length; i++) {
		const instr = code[i];
		if (instr.op === "acc") {
			continue;
		}
		let fixAttempt = Array.from(code);
		fixAttempt[i] = switchJmpAndNop(instr);
		const [prevIndex, acc] = attemptSingleExecution(fixAttempt);
		if (prevIndex === code.length - 1) {
			return acc;
		}
	}
	return undefined;
};

const solvePart2 = async () => {
	const code = await parseInput("day8");
	return getAccAfterFix(code);
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));
