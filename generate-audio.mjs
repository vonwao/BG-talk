#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const TALK_CONTENT = require('./talk-content.js');

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID || 'bIHbv24MWmeRgasZH58o';
const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const outDir = path.join(process.cwd(), 'audio', 'slides');
const force = process.argv.includes('--force');
const slideArgIndex = process.argv.indexOf('--slide');
const requestedSlide = slideArgIndex >= 0 ? Number(process.argv[slideArgIndex + 1]) : null;

if (!apiKey) {
  console.error('Missing ELEVENLABS_API_KEY.');
  process.exit(1);
}

if (typeof fetch !== 'function') {
  console.error('This script requires a Node runtime with global fetch support.');
  process.exit(1);
}

if (!TALK_CONTENT || !Array.isArray(TALK_CONTENT.slides)) {
  console.error('talk-content.js did not export a valid slide list.');
  process.exit(1);
}

if (requestedSlide !== null && (!Number.isInteger(requestedSlide) || requestedSlide < 1 || requestedSlide > TALK_CONTENT.slides.length)) {
  console.error(`--slide must be an integer between 1 and ${TALK_CONTENT.slides.length}.`);
  process.exit(1);
}

await fs.mkdir(outDir, { recursive: true });

for (const [idx, entry] of TALK_CONTENT.slides.entries()) {
  if (requestedSlide !== null && idx + 1 !== requestedSlide) {
    continue;
  }

  if (!entry || !entry.audio || !entry.audio.trim()) {
    continue;
  }

  const slideNumber = String(idx + 1).padStart(2, '0');
  const filename = `slide-${slideNumber}-${entry.slug}.mp3`;
  const outputPath = path.join(outDir, filename);

  if (!force) {
    try {
      await fs.access(outputPath);
      console.log(`Skipping ${filename} (already exists)`);
      continue;
    } catch {
      // File does not exist; generate it.
    }
  }

  console.log(`Generating ${filename}...`);

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: entry.audio,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs request failed for ${filename}: ${response.status} ${errorText}`);
  }

  const audioBytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, audioBytes);
  console.log(`  OK (${audioBytes.length} bytes)`);
}

console.log(`Done. Audio files are in ${outDir}`);
