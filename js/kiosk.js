// Utility functions
function loadDoc(id){
  $("#shelfcontainer").hide();
  $("#doc"+id).show();
}


$( document ).ready(function() {

  // Build the HTML
  $.getJSON( "documents.json", function( data ) {
    // Branding
    $("#logo").append('<img src="' + data.logo + '">');
    $("#title").append(data.title);
    $("title").append(data.title);

    // Document browser
    var doc_count = 0;
    $.each( data.documents, function( dkey, dval ) {
      doc_count = doc_count + 1;

      // Set the card
      $("#shelf").append('<div onclick="loadDoc('+doc_count+')"><img src="'+dval.thumbnail+'"><p>'+dval.name+'</p><span class="link">View Document</span></div>');

      // Set the document container
      $("#content").append('<div id="doc'+doc_count+'" class="document"><div id="pages'+doc_count+'"></div>');

      // Populate the pages
      var page_count = 0;
      $.each( dval.pages, function( pkey, pval ) {
        page_count = page_count + 1;
        $("#doc"+doc_count).append('<div class="imagepan"><img src="'+pval.image+'"></div>')
      });

      $(".imagepan > img").annotatorPro({
          maxZoom : 4,
          navigator : true,
          navigatorImagePreview : true,
          fullscreen : true,
          frameWidth : "100%",
          frameHeight : "85%"
      });
    });
  });
  $(".document").hide();

  // Bind Navigation
  $( ".home" ).bind( "click", function() {
    $("#shelfcontainer").show();
    $(".document").hide();
  });


});
