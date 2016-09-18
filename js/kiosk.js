// Utility functions
function loadDoc(id){
  $("#shelfcontainer").hide();
  $("#doc"+id).show();
  $("#pages"+id).show();
  loadPage(id,1);
  $("#title").html($("#title_"+id).text());
}

function loadPage(doc,page){
  $(".imagepan").hide();
  $(".pages span").removeClass("active");
  $("#doc_"+doc+"_"+page).show();
  $("#pageno"+doc+"_"+page).addClass("active");
}

$( document ).ready(function() {

  // Build the HTML
  $.getJSON( "documents.json", function( data ) {

    window.apptitle = data.title;
    // Branding
    $("#logo").append('<img src="' + data.logo + '">');
    $("#title").append(data.title);
    $("title").append(data.title);

    // Document browser
    var doc_count = 0;
    $.each( data.documents, function( dkey, dval ) {
      doc_count = doc_count + 1;

      // Set the card
      $("#shelf").append('<div onclick="loadDoc('+doc_count+')"><img src="'+dval.thumbnail+'"><p id="title_'+doc_count+'">'+dval.name+'</p><span class="link">View Document</span></div>');

      // Set the document container
      $("#content").append('<div id="doc'+doc_count+'" class="document"><div id="pages'+doc_count+'" class="pages">Page: </div>');

      // Populate the pages
      var page_count = 0;
      $.each( dval.pages, function( pkey, pval ) {
        page_count = page_count + 1;
        $("#doc"+doc_count).append('<div id="doc_'+doc_count+'_'+page_count+'" class="imagepan"><img src="'+pval.image+'"></div>')
        $("#pages"+doc_count).append('<span id="pageno'+doc_count+'_'+page_count+'" onclick="loadPage('+doc_count+','+page_count+')">'+page_count+'</span>')
      });

      $(".imagepan > img").annotatorPro({
          maxZoom : 4,
          navigator : true,
          navigatorImagePreview : true,
          fullscreen : true,
          frameWidth : "100%",
          frameHeight : "80%"
      });
    });
  });
  $(".document").hide();

  // Bind Navigation
  $( ".home" ).bind( "click", function() {
    $("#shelfcontainer").show();
    $(".document").hide();
    $("#title").html(apptitle);
  });


});
