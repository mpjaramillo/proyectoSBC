$(function() {
    ajaxJS();
    function ajaxJS(e) {
      if (e) {
        e.preventDefault();
      }
      $.ajax({
        url: "data_class.json",
        method: "GET",
        success: function(data) {
          console.log(data);
         
          var html_to_append = '';
          $.each(data, function(i, item) {
            html_to_append +=
            '<div class="col-3 mb-3"><div class="text-uppercase"><p>' +
            JSON.stringify(item[0]) + 
            '<div class="col-3 mb-3"><div class="ext-uppercase"><p>' +
            item[1].continentLabel +
            '</p></div><img  class="image img-fluid" src="' +
            item[1].pic +
            '" /><p class="company">' +
            item[1].poblation +
            '</p></div>';
          });
          $("#items-container").html(html_to_append);
        },
        error: function() {
          console.log(data);
        }
      });

    }

  });