var loadSourceInput=document.createElement("INPUT");
loadSourceInput.setAttribute('id', 'file');
loadSourceInput.setAttribute('type', 'file');
loadSourceInput.multiple=true;
document.getElementById("newSourceFiles").appendChild(loadSourceInput);
var reader = new FileReader();
     var fichierAgent = new FichierAgent('fichierAgent');

loadSourceInput.addEventListener('change', function() {
    var listeFichiers=this.files;
    console.log(this.files);
   
    for (i=0; i<listeFichiers.length; i++) {
        var fichier=listeFichiers[i];
        
      //  var fichierAgent = new FichierAgent('fichierAgent'+i);
        //   console.log(fichier);
        fichierAgent.setFile(fichier);
        //     fichierAgent.send('contexte1', "Hello contexte1, peux-tu rajouter le fichier ' "+fichier.name+" ' dans l'interface pour suivre son traitement");
    }
}
);