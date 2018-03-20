// ==UserScript==
// @name         CrestronButton
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @namespace    http://www.cloud.oracle.com/
// @version      2.5
// @description  Highlights your interesting notifications, with an option to hide the unimportant ones.
// @author       Kollin Brandenburg and Cesar Rios
// @match        https://www.facebook.com/kollinb* 
// @match        https://www.facebook.com/cesar.rios*

// @run-at       document-start
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

$(function(){
// this is where the observer code goes

// this is where the button is clicked

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        //console.log(mutation)
        if (mutation.addedNodes) {
            // element added to DOM
              all = $('.userContent').map(function() {
              if (!$(this).find('button').text()) {
                  $(this).prepend(`<button class="_cesar">Creston</button>`)
              }
            })
        }
    });
});

  var config = {
      attributes: true,
      childList: true,
      characterData: true
  };

  observer.observe(document.body, config);

  $('body').on('click', '._cesar', function(e){


      console.log($(this).parent().find("p").text())
          let messageIncident = $(this).parent().find("p").text()
          let data = {
                  "primaryContact":
                  {
                      "id": 2
                  },
                  "subject": messageIncident
              }


      $.ajax({
              type: "POST",
                    beforeSend: function (request) {
                      //    debugger;
                  request.setRequestHeader("Access-Control-Allow-Origin", '*'),
                  request.setRequestHeader('Authorization', 'Basic YWxpY2U6aHVtYmxlRmxha2U4Xg==');
              },
                    dataType: "json",
                    data: JSON.stringify(data),
              url: 'https://cors-anywhere.herokuapp.com/https://crestron.rightnowdemo.com/services/rest/connect/v1.3/incidents',
                    headers: {

                          },
              success: function(data){
                  console.log("success!: ",data);
              },
                    error: function(data){
                    console.log("failure!: ", data)
              }
          });
  })

});
