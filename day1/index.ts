import { read } from "../utils";

const strToNums = (str: string): number[] => {
    return str.split('\n').map(line => parseInt(line, 10));
}

const parsePuzzleInput = async (filename: string): Promise<number[]> => {
    return read(filename).then(strToNums);
}

const solve = async () => {
    const nums = await parsePuzzleInput("day1");
    console.log(nums);
}

solve();