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
