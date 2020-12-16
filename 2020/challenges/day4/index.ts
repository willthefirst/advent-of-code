import { read } from "../../utils";

/* Part 1 */

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

const hasRequiredFields = (entry: string): boolean => {
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

/**
 *
 * Validators
 *
 */

// Tests if year is between min and max, inclusive.
const isNumInRange = (string: string, min: number, max: number): boolean => {
	let year;
	try {
		year = Number(string);
	} catch (error) {
		console.log("Year is invalid format");
		return false;
	}
	return year >= min && year <= max;
};

// Exactly one of: amb blu brn gry grn hzl oth.
const isEyeColorValid = (string: string): boolean => {
	const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
	return validColors.includes(string);
};

// A # followed by exactly six characters 0-9 or a-f.
const isColorHexValid = (string: string): boolean => {
	return string.length === 7 && /#[a-f,0-9]{6}/.test(string);
};

// hgt (Height) - a number followed by either cm or in:
//     If in, the number must be at least 59 and at most 76.
//     If cm, the number must be at least 150 and at most 193.
const isHeightValid = (string: string): boolean => {
	const units = string.slice(string.length - 2);
	let valueStr = string.slice(0, string.length - 2);

	switch (units) {
		case "in":
			if (!isNumInRange(valueStr, 59, 76)) {
				return false;
			}
			break;
		case "cm":
			if (!isNumInRange(valueStr, 150, 193)) {
				return false;
			}
			break;
		default:
			return false;
			break;
	}

	return true;
};

// Is a nine-digit number, including leading zeroes.
const isPassportIdValid = (string: string): boolean => {
	if (string.length !== 9) {
		return false;
	}

	try {
		const id: number = Number(string);
		return true;
	} catch (error) {
		console.log("Passport ID is badly formatted.");
		return false;
	}
};

const hasValidFields = (ppString: string): boolean => {
	const ppArray = ppString.split(" ");

	for (let i = 0; i < ppArray.length; i++) {
		const field = ppArray[i];
		const [key, value] = field.split(":");
		switch (key) {
			case "byr":
				if (!isNumInRange(value, 1920, 2002)) {
					console.log("Invalid birthyear: ", value);
					return false;
				}
				break;
			case "ecl":
				if (!isEyeColorValid(value)) {
					console.log("Invalid eye color: ", value);
					return false;
				}
				break;
			case "eyr":
				if (!isNumInRange(value, 2020, 2030)) {
					console.log("Invalid exp year: ", value);
					return false;
				}
				break;
			case "hcl":
				if (!isColorHexValid(value)) {
					console.log("Invalid hair color: ", value);
					return false;
				}
				break;
			case "hgt":
				if (!isHeightValid(value)) {
					console.log("Invalid height: ", value);
					return false;
				}
				break;
			case "iyr":
				if (!isNumInRange(value, 2010, 2020)) {
					console.log("Invalid issue year: ", value);
					return false;
				}
				break;
			case "pid":
				if (!isPassportIdValid(value)) {
					console.log("Invalid passport id: ", value);
					return false;
				}
				break;
			default:
				break;
		}
	}

	return true;
};

/* Part 1 */

parseInput("day4").then((passports) =>
	console.log("Part 1 solution: ", passports.filter(hasRequiredFields).length)
);

/* Part 2 */

// Tests

// parseInput("day4_test_invalid").then((passports) =>
// 	console.log(passports.filter(hasRequiredFields).filter(hasValidFields).length === 0)
// );

// parseInput("day4_test_valid").then((passports) =>
// 	console.log(passports.filter(hasRequiredFields).filter(hasValidFields).length === 4)
// );

parseInput("day4").then((passports) =>
	console.log('Part 2 solution: ', passports.filter(hasRequiredFields).filter(hasValidFields).length)
);