const SLIDE_IMAGE_SELECTIONS = {
  version: 1,
  slides: {},
};

if (typeof window !== 'undefined') {
  window.SLIDE_IMAGE_SELECTIONS = SLIDE_IMAGE_SELECTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SLIDE_IMAGE_SELECTIONS;
}
