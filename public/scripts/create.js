// Client facing scripts here
$(() => {
  console.log('This is create.js');
  $( "#add-question-btn" ).on( "click", function() {
    console.log( $( this ).text() );
  });
})
