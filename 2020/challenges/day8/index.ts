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
		console.log("😟 outside our index scope.");
		return [prevIndex, acc];
	}

	if (prevIndex === code.length - 1) {
		console.log("😊 Terminated!");
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
			console.log("Hit an infinite loop 😟");
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

const switchJmpAndNop = ({ op, arg }: Instruction): Instruction => {
	if (op === "jmp") {
		return { op: "nop", arg };
	} else {
		return { op: "jmp", arg };
	}
};

const calculateDistance = ({ op, arg }: Instruction) => {
	return op === "jmp" ? arg : 1;
};

const canGetToTarget = (
	instr: Instruction,
	index: number,
	targetIndex: number
): { succeeds: boolean; needsSwitch: boolean } => {
	if (index + calculateDistance(instr) === targetIndex) {
		return { succeeds: true, needsSwitch: false };
	}

	// const switchedInstr = switchJmpAndNop(instr);

	// if (index + calculateDistance(switchedInstr) === targetIndex) {
	// 	return { succeeds: true, needsSwitch: true };
	// }

	return { succeeds: false, needsSwitch: false };
};

const findIndicesToTarget = (code: Instruction[], targetIndex: number): any[] => {
	const indices = [];

	for (let i = code.length - 1; i >= 0; i--) {
		const instr = code[i];

		if (i === targetIndex || instr.op === "acc") {
			continue;
		}

		const testResult = canGetToTarget(instr, i, targetIndex);

		if (testResult.succeeds) {
			indices.push({ i, needsSwitch: testResult.needsSwitch });
		}
	}
	return indices;
};

const findCorruptedInstruction = (code: Instruction[]) => {
	// find the last "jmp" before the end. if we can get past that, we are home free.
		// if this jmp is +, then we can look ever earlier
		// loop
	// so, loop till we found the latest jump that is troublesome.
	// once you have it, we just need to find any index that can get or beyond it
		// if we found one that gets us to it, then we know that this jump is the troublemaker, switch it.
		//up until this point, i'd expect that nothing can get u
	


	for (let i = code.length - 1; i >= 0; i--) {
		if (code[i].op === "acc") {
			continue;
		}

		if (code[i].op === "jmp") {
			console.log(findIndicesToTarget(code, code.length - i));
		}

		
	}	
	return []
};

const solvePart2 = async () => {
	const code = await parseInput("day8");
	const index = findCorruptedInstruction(code);
	return index;
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));
