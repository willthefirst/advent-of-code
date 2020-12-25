import { read } from '~/shared/utils';

const parseInput = async (filename: string) => {
  const string = await read(__dirname, filename);
  let rules: any = {};
  string.split('\n').forEach((rule) => {
    const [parent, rest] = rule.split(' bags contain ');
    const child: any = {};
    const children = rest.split(', ').forEach((bag) => {
      if (bag === 'no other bags.') {
        rules[parent] = {};
        return;
      }
      const entry = bag.slice(0, bag.indexOf('bag')).trim();
      const color = entry.slice(2);
      child[color] = Number(entry[0]);
      rules[parent] = child;
    });
  });
  return rules;
};

const getParents = (bag: string, rules: any): string[] => {
  const parents: string[] = [];
  for (const key in rules) {
    if (bag in rules[key]) {
      parents.push(key);
    }
  }
  return parents;
};

const getAllPossibleParents = (bag: string, rules: any): string[] => {
  const parents = getParents(bag, rules);
  return [
    ...new Set(
      parents.concat(
        parents.map((parent) => getAllPossibleParents(parent, rules)).flat()
      )
    )
  ];
};

const solvePart1 = async () => {
  const bagRules = await parseInput('input');
  return getAllPossibleParents('shiny gold', bagRules).length;
};

const getRequiredChildren = (bag: string, rules: any): string[] => {
  const result: string[] = [];
  const children = rules[bag];

  for (let key in children) {
    for (let i = 0; i < children[key]; i++) {
      result.push(key);
      result.push(...getRequiredChildren(key, rules));
    }
  }
  return result;
};

const solvePart2 = async () => {
  const bagRules = await parseInput('input');
  return getRequiredChildren('shiny gold', bagRules).length;
};

solvePart1().then((result) => console.log('Part 1 solution:', result));
solvePart2().then((result) => console.log('Part 2 solution:', result));
