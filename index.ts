import { ensureCodeIsAFunction } from "./ensure";

const codeA = "const a = (b: number, c: number) => b + c"
const codeB = "function a(b: number, c: number) { return b + c }"

ensureCodeIsAFunction(codeA)
ensureCodeIsAFunction(codeB)