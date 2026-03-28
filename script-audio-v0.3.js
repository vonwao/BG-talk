// Audio narration source for slides-v0.3.html audio mode.
// Each item maps 1:1 to a slide (0-indexed).
const SCRIPT_AUDIO = [
  {
    slug: 'title',
    text: `The Man Who Said You Can Receive Help.

The message of Bruno Gröning.`,
  },
  {
    slug: 'opening',
    text: `Imagine you're sick. You've been sick for a long time. You've tried everything: doctors, treatments, advice. Nothing has worked.

And then someone tells you, "There's a man. He doesn't prescribe anything. He doesn't operate. He just says: you can be helped."

You'd probably say, "That's ridiculous."`,
  },
  {
    slug: 'herford',
    text: `But in 1949, in a small town in northern Germany called Herford, thousands of people showed up to hear exactly that. Thousands. Not because they were gullible. Because they were desperate. And because something was happening around this man that no one could easily explain.

His name was Bruno Gröning.`,
  },
  {
    slug: 'source',
    text: `At the center of Bruno Gröning's message was a surprising claim. He insisted that he himself was not the healer.

Again and again, he said that healing came from God, not from man. That one idea explains both his appeal and his controversy.

He was not building a personality cult. He was pointing away from himself, toward something much larger.`,
  },
  {
    slug: 'ruins',
    text: `People did not come to Bruno Gröning just for ideas. They came because he spoke into pain, sickness, and hopelessness.

Germany, 1949. The war is over. The country is in ruins: physically, spiritually, psychologically. People are suffering in ways that go far beyond what medicine can reach.

And in the middle of this, a man appears with a message that sounds almost too simple.`,
  },
  {
    slug: 'trust',
    text: `"Trust and believe." This was his central healing formula.

For Gröning, healing was not technique. It was receptivity. Trust was not a side issue. It was part of the mechanism.

He called this force the Heilstrom, the healing stream. A current of goodness that is always present, but that most people have cut themselves off from.`,
  },
  {
    slug: 'receive',
    text: `His teaching wasn't complicated. It came down to a few things.

Stop clinging to what's wrong. Don't make your illness or your problem the center of your identity.

Turn toward what is good, not as wishful thinking, but as an inner act of trust.

And then receive. Not through effort or willpower, but through openness. Through a kind of inner stillness that allows something to flow in.`,
  },
  {
    slug: 'incurable',
    text: `This is one of his most provocative claims. In his view, "incurable" was a human medical judgment, not a limit on divine power.

People reported extraordinary things. Healings that had no medical explanation. Changes that seemed to come from the inside out.

And these weren't treated as just stories. The community that carries on his work says it documents such reports through a medical-scientific review process.`,
  },
  {
    slug: 'mystery',
    text: `This line is important because it shows how he handled skepticism.

He did not claim everything could already be scientifically explained. He claimed that explanation and possibility are not the same thing.

Now, I'm not standing here to tell you that's proof. But I think it's worth paying attention to.`,
  },
  {
    slug: 'echoes',
    text: `Bruno Gröning's message went beyond miraculous healing.

When I first encountered his teaching, what struck me was how familiar it felt. Not because I'd heard of him before. I hadn't. But because parts of it echoed much older spiritual traditions.

The kingdom within. Living water. Grace as something received rather than manufactured. The pattern is the same.`,
  },
  {
    slug: 'thoughts',
    text: `This is crucial to understanding him. Thoughts, for Gröning, were not just mental events. They were forces.

He taught that what a person inwardly receives and repeats begins to shape life.

In his view, thought-discipline was not optional or merely psychological. It was morally and spiritually decisive.`,
  },
  {
    slug: 'love',
    text: `This is one of the most beautiful summaries of his view of the human being.

What is created in love can live only in love. Love is not decoration. It is the condition of life.

Health, goodness, and love belong together. Turn away from the bad, open yourself to the good, and let the healing stream in.`,
  },
  {
    slug: 'stakes',
    text: `And this is where the tone changes.

He placed healing inside a cosmic drama: love against destruction, God against evil, freedom against passivity.

He said, "As true as it is that there is the Lord, there is also the Satan." He did not treat evil as a metaphor. He treated it as a real opposing force.`,
  },
  {
    slug: 'free-will',
    text: `For Gröning, free will was the great dignity of the human being, but also the reason people can turn away from divine order.

Healing cannot be forced on anyone. Even divine help, in his framing, does not override freedom. The person has to decide inwardly.

For him, a human being was not just sick or healthy. A human being was always choosing what power to receive.`,
  },
  {
    slug: 'personal',
    text: `I should tell you why I'm up here talking about this.

I'm a software engineer. I've spent 25 years building technology, and more recently AI systems. Logic, systems, code. That's my world.

But for years, I've also been drawn to a different kind of question. The question of what the human being actually is. Whether there's more to us than what fits in a materialist framework.`,
  },
  {
    slug: 'found',
    text: `And when I encountered the teaching of Bruno Gröning, something in it rang true. Not because someone told me to believe it. But because parts of it matched what I had already sensed, and when I tested it inwardly, I found that there was something real there.

I've experienced help. I've experienced healing. Not in dramatic, Hollywood ways, but in quiet, unmistakable ways that changed how I understand what's possible.

I'm not asking you to take my word for it. I'm just telling you what I found.`,
  },
  {
    slug: 'pause',
    text: ``,
    advanceAfterMs: 1800,
  },
  {
    slug: 'closing',
    text: `Bruno Gröning was compelling not just because he spoke about healing.

It was because he said the human being is open. Open to thought. Open to love. Open to destruction. And perhaps open to grace.

That makes his message larger than the story of one unusual man.

The man said you can receive help. The deeper claim was that help is available, if we learn how to receive it.`,
  },
  {
    slug: 'invitation',
    text: `I think that's worth considering. Not as dogma. Not as religion. Just as a possibility.

And if it interests you, if something in this resonated tonight, the Circle of Friends of Bruno Gröning is active around the world, and they welcome anyone who wants to learn more.`,
  },
  {
    slug: 'thanks',
    text: `Thank you.`,
  },
];

if (typeof window !== 'undefined') {
  window.SCRIPT_AUDIO = SCRIPT_AUDIO;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SCRIPT_AUDIO;
}
