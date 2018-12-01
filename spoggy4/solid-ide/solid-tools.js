export const SolidTools = function(){
var self = this
if (typeof(module)!="undefined" ){
    if(typeof($rdf)==='undefined') $rdf = require('rdflib')
    if(typeof(solid)==='undefined') solid={auth:require('solid-auth-client')}
}
this.processFolder = function(graph,url,content,callback){
        // this.log("processing folder")
        var items = self.getFolderItems(graph,url);
        var stats = self.getStats(graph,url)
        var fullname = url.replace( /\/$/,'')
        var name = fullname.replace( /.*\//,'')
        var parent = fullname.replace(name,'')
        return({
             type : "folder",
             name : name,
              url : url,
         modified : stats.modified,
             size : stats.size,
            mtime : stats.mtime,
           parent : parent,
          content : content,
          folders : items.folders,
            files : items.files,
        })
}

this.get = async function(thing){
  var self = this;
  var fc = this.fileclient;
  if(! thing.type) thing.type = fc.guessFileType(thing.url)
  console.log(thing)
  var body = await fc.fetch(thing.url)
//  console.log("BODY :",body)
  if(!body){ self.err=fc.err; return false }
  self.log("got a "+thing.type)
  if( thing.type==="folder" ) {
    var graph = fc.text2graph(body.value,thing.url,"text/turtle")
    if(!graph) {
      self.err = fc.err
      return false
    }
    else {
      let folder = fc.processFolder( graph,thing.url,body.value)
      self.checkForIndex( folder );
      let parentOK=folder.parent.replace('https://','').replace(/^[^/]*/,'')
      if( parentOK ){
        folder.folders.unshift({
          type : "folder",
          url : folder.parent,
          name : ".."
        })
      }
      return {"key":"folder", "value":folder }
    }
  }
  else {
    if(body && body.value && body.value.match('alert-danger')
    && !thing.url.match('solid-auth-simple')
  ) {
    self.err = fc.err
    return false
  }
  else return('file',{key:"file",value:{
    type:thing.type,
    content:body.value,
    url:thing.url
  }})
}
}

this.log = function(msg){console.log(msg) }

/* INTERNAL FUNCTIONS
*/
this.checkForIndex = function( folder ){
var self = this;
self.hasIndexHtml = false
for( var f in folder.files){
  if( folder.files[f].name==="index.html" ) {
    self.hasIndexHtml = true;
    break;
  }
}
}

return this
}

/* END */
