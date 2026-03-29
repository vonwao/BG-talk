# BG Talk — SERC Series

## About SERC
- **What:** Monthly speaking series — "TED Talk meets a cocktail party"
- **Run by:** JT Schultheis (speechmaster@sercseries.org)
- **Location:** The Hub at Space of Mind, 101 NW 1st Ave, Delray Beach, FL 33444
- **Format:** Multiple speakers on a theme, dressy, intellectual crowd, general public
- **Website:** https://www.sercseries.org/
- **Past presentations:** https://www.sercseries.org/presentations
- **Discord:** https://discord.gg/DDUAdbwwW9
- **Speech tips:** https://www.sercseries.org/blog-3-1
- **Past themes:** AI, history, engineering, naturalism, money/finance, "Conscious Conversations"
- **Talk length:** ~10 minutes
- **Audience:** General public, curious, educated, somewhat skeptical — NOT a spiritual community event

## Talk Title
**The Man Who Said You Can Receive Help**
*The message of Bruno Gröning*

## Summary (for event listing)
> In postwar Germany, Bruno Gröning drew thousands with a simple but radical message: that human beings can receive help and healing from a higher source. This talk explores his teaching, its roots in older spiritual traditions, and why it still resonates today.

## Speaker Bio
> 25 years of software engineering. Now I build minds that don't exist yet — but the harder work has always been understanding my own.

## Talk Style
**Philosophical + Personal hybrid** — NOT a history lecture, NOT a spiritual testimonial
- Start with the big human question (is healing only physical?)
- Introduce Bruno Gröning's idea of the Heilstrom
- Share personal experience in a grounded way
- Keeps skeptics listening AND believers inspired
- Avoids sounding dogmatic

## Audio Practice / TTS
- `slides-v0.3-audio.html` redirects to the audio-enabled deck
- `slides-v0.3.html?audio=1` runs the current deck in auto-narrated mode
- The audio deck now includes a `Practice` / `Slow` switch for `audio/slides/` vs `audio/slides/originals/`
- `audio-preview.html` gives direct in-browser players for generated sample slides
- `talk-content.js` is now the canonical source of truth for deck text, notes, outline, and audio
- `node generate-audio.mjs` generates slide MP3s into `audio/slides/`
- `node generate-audio.mjs --slide 1` generates a single test slide
- `editor.html` is a lightweight browser editor for the talk content
- `node editor-server.mjs` runs a tiny local server so `editor.html` can save directly to disk
- Environment variables:
  - `ELEVENLABS_API_KEY` required
  - `ELEVENLABS_VOICE_ID` optional, defaults to the prior Clawd voice
  - `ELEVENLABS_MODEL_ID` optional, defaults to `eleven_multilingual_v2`

## Editing Workflow
- Open `http://127.0.0.1:8787/slides-v0.3.html` after running `node editor-server.mjs`
- Use the `Edit Text` button in the deck, or open `http://127.0.0.1:8787/editor.html`
- Changes save straight to `talk-content.js`, which the deck and audio generator load directly
- No regeneration step is required

## Core Thesis
**Help is available — if we learn how to receive it.**

## Key Decisions Made
- Title should create curiosity for people who've never heard of Bruno Gröning
- Bruno Gröning is the *example*, not the *topic* — the topic is the bigger truth
- Draw parallels to Jesus/older traditions but don't equate them — use "resonance" framing
- Personal experience included but grounded, not preachy
- "The Man Who..." format chosen for human storytelling hook
