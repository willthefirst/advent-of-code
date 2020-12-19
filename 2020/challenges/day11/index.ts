import { read } from "../../utils";

const parseInput = async (filename: string): Promise<string[][]> => {
	const string = await read(filename);
	return string.split("\n").map((str): string[] => {
		return str.split("");
	});
};

const countAdjacentOccupied = (x: number, y: number, seats: string[][]): number => {
	let count = 0;

	const adjacentCoordinates = [
		[x, y - 1], // top center
		[x, y + 1], // bot center
		[x + 1, y - 1], // top right
		[x + 1, y], // right center
		[x + 1, y + 1], // bot right
		[x - 1, y - 1], // top left
		[x - 1, y + 1], // bot left
		[x - 1, y] // left center
	];

	for (let i = 0; i < adjacentCoordinates.length; i++) {
		const [adjX, adjY] = adjacentCoordinates[i];

		// Return if there's no seat at those coordinates
		if (adjX < 0 || adjY < 0 || adjX > seats[0].length || adjY >= seats.length) {
			continue;
		}

		// Increment count if seat is occupied
		if (seats[adjY][adjX] === "#") {
			count++;
		}
	}

	return count;
};

const updateSeats = (seats: string[][]): string[][] => {
	return seats.map((row: string[], y: number, originalSeats: string[][]): string[] => {
		return row.map((seat: string, x: number): string => {
			if (seat === ".") {
				return seat;
			}

			// Count adjacent occupied seats
			const numOfAdjacentOccupied: number = countAdjacentOccupied(x, y, originalSeats);

			if (seat === "L" && numOfAdjacentOccupied === 0) {
				return "#";
			}

			if (seat === "#" && numOfAdjacentOccupied >= 4) {
				return "L";
			}

			return seat;
		});
	});
};

const countOccupied = (seats: string[][]) => {
	return seats.flat().filter((s) => s === "#").length;
};

const seatGuests = (oldSeats: string[][], oldNumOccupied: number): string[][] => {
	const newSeats = updateSeats(oldSeats);
	const newNumOccupied = countOccupied(newSeats);

	if (oldNumOccupied !== newNumOccupied) {
		return seatGuests(newSeats, newNumOccupied);
	}

	return newSeats;
};

const solvePart1 = async () => {
	const seats = await parseInput("day11");
	const finalSeating = seatGuests(seats, 0);
	return countOccupied(finalSeating);
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day11_test");
	return puzzle;
};

solvePart1().then((result) => console.log("Part 1 solution:" + result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));©
