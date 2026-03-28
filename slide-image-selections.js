const SLIDE_IMAGE_SELECTIONS = {
  version: 1,
  slides: {
    title: {
      candidateId: 'bild01'
    },
    opening: {
      candidateId: 'bild05'
    },
    herford: {
      candidateId: 'bild03'
    },
    source: {
      candidateId: 'bild13'
    },
    ruins: {
      candidateId: 'bild14'
    },
    trust: {
      candidateId: 'bild30'
    },
    receive: {
      candidateId: 'bild26'
    },
    incurable: {
      candidateId: 'bild20'
    },
    mystery: {
      candidateId: 'bild23'
    },
    echoes: {
      candidateId: 'bild25'
    },
    thoughts: {
      candidateId: 'bild37'
    },
    love: {
      candidateId: 'bild31'
    },
    stakes: {
      candidateId: 'bild40'
    },
    'free-will': {
      candidateId: 'bild25'
    },
    personal: {
      candidateId: 'bild37'
    },
    found: {
      candidateId: 'bild22'
    },
    pause: {
      candidateId: 'bild31'
    },
    closing: {
      candidateId: 'bild39'
    },
    invitation: {
      candidateId: 'bild48'
    },
    thanks: {
      candidateId: 'bild21'
    }
  },
};

if (typeof window !== 'undefined') {
  window.SLIDE_IMAGE_SELECTIONS = SLIDE_IMAGE_SELECTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SLIDE_IMAGE_SELECTIONS;
}
