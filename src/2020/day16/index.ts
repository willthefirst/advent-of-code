import { read } from '~/shared/utils';

type Range = [number, number];

const parseInput = async (
  filename: string
): Promise<{
  yourTicket: number[];
  nearbyTickets: number[][];
  rules: Range[];
}> => {
  const string = await read(__dirname, filename);
  let [rulesStr, yourTicketStr, nearbyTicketsStr] = string.split('\n\n');
  const rules = rules.match(/\d-\d/);
  console.log(rules, yourTicket, nearbyTickets);
  return {
    rules: [[1, 1]],
    yourTicket: [3],
    nearbyTickets: [[2]]
  };
};

// const getInvalidValues = (tickets, rules) => {};

const solvePart1 = async () => {
  const tickets = await parseInput('input');
  // getInvalidValues(tickets, rules);
  return tickets;
};

const solvePart2 = async () => {
  const tickets = await parseInput('input');
  return tickets;
};

solvePart1().then((result) => console.log('Part 1 solution:', result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));
