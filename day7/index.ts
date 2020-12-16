import { read } from "../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	let rules: any = {};
	string.split("\n").forEach((rule) => {
		const [parent, rest] = rule.split(" bags contain ");
		const child: any = {};
		const children = rest.split(", ").forEach((bag) => {
			if (bag === "no other bags.") {
				rules[parent] = {};
				return;
			}
			const entry = bag.slice(0, bag.indexOf("bag")).trim();
			const color = entry.slice(2);
			child[color] = Number(entry[0]);
			rules[parent] = child;
		});
	});
	return rules;
};

const solvePart1 = async () => {
	const puzzle = await parseInput("day7_test");
	return puzzle;
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day7");
	return puzzle;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));
