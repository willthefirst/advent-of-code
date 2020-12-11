# Advent Of Code 2020

My answers to [Advent Of Code 2020](https://adventofcode.com/2020).

## Development

1) Install dependencies: `npm install`  
2) Run locally: `nodemon {path/to/file.ts}`

If debugging, just `node {path/to/file.ts}` and start the VS Code debugger.

## Todo

## Learnings

- `.sort()` doesn't sort number arrays the way you hope! It considers every array item as a string and compares UTF values. I ended up writing my own sort function for numbers, although you can also use [`TypedArray.sort()`](https://devdocs.io/javascript/global_objects/typedarray/sort).
