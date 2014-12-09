$('#search').keyup(function() {
   var searchField = $('#search').val();
   var myExp = new RegExp(searchField, "i");     
   $.getJSON('data.json', function(data) {
   var output = '<ul class="searchresults">';
   $.each(data, function(key, val) {
        if (val.name.search(myExp) != -1) {
        output += '<li>';
        output += '<h2>' + val.name +'</h2>';
        output += '<p>' + val.shortname +'</p>';
        output += '<p>' + val.reknown +'</p>';
        output += '<p>' + val.bio +'</p>';
        output += '</li>';
        }
    });
    output += '</ul>';
    $('#update').html(output);

});
});

//get JSON