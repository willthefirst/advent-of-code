import { read } from '../../../shared/utils';

const parseInput = async (filename: string): Promise<string[][]> => {
  const string = await read(filename);
  return string.split('\n').map((str): string[] => {
    return str.split('');
  });
};

const visualizeInput = (seats: string[][]): string => {
  let seatString = '';
  seats.forEach((row) => {
    row.forEach((seat) => {
      seatString = seatString + seat;
    });
    seatString = seatString + '\n';
  });
  return seatString;
};

// Count methods

const countAdjacentOccupied = (
  x: number,
  y: number,
  seats: string[][]
): number => {
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
    if (
      adjX < 0 ||
      adjY < 0 ||
      adjX > seats[0].length ||
      adjY >= seats.length
    ) {
      continue;
    }

    // Increment count if seat is occupied
    if (seats[adjY][adjX] === '#') {
      count++;
    }
  }

  return count;
};

const getVisibleSeatAlongVector = (
  originX: number,
  originY: number,
  changeX: number,
  changeY: number,
  seats: string[][]
): number => {
  const nextX = originX + changeX;
  const nextY = originY + changeY;

  // Stop if beyond limits
  if (
    nextX < 0 ||
    nextX > seats[0].length - 1 ||
    nextY < 0 ||
    nextY > seats.length - 1
  ) {
    return 0;
  }

  const seat = seats[nextY][nextX];
  if (seat === '#') {
    return 1;
  } else if (seat === 'L') {
    return 0;
  } else {
    return getVisibleSeatAlongVector(nextX, nextY, changeX, changeY, seats);
  }
};

const countVisibleOccupied = (x: number, y: number, seats: string[][]) => {
  const vectors = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0]
  ];

  return vectors
    .map((v) => getVisibleSeatAlongVector(x, y, v[0], v[1], seats))
    .reduce((acc, curr) => acc + curr);
};

// General methods

const nextSeatState = (
  state: string,
  numOccupied: number,
  numOccupiedLimit: number
): string => {
  if (numOccupied >= numOccupiedLimit) {
    state = 'L';
  } else if (numOccupied === 0) {
    state = '#';
  }
  return state;
};

const countTotalOccupied = (seats: string[][]) => {
  return seats.flat().filter((s) => s === '#').length;
};

const updateSeatsByCountMethod = (
  seats: string[][],
  countMethod: Function,
  numOccupiedLimit: number
): string[][] => {
  return seats.map(
    (row: string[], y: number, originalSeats: string[][]): string[] => {
      return row.map((seat: string, x: number): string => {
        if (seat === '.') {
          return seat;
        }
        const numOccupied: number = countMethod(x, y, originalSeats);
        return nextSeatState(seat, numOccupied, numOccupiedLimit);
      });
    }
  );
};

const seatGuests = (
  oldSeats: string[][],
  oldNumOccupied: number,
  countMethod: Function,
  numOccupiedLimit: number
): string[][] => {
  const newSeats = updateSeatsByCountMethod(
    oldSeats,
    countMethod,
    numOccupiedLimit
  );
  const newNumOccupied = countTotalOccupied(newSeats);
  if (oldNumOccupied !== newNumOccupied) {
    return seatGuests(newSeats, newNumOccupied, countMethod, numOccupiedLimit);
  }

  return newSeats;
};

const solvePart1 = async () => {
  const seats = await parseInput('day11');
  const finalSeating = seatGuests(seats, 0, countAdjacentOccupied, 4);
  return countTotalOccupied(finalSeating);
};

const solvePart2 = async () => {
  const seats = await parseInput('day11');
  const finalSeating = seatGuests(seats, 0, countVisibleOccupied, 5);
  return countTotalOccupied(finalSeating);
};

solvePart1().then((result) => console.log('Part 1 solution:', result));
solvePart2().then((result) => console.log('Part 2 solution:', result));
