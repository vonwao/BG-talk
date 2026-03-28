# Presentation Status

This file is the current handoff / resume point for the `BG-talk` presentation work.

If this thread disappears, start here.

## Project Intent

This is a roughly 10-minute SERC talk for a general, educated, somewhat skeptical audience.

The talk is not meant to be:

- a history lecture
- a spiritual testimonial event
- a dogmatic sermon

The target mode is:

- philosophical + personal
- grounded enough for skeptics
- alive enough to carry real spiritual intensity

## Core Thesis

Help is available, if we learn how to receive it.

## Current Best Working Version

### Canonical Talk Assets

Use these as the current source of truth:

- `README.md`
- `SCRIPT-v2.md`
- `slides-v0.3.html`
- `script-notes-v2.js`
- `script-outline-v2.js`
- `PRESENTATION-STATUS.md`

### Supporting / Historical Artifacts

These are still useful, but not the current working master:

- `slides.html` — original more text-heavy deck
- `slides-v0.2a.html` — image-driven / cinematic variant
- `slides-v0.2b.html` — abstract / CSS-only variant
- `SCRIPT.md` — earlier script pass
- `OUTLINE.md`
- `PLAN.md`
- `quotes-seed.md`
- `seed.md`
- `RESEARCH.md`

### Non-Canonical / Low-Signal

- `summary-from-app.md` exists, but is not the current handoff document

## Current Deck State

The active deck is `slides-v0.3.html`.

It currently includes:

- quote-driven structure
- 20 slides
- 7 anchor quote slides
- a right-side speaker panel
- `Full` mode using `script-notes-v2.js`
- `Outline` mode using `script-outline-v2.js`
- compact cumulative timing in the header
- larger, more readable header metadata after multiple iterations

The notes panel is now materially better than before:

- full text is readable on a laptop
- outline mode is more spaced and less transcript-like
- redundant quote text was removed from outline slides when the quote is already on screen
- cumulative timing is visible

## Current Script State

`SCRIPT-v2.md` is the best current script.

Its core structure is:

1. Opening hook: Herford / desperation / strange claim
2. Healing and radical hope
3. Inner life: thoughts, love, Heilstrom
4. Cosmic stakes: free will, good vs evil
5. Personal reflection
6. Closing invitation

This version is stronger than the earlier script because it combines:

- personal narrative framing
- quote-driven structure
- intellectual seriousness
- a less preachy speaker stance

### Most Recent Pass

The latest tightening pass did four concrete things:

- locked the title to `The Man Who Said You Can Receive Help`
- aligned `SCRIPT-v2.md` with the deck / README title
- tightened speaker-note phrasing in `script-notes-v2.js` and `script-outline-v2.js`
- gave the closing a clearer payoff to the chosen title and core thesis

## Major Decisions Already Made

### Framing

- Bruno Gröning is not just the topic; he is the example through which a larger truth is explored
- The talk should feel invitational and serious, not evangelical
- The speaker stance should use language like:
  - "he proposed"
  - "he insisted"
  - "in his worldview"
  - "what is striking is"

### Slide Strategy

- The audience-facing slides should not become a teleprompter
- Atmospheric visuals and quote anchors are stronger than dense text slides
- Personal reflection is stronger on black / near-empty slides
- Sparse design, contrast, and silence are part of the rhetorical effect

### Practice Support

- It is acceptable for the deck to include a private-use rehearsal panel on the right
- The rehearsal panel should support memorization and delivery, not damage readability
- Outline mode and full-text mode both matter

### Readability

- Tiny text repeatedly became a problem during iteration
- "Compact" drifted toward illegible several times
- Readability has now been elevated into a real principle, not a minor preference
- A global preference file now exists at `/Users/vonwao/AGENTS.md` reinforcing readable, balanced text sizes across projects

## Key Learnings From The Iteration

### 1. Contrasting Versions Were More Useful Than Small Tweaks

The two parallel deck variants were valuable because they forced real comparison:

