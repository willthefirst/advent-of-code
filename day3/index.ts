import { read } from "../utils";

const parsePuzzleInput = (filename: string): Promise<string[]> => {
	return read(filename).then((string) => {
		return string.split("\n");
	});
};

type Point = { x: number; y: number };

const countTreesOnSlope = async (moveX: number, moveY: number): Promise<number> => {
	const puzzle = await parsePuzzleInput("day3");
	const numRows = puzzle.length - 1;
	const numCols = puzzle[0].length;

	let trees = 0;
	let currentPosition: Point = { x: 0, y: 0 };

	while (currentPosition.y <= numRows) {
		if (puzzle[currentPosition.y].charAt(currentPosition.x % numCols) === "#") {
			trees++;
		}
		currentPosition.x += moveX;
		currentPosition.y += moveY;
	}

	return trees;
};

/* Part 1 */

countTreesOnSlope(3, 1).then((result) => console.log("Part 1 solution: ", result));

/* Part 2 */

const multiplyTreesOnSlopes = async (): Promise<number> => {
	const slopes: Point[] = [
		{ x: 1, y: 1 },
		{ x: 3, y: 1 },
		{ x: 5, y: 1 },
		{ x: 7, y: 1 },
		{ x: 1, y: 2 }
	];

	const calculateSlopes = slopes.map(({ x, y }: Point) => {
		return countTreesOnSlope(x, y);
	});

	const treesHitOnSlopes = await Promise.all(calculateSlopes);
	return treesHitOnSlopes.reduce((prev, curr) => prev * curr);
};

multiplyTreesOnSlopes().then((result) => console.log("Part 2 solution: ", result));
