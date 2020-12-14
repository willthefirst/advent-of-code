import { read } from "../utils";

const parseInput = (filename: string) => {
	read(filename).then((string: string) => {
		console.log(string);
	});
};

const solvePart1 = async () => {
	const puzzle = await parseInput("");
};

console.log(solvePart1().then((result) => console.log("Part 1 solution:", result)));
