localname = function(node){
  //  console.log("LOCALNAME OF ",node)
  var labelU = node.value;
  if (node.termType == "NamedNode"){
    //  console.log("namenode")
    var uLabel = node.value.split("#");
    var labelU = uLabel[uLabel.length-1];
    if (labelU == uLabel){
      uLabel = node.value.split("/");
      labelU = uLabel[uLabel.length-1];
    }
  }else{
    console.log("literal or blanknode ???",node.value)
  }
  //console.log(labelU)
  return labelU;
}