- `v0.2a`: cinematic / image-driven
- `v0.2b`: abstract / CSS-only

This made it clearer what actually mattered.

### 2. The Quote-Driven Spine Is Strong

`v0.3` works because the quotes do real structural work, not decorative work.

The best pattern so far is:

- atmosphere
- quote
- atmosphere
- quote
- personal black slides
- quiet closing

### 3. Practice UI And Audience UI Must Be Treated Separately

The right-side panel is useful for rehearsal, but only if it remains readable.

It should not be optimized as if it were a dense productivity dashboard.

### 4. Outline Mode Must Be A Real Cue System

Outline mode works better when it:

- removes redundant quote text
- uses spacing
- uses cue-like phrases
- avoids becoming a compressed transcript

### 5. Readability Is A Durable Principle

This did not emerge as a small styling preference. It showed up repeatedly and forcefully.

This likely generalizes beyond this repo and should influence future interfaces and decks.

## Recent Decision

### Title Is Locked

Use `The Man Who Said You Can Receive Help` as the canonical title across:

- deck title slide
- script title
- README summary
- event listing

## Important Open Issues

### 1. The Script Still Needs Spoken-Performance Tightening

The script is strong structurally, but it has not yet gone through a disciplined rehearsal-driven tightening pass.

Likely areas for improvement:

- rhythm of transitions
- exact phrasing on quote-to-commentary movement
- pacing in section 3
- title / opening / closing coherence

### 2. Timing Is Estimated, Not Fully Rehearsed

The cumulative timer in `slides-v0.3.html` is useful, but it is still an estimate based on note length and assumed pauses.

It is not yet a rehearsal-validated timing model.

### 3. Event Logistics Are Still Incomplete

Still unresolved:

- event date
- final theme / whether speaker's choice
- whether slide usage is expected or optional

## Recommended Next Steps

### Priority 1: Do A Slide-By-Slide Speaking Pass

Work directly through:

- `slides-v0.3.html`
- `script-notes-v2.js`
- `script-outline-v2.js`

Goals:

- tighten spoken rhythm
- improve cue usefulness
- reduce any wording that sounds over-written
- make every slide transition feel intentional

### Priority 2: Rehearse Once And Mark Friction

Do one real timed run and mark:

- slow sections
- awkward phrases
- places where the audience slide and spoken text feel disconnected
- where the notes panel is still too dense or not cue-like enough

### Priority 3: Refine Timing Intentionally

After one spoken run:

- adjust the cumulative timing model
- optionally add per-slide target timing
- identify the must-cut section if the talk runs long

### Priority 4: Final Visual Polish

Once the script is more locked:

- refine quote slide scale and whitespace
- check black-slide pacing
- make sure the closing slides feel earned and not generic

## Design-Extraction Context

This presentation directly seeded the sibling repo:

- `/Users/vonwao/dev/design-guidelines`

That repo now contains:

- imported BG-talk source material
- extracted design principles
- an insights log

This matters because the strongest lessons from this deck are not just local slide tweaks. They are becoming durable principles about:

- readability
- typography
- pacing
- atmosphere
- contrast
- practice surfaces vs audience surfaces

## Recent Relevant Commits

Recent work has included:

- `e343781` — added `slides-v0.3.html`
- `f8bd8f8` — added `SCRIPT-v2.md`
- `0180d85` — added full / outline toggle
- `1f4f09d` — improved notes panel layout and controls
- `86bd295` — refined typography and outline readability
- `504cf2b` — added compact cumulative timing
- `5ff9409` — increased header readability
- `38fb32a` — added bootstrap prompt for design-guidelines repo

## Git State At Time Of Writing

Current local state in `BG-talk`:

- branch: `main`
- local branch is ahead of `origin/main` and also missing one remote commit

That means the local branch contains substantial work that is not fully synchronized with remote yet.

Before doing remote synchronization work, re-check with:

- `git status -sb`


To continue this session, run codex resume 019d34dc-b2c1-7501-9032-4490b50c3c91
