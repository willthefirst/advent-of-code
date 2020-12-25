# Advent Of Code

My answers to [Advent Of Code](https://adventofcode.com/), done in Javascript/Typescript.

## Development

Install dependencies: `npm install`  
Run locally: `npm run start {path/to/file.ts}`  
To use Jest: `npm run test {path/to/directory}`

For VS Code debugger, run `nodemon`, then attach debugger that process.

## Todo

- Make paths absolute
- Move input to be in their respective directories

## Learnings

- `.sort()` doesn't sort number arrays the way you hope! It considers every array item as a string and compares UTF values 🤦🏼‍♂️. I ended up writing my own sort function for numbers, although you can also use [`TypedArray.sort()`](https://devdocs.io/javascript/global_objects/typedarray/sort).
- WOW. `console.log()` slows things down like crazy, I had no idea. Case in point, try it on day15 part 2 (uncomment that line of code).
