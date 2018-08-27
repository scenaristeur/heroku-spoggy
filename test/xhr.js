// JS
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/ajax.php', true);
xhr.withCredentials = true;
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        // alert(xhr.responseText);
        // Get header from php server request if you want for something
        var cookie = xhr.getResponseHeader("Cookie");
        // alert("Cookie: " + cookie);
    }
}
xhr.send();


/////////////

https://stackoverflow.com/questions/29895569/get-and-store-cookie-from-set-cookie-from-an-ajax-post-response

https://stackoverflow.com/questions/12840410/how-to-get-a-cookie-from-an-ajax-response/37955635#37955635


The browser cannot give access to 3rd party cookies like those received from ajax requests for security reasons, however it takes care of those automatically for you!

For this to work you need to:

1) login with the ajax request from which you expect cookies to be returned:

$.ajax("https://example.com/v2/login", {
     method: 'POST',
     data: {login_id: user, password: password},
     crossDomain: true,
     success: login_success,
     error: login_error
  });

2) Connect with xhrFields: { withCredentials: true } in the next ajax request(s) to use the credentials saved by the browser

$.ajax("https://example.com/v2/whatever", {
     method: 'GET',
     xhrFields: { withCredentials: true },
     crossDomain: true,
     success: whatever_success,
     error: whatever_error
  });

The browser takes care of these cookies for you even though they are not readable from the headers nor the document.cookie

see my answer here: How to get a cookie from an AJAX response?
