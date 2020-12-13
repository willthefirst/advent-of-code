import { read } from '../utils'

const parseInput = (filename: string) => {
    read(filename).then((string: string) => {
        console.log(string);
    })
}

parseInput('');