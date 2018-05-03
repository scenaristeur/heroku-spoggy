var worker;

if( !!window.Worker ) {
  // web workers supportes
  worker = new SharedWorker("./worker6.js");
/*  worker.port.addEventListener('message', function(e) {
    // mis a jour de l'affichage a reception du message du worker
    var label = document.getElementById("labelHeure");
      label.innerHTML = e.data;
    }, false);
  worker.port.start();*/
  worker.port.onmessage = function(e){
    // mis a jour de l'affichage a reception du message du worker
    var label = document.getElementById("labelHeure");
      label.innerHTML = e.data;
  }
} else {
  // web workers non supportes
}

// clic sur boutons
var boutonDemarrerWorker = document.getElementById("boutonDemarrerWorker");
boutonDemarrerWorker.onclick = function(e) {
  worker.port.postMessage("start");
};
var boutonSuspendreWorker = document.getElementById("boutonSuspendreWorker");
boutonSuspendreWorker.onclick = function(e) {
  worker.port.postMessage("pause");
};

var boutonStopperWorker = document.getElementById("boutonStopperWorker");
boutonStopperWorker.onclick = function(e) {
  worker.port.postMessage("stop");
};
