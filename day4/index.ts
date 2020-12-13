import { read } from "../utils";

const parseInput = async (filename: string): Promise<string[]> => {
	const string = await read(filename);
	return (
		string
			// Strip unecessary new lines within an entry
			.replace(/.\n./g, (str) => {
				return str[0] + " " + str[2];
			})
			// Split by blank lines
			.split("\n\n")
	);
};

const isEntryValid = (entry: string) => {
	return (
		entry.includes("ecl") &&
		entry.includes("pid") &&
		entry.includes("eyr") &&
		entry.includes("hcl") &&
		entry.includes("byr") &&
		entry.includes("iyr") &&
		entry.includes("hgt")
	);
};

const getValidEntries = (entries: string[]): string[] => {
	return entries.filter(isEntryValid);
};

parseInput("day4").then((puzzle) => console.log(getValidEntries(puzzle).length));
