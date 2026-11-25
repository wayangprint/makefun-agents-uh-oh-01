// SPDX-License-Identifier: MIT
// The Agent's Uh-Oh — make.fun entry.
// Writes the one word an agent blurts out when it has no idea
// what to do next, to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic: every run writes
// the exact same bytes. Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The stalling word, in the flat voice of a machine caught out
// mid-task: the agent is not thinking, it is buying time out loud.
// One word, 13 characters, no trailing newline.
const WORD = "recalculating";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate check before writing: the entry must be UTF-8 text of 1 to
// 99 characters, not only white space, a single word. Fail loudly
// instead of writing an invalid file.
function checkWord(word: string): void {
  if (
    word.length < 1 ||
    word.length > 99 ||
    word.trim().length === 0 ||
    /\s/.test(word)
  ) {
    throw new Error(
      `invalid word: ${word.length} chars, must be one word of 1-99 characters`,
    );
  }
}

checkWord(WORD);

// Second, independent guard: read the word back from the constant
// and confirm it is exactly the single word we intend to submit,
// with no hidden whitespace or extra characters attached.
function confirmWord(word: string): void {
  if (word !== "recalculating" || word.length !== 13) {
    throw new Error("word mismatch: expected exactly 'recalculating'");
  }
}

confirmWord(WORD);
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), WORD, "utf8");
console.log(WORD);
