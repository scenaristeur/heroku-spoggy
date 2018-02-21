
function spogtools(debug) {
this.debug = debug;
}

spogtools.prototype.log =function(data){
  if(this.debug){
    console.log(data);
  }
}

module.exports = spogtools;
