const SLIDE_IMAGE_SELECTIONS = {
  "version": 1,
  "slides": {
    "title": {
      "candidateId": "bild01",
      "focusY": 24,
      "focusX": 35,
      "scale": 1,
      "dim": 0.18
    },
    "opening": {
      "candidateId": "bild05"
    },
    "herford": {
      "candidateId": "bild03"
    },
    "source": {
      "candidateId": "bild13"
    },
    "ruins": {
      "candidateId": "bild14"
    },
    "trust": {
      "candidateId": "bild30"
    },
    "receive": {
      "candidateId": "bild26",
      "scale": 1,
      "dim": 0.18
    },
    "incurable": {
      "candidateId": "bild20",
      "scale": 1,
      "focusY": 29,
      "focusX": 50,
      "dim": 0.23
    },
    "mystery": {
      "candidateId": "bild16",
      "focusX": 50,
      "focusY": 42,
      "scale": 1,
      "dim": 0.35,
      "tone": "dark"
    },
    "echoes": {
      "candidateId": "bild37",
      "focusX": 36,
      "focusY": 44,
      "scale": 1,
      "dim": 0.36,
      "tone": "dark"
    },
    "thoughts": {
      "candidateId": "bild37"
    },
    "love": {
      "candidateId": "bild31"
    },
    "stakes": {
      "candidateId": "bild40"
    },
    "free-will": {
      "candidateId": "bild25"
    },
    "personal": {
      "candidateId": "bild37"
    },
    "found": {
      "candidateId": "bild22"
    },
    "pause": {
      "candidateId": "bild31"
    },
    "closing": {
      "candidateId": "bild39"
    },
    "invitation": {
      "candidateId": "bild48"
    },
    "thanks": {
      "candidateId": "bild21"
    }
  }
};

if (typeof window !== 'undefined') {
  window.SLIDE_IMAGE_SELECTIONS = SLIDE_IMAGE_SELECTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SLIDE_IMAGE_SELECTIONS;
}
