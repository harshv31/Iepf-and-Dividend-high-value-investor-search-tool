#!/usr/bin/env node
/*
 * Build IEPF_Analyzer.html — a single, self-contained, fully-offline file.
 *
 * It inlines the pdf.js library + worker (as base64) into src/template.html,
 * replacing the __PDFJS_MAIN_B64__ / __PDFJS_WORKER_B64__ placeholders.
 *
 * Usage:  node build.mjs
 * No dependencies, no network access required.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const b64 = (p) => readFileSync(join(root, p)).toString('base64');

const html = readFileSync(join(root, 'src/template.html'), 'utf8')
  .replace('__PDFJS_MAIN_B64__', b64('src/vendor/pdf.min.js'))
  .replace('__PDFJS_WORKER_B64__', b64('src/vendor/pdf.worker.min.js'));

if (html.includes('__PDFJS_')) {
  console.error('✗ Build failed: a placeholder was left unreplaced.');
  process.exit(1);
}

const out = join(root, 'IEPF_Analyzer.html');
writeFileSync(out, html, 'utf8');
console.log(`✓ Built IEPF_Analyzer.html (${(html.length / 1048576).toFixed(2)} MB)`);
