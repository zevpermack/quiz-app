$(() => {
  $("#share-btn").on('click', () => {
    navigator.clipboard.writeText(window.location.href);
  });

});
