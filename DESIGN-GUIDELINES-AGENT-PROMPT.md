# Prompt For A New Agent: Create A Design Guidelines Repo

Use this prompt to launch a fresh agent that will create a standalone design-guidelines repository based on the spirit of this project and other related projects.

---

You are creating a new repository called `design-guidelines`.

This is not a generic design-system repo and not a Tailwind snippet dump. It should capture the deeper design sensibility, taste, and working principles that show up across my projects, starting with `BG-talk` and then expanding to other repos I point you to.

## Objective

Build a reusable repo that documents and operationalizes the design spirit behind my work:

- intentional, not generic
- human, atmospheric, and emotionally aware
- bold enough to feel distinctive
- readable on real laptop screens
- skeptical of tiny text, over-compact UI, and "AI slop"
- strong typography and spacing
- structure that supports meaning, not just decoration
- presentation and interface design that help the message land

This repo should help future agents and humans design new work in the same spirit.

## Initial Source Projects

Start with:

- `/Users/vonwao/dev/BG-talk`

Then inspect any additional repos I provide during the run.

For `BG-talk`, pay special attention to:

- `README.md`
- `SCRIPT-v2.md`
- `OUTLINE.md`
- `slides-v0.3.html`
- `/Users/vonwao/AGENTS.md`

Do not just summarize the repo contents. Extract the transferable design logic underneath it.

## What You Are Trying To Capture

From `BG-talk`, infer and formalize ideas like:

- slides should support a talk, not duplicate it
- visual design should create atmosphere and attention, not clutter
- typography is part of the message
- contrast, silence, and pacing matter
- readability is non-negotiable
- "compact" should never mean tiny or strained
- the interface should feel composed and deliberate
- the work should avoid generic startup/dashboard aesthetics unless the project explicitly calls for that

Also identify tensions and tradeoffs, for example:

- cinematic vs minimal
- emotional atmosphere vs intellectual clarity
- sparse slides vs practice notes
- beauty vs legibility
- distinctiveness vs usability

## Deliverables

Create a new repo with a structure roughly like this:

- `README.md`
- `AGENTS.md`
- `docs/design-principles.md`
- `docs/typography.md`
- `docs/layout-and-spacing.md`
- `docs/color-and-atmosphere.md`
- `docs/motion-and-pacing.md`
- `docs/readability-rules.md`
- `docs/presentation-design.md`
- `docs/interface-critique-checklist.md`
- `docs/anti-patterns.md`
- `docs/cross-project-patterns.md`
- `prompts/design-review.md`
- `prompts/new-project-bootstrap.md`
- `prompts/ui-critique.md`
- `examples/`

If a better structure emerges, use it. But keep the repo practical and navigable.

## Requirements

The repo should include:

1. A clear statement of the design philosophy.
2. A set of non-negotiable readability rules.
3. Typography guidance with concrete recommendations, not vague platitudes.
4. Guidance for presentations, websites, app interfaces, and content-heavy layouts.
5. Anti-patterns to avoid.
6. A critique framework that future agents can use when reviewing designs.
7. Prompt templates that future agents can use to apply the guidelines.
8. Examples that show what "good" and "bad" look like in this style.
9. An `AGENTS.md` that tells future agents how to use the repo when designing.

## Tone And Quality Bar

- Be opinionated.
- Be concrete.
- Avoid generic "keep it clean and modern" language.
- Prefer strong distinctions over watered-down design advice.
- Write as if this repo should actually shape future work.
- Make it useful for both humans and agents.

## Important Constraints

- Do not produce a bland corporate design system.
- Do not optimize for average taste.
- Do not over-focus on implementation details before the principles are clear.
- Do not let "compact" override readability.
- Do not recommend tiny metadata, tiny buttons, or tiny helper text.
- Do not collapse everything into one visual style; document a family resemblance, not one rigid template.

## Process

1. Inspect `BG-talk` carefully and extract the underlying design values.
2. Separate project-specific choices from reusable cross-project principles.
3. When other repos are provided, compare them and identify recurring patterns.
4. Build the repo around principles, heuristics, prompts, examples, and anti-patterns.
5. Make the result usable as both a reference and an operating manual for future agents.

## Desired Outcome

At the end, I should have a repo that can answer questions like:

- "What does a design in my style feel like?"
- "What typography and spacing choices are usually right?"
- "What should future agents avoid by default?"
- "How do I review whether a UI or slide deck is aligned with my taste?"
- "How do I bootstrap a new project so it inherits this sensibility?"

## Final Output Expectations

When you finish, summarize:

- the core design principles you extracted
- what came specifically from `BG-talk`
- what is likely generalizable across projects
- the repo structure you created
- the prompt files and guideline docs you added
- any open questions where more source projects would improve the design language

Commit your work as you go. Use readable typography in any examples or demo artifacts you create.
