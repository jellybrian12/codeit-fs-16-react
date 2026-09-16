import { makeCounter } from './practice1.js';

const next = makeCounter();

console.log(next());   // 1
console.log(next());   // 2
console.log(next());   // 3

const a = makeCounter();
const b = makeCounter();

a(); a(); a();

console.log(b());        // 1
console.log(a());        // 4
console.log(a.count);    // undefined