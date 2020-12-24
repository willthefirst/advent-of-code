import { read } from '../../../shared/utils';

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
  type: 'orientation';
  val: number;
}

interface PositionChange {
  type: 'position';
  val: Vector;
}

type Change = OrientationChange | PositionChange;

const parseInputWithRules = async (
  filename: string,
  rulesFn: Function
): Promise<Change[]> => {
  const string = await read(filename);
  return string.split('\n').map((s) => rulesFn(s));
};

const part1Rules = (str: string): OrientationChange | PositionChange => {
  const type = str.substr(0, 1);
  const value = Number(str.substr(1));
  let change: OrientationChange | PositionChange;
  switch (type) {
    case 'N':
      change = {
        type: 'position',
        val: {
          changeX: 0,
          changeY: -1,
          distance: value
        } as Vector
      } as PositionChange;
      break;
    case 'E':
      change = {
        type: 'position',
        val: {
          changeX: 1,
          changeY: 0,
          distance: value
        } as Vector
      } as PositionChange;
      break;
    case 'S':
      change = {
        type: 'position',
        val: {
          changeX: 0,
          changeY: 1,
          distance: value
        } as Vector
      } as PositionChange;
      break;
    case 'W':
      change = {
        type: 'position',
        val: {
          changeX: -1,
          changeY: 0,
          distance: value
        } as Vector
      } as PositionChange;
      break;
    case 'F':
      change = {
        type: 'position',
        val: {
          changeX: 0,
          changeY: 0,
          distance: value
        } as Vector
      } as PositionChange;
      break;
    case 'L':
      change = {
        type: 'orientation',
        val: -(value / 90)
      } as OrientationChange;

      break;
    case 'R':
      change = {
        type: 'orientation',
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
const updateOrientationByDegrees = (pos: Position, turns: number): Position => {
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

  return updateOrientationByDegrees(pos, turns);
};

const updateWaypointByDegrees = (pos: Position, turns: number): Position => {
  const leftOrRight = turns / Math.abs(turns);
  const { changeX, changeY } = pos.orientation;

  if (leftOrRight > 0) {
    // Right 90deg turn
    pos.orientation.changeX = changeY * -1;
    pos.orientation.changeY = changeX;
  } else {
    // Left 90deg turn
    pos.orientation.changeX = changeY;
    pos.orientation.changeY = changeX * -1;
  }

  // Reduce number of turns left
  turns = (Math.abs(turns) - 1) * leftOrRight;

  if (turns === 0) {
    return pos;
  }

  return updateWaypointByDegrees(pos, turns);
};

const updateOrientationByVector = (pos: Position, vector: Vector): Position => {
  pos.orientation.changeX += vector.changeX;
  pos.orientation.changeY += vector.changeY;
  return pos;
};

const applyChangesForPart1 = (pos: Position, changes: Change[]) => {
  changes.forEach((change, i) => {
    switch (change.type) {
      case 'position':
        pos = updatePosition(pos, change.val);
        break;
      case 'orientation':
        pos = updateOrientationByDegrees(pos, change.val);
        break;
      default:
        console.error("Change doesn't seem valid.");
        break;
    }
  });
  return pos;
};

const part2Rules = (str: string) => {
  const type = str.substr(0, 1);
  const value = Number(str.substr(1));
  let change: {};

  switch (type) {
    case 'N':
      change = {
        type: 'orientationByVector',
        val: {
          changeX: 0,
          changeY: -value
        }
      };
      break;
    case 'E':
      change = {
        type: 'orientationByVector',
        val: {
          changeX: value,
          changeY: 0
        }
      };
      break;
    case 'S':
      change = {
        type: 'orientationByVector',
        val: {
          changeX: 0,
          changeY: value
        }
      };
      break;
    case 'W':
      change = {
        type: 'orientationByVector',
        val: {
          changeX: -value,
          changeY: 0
        }
      };
      break;
    case 'L':
      change = {
        type: 'orientationByDegrees',
        val: -(value / 90)
      };
      break;
    case 'R':
      change = {
        type: 'orientationByDegrees',
        val: value / 90
      };
      break;
    case 'F':
      change = {
        type: 'position',
        val: value as number
      };
      break;
    default:
      console.error("That string didn't match one of the expected types");
      break;
  }

  return change!;
};

const moveForward = (pos: Position, val: number): Position => {
  pos.x += val * pos.orientation.changeX;
  pos.y += val * pos.orientation.changeY;
  return pos;
};

const applyChangesForPart2 = (
  pos: Position,
  changes: { val: any; type: string }[]
): Position => {
  changes.forEach((change, i) => {
    switch (change.type) {
      case 'position':
        pos = moveForward(pos, change.val);
        break;
      case 'orientationByVector':
        pos = updateOrientationByVector(pos, change.val);
        break;
      case 'orientationByDegrees':
        pos = updateWaypointByDegrees(pos, change.val);
        break;
      default:
        console.error("Change doesn't seem valid.");
        break;
    }
  });
  return pos;
};

const calculateManhattanDistance = (pos: Position): number => {
  return Math.abs(pos.x) + Math.abs(pos.y);
};

const solvePart1 = async () => {
  const changes = await parseInputWithRules('day12', part1Rules);
  let pos: Position = {
    x: 0,
    y: 0,
    orientation: {
      changeX: 1,
      changeY: 0
    }
  };
  pos = applyChangesForPart1(pos, changes);
  return calculateManhattanDistance(pos);
};

const solvePart2 = async () => {
  const changes = await parseInputWithRules('day12', part2Rules);
  let pos: Position = {
    x: 0,
    y: 0,
    orientation: {
      changeX: 10,
      changeY: -1
    }
  };

  pos = applyChangesForPart2(pos, changes);
  return calculateManhattanDistance(pos);
};

solvePart1().then((result) => console.log('Part 1 solution:', result));
solvePart2().then((result) => console.log('Part 2 solution:', result));
