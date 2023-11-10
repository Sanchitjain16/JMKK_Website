$(document).ready(function ($) {
  // console.clear();

  ScrollOut({
    cssProps: {
      visibleY: true,
      viewportY: true,
      scrollPercentY: true,
    },
    threshold: 0.2,
  });
});

var promise = document.querySelector("#videoPlayer").play();

if (promise !== undefined) {
  promise
    .catch((error) => {
      // Auto-play was prevented
      // Show a UI element to let the user manually start playback
      console.log(error);
    })
    .then(() => {
      console.log("autoplay started");
      // promise.play();
      // Auto-play started
    });
}
