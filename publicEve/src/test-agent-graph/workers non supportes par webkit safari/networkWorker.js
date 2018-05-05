
//https://developer.mozilla.org/fr/docs/Utilisation_des_web_workers

var i = 0;
var glob =0;

function timedCount() {
    i = i + 1;
    postMessage(glob);
    glob = Date.now();
    //console.log();
    setTimeout("timedCount()",500);
}

timedCount();

/*var intervalId;
var port;
var portList = new Array();
var numberOfPort = 0;

onconnect = function (event) {
  port = event.ports[0];
  numberOfPort++;
  portList[ numberOfPort - 1 ] = port;


  port.onmessage = function(e) {
    if ( e.data == "start" ) {
      intervalId = setInterval( envoyerDate, 1000);
    } else if ( e.data == "pause" ) {
      clearInterval( intervalId );
      envoyerChaine( "WORKER SUSPENDU "+port )
    } else if ( e.data == "stop" ) {
      clearInterval( intervalId );
      port.postMessage("WORKER STOPPE");
      port.close();
    }
  };
//  port.start();
};

var envoyerDate = function() {
  for (var p=0; p<portList.length; p++)  {
    portList[ p ].postMessage( new Date() + '<br>Nb connexions = ' + numberOfPort );
  }
}

var envoyerChaine = function( chaine ) {
  for (var p=0; p<portList.length; p++)  {
    portList[ p ].postMessage( new Date() + " " + chaine + '<br>Nb connexions = ' + numberOfPort );
  }
}
*/
