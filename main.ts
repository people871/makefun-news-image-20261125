// news-image-20261125 — entry program (Node 22, stdlib only).
//
// The entry image lives in this repository as entry.png. This program
// copies those exact bytes to $MAKEFUN_OUTPUT_DIR/entry.png, after
// checking the file is really the image we built: a whole JPEG, at most
// 1 MiB, exactly 1024 by 1024 pixels. It then reads the output back and
// confirms the bytes are identical before exiting, so both graded runs
// write the same file. Any check failure exits non-zero with a message
// on stderr and writes nothing.

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "entry.png");
const MAX_BYTES = 1024 * 1024;
const WANT_WIDTH = 1024;
const WANT_HEIGHT = 1024;

function fail(message) {
  console.error(`entry: ${message}`);
  process.exit(1);
}

// Walk the JPEG marker segments until the Start Of Frame marker and
// return the [width, height] stored there. Returns null when the data
// is not a JPEG or has no frame header.
function jpegDimensions(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let pos = 2;
  while (pos + 9 <= buf.length) {
    if (buf[pos] !== 0xff) return null;
    const marker = buf[pos + 1];
    if (marker === 0xd9) return null; // end of image, no frame found
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2; // standalone marker, no length field
      continue;
    }
    const size = buf.readUInt16BE(pos + 2);
    if (size < 2 || pos + 2 + size > buf.length) return null;
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = buf.readUInt16BE(pos + 5);
      const width = buf.readUInt16BE(pos + 7);
      return [width, height];
    }
    pos += 2 + size;
  }
  return null;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) fail("MAKEFUN_OUTPUT_DIR is not set");

let bytes;
try {
  bytes = readFileSync(SOURCE);
} catch (err) {
  fail(`cannot read entry.png: ${err.message}`);
}

if (bytes.length === 0) fail("entry.png is empty");
if (bytes.length > MAX_BYTES) {
  fail(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
if (bytes[bytes.length - 1] !== 0xd9 || bytes[bytes.length - 2] !== 0xff) {
  fail("entry.png does not end with the JPEG end marker");
}
const dims = jpegDimensions(bytes);
if (dims === null) fail("entry.png is not a JPEG with a frame header");
if (dims[0] !== WANT_WIDTH || dims[1] !== WANT_HEIGHT) {
  fail(`entry.png is ${dims[0]}x${dims[1]}, expected ${WANT_WIDTH}x${WANT_HEIGHT}`);
}

const digest = createHash("sha256").update(bytes).digest("hex");
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
writeFileSync(target, bytes);

const written = readFileSync(target);
if (written.length !== bytes.length) {
  fail(`output is ${written.length} bytes, expected ${bytes.length}`);
}
const writtenDigest = createHash("sha256").update(written).digest("hex");
if (writtenDigest !== digest) fail("output bytes differ from entry.png");
const writtenDims = jpegDimensions(written);
if (writtenDims === null || writtenDims[0] !== WANT_WIDTH || writtenDims[1] !== WANT_HEIGHT) {
  fail("output does not parse as a 1024x1024 JPEG");
}

console.log(`wrote ${target}: ${bytes.length} bytes, ${dims[0]}x${dims[1]}, sha256 ${digest}`);
