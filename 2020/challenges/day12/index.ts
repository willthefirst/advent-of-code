import { read } from "../../utils";

interface Vector {
	changeX: number;
	changeY: number;
	distance?: number;
}

interface Position {
	x: number;
	y: number;
	orientation: Vector;
}

interface OrientationChange {
	type: "orientation";
	val: number;
}

interface PositionChange {
	type: "position";
	val: Vector;
}

type Change = OrientationChange | PositionChange;

const parseInput = async (filename: string): Promise<Change[]> => {
	const string = await read(filename);
	return string.split("\n").map(convertToChange);
};

const convertToChange = (str: string): OrientationChange | PositionChange => {
	const type = str.substr(0, 1);
	const value = Number(str.substr(1));
	let change: OrientationChange | PositionChange;
	switch (type) {
		case "N":
			change = {
				type: "position",
				val: {
					changeX: 0,
					changeY: -1,
					distance: value
				} as Vector
			} as PositionChange;
			break;
		case "E":
			change = {
				type: "position",
				val: {
					changeX: 1,
					changeY: 0,
					distance: value
				} as Vector
			} as PositionChange;
			break;
		case "S":
			change = {
				type: "position",
				val: {
					changeX: 0,
					changeY: 1,
					distance: value
				} as Vector
			} as PositionChange;
			break;
		case "W":
			change = {
				type: "position",
				val: {
					changeX: -1,
					changeY: 0,
					distance: value
				} as Vector
			} as PositionChange;
			break;
		case "F":
			change = {
				type: "position",
				val: {
					changeX: 0,
					changeY: 0,
					distance: value
				} as Vector
			} as PositionChange;
			break;
		case "L":
			change = {
				type: "orientation",
				val: -(value / 90)
			} as OrientationChange;

			break;
		case "R":
			change = {
				type: "orientation",
				val: value / 90
			} as OrientationChange;
			break;
		default:
			console.error("That string didn't match one of the expected types");
			break;
	}

	return change!;
};

const updatePosition = (pos: Position, vector: Vector): Position => {
	if (vector.distance === undefined) {
		console.error("Vector's distance is undefined");
	}

	let dirX, dirY;

	// Special case: when the ship just has to move along its own vector, ie. "F"
	if (vector.changeX === 0 && vector.changeY === 0) {
		dirX = pos.orientation.changeX;
		dirY = pos.orientation.changeY;
	} else {
		dirX = vector.changeX;
		dirY = vector.changeY;
	}

	pos.x += dirX * vector.distance!;
	pos.y += dirY * vector.distance!;

	return pos;
};

/**
 * @param  {Position} pos
 * @param  {number} turn reflects how many 90 degree turns we have to make to the left (negative) or right (positive)
 * @returns Position
 */
const updateOrientation = (pos: Position, turns: number): Position => {
	const leftOrRight = turns / Math.abs(turns);
	
	// Vertical movement
	if (pos.orientation.changeX === 0) {
		// Moving north
		if (pos.orientation.changeY < 0) {
			pos.orientation.changeX = leftOrRight;
		// Moving south
		} else {
			pos.orientation.changeX = -leftOrRight;
		}
		pos.orientation.changeY = 0;
	// Horizontal movement
	} else if (pos.orientation.changeY === 0) {
		// Moving west
		if (pos.orientation.changeX < 0) {
			pos.orientation.changeY += -leftOrRight;
		// Moving east
		} else {
			pos.orientation.changeY += leftOrRight;
		}
		pos.orientation.changeX = 0;
	}

	// Reduce number of turns left
	turns = (Math.abs(turns) - 1) * leftOrRight;

	if (turns === 0) {
		return pos;
	}

	return updateOrientation(pos, turns);
};

const calculateManhattanDistance = (changes: Change[]): number => {
	let pos: Position = {
		x: 0,
		y: 0,
		orientation: {
			changeX: 1,
			changeY: 0
		}
	};

	changes.forEach((change, i) => {
		switch (change.type) {
			case "position":
				pos = updatePosition(pos, change.val);
				break;
			case "orientation":
				pos = updateOrientation(pos, change.val);
				break;
			default:
				console.error("Change doesn't seem valid.");
				break;
		}
	});
	return Math.abs(pos.x) + Math.abs(pos.y);
};

const solvePart1 = async () => {
	const changes = await parseInput("day12");
	return calculateManhattanDistance(changes);
};

const solvePart2 = async () => {
	const moves = await parseInput("day12_test");
	return moves;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));
