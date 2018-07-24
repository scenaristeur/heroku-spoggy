function data2Xml( _dataString) {
    var dataString=_dataString;
    console.log(dataString);
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(dataString, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(dataString);
    }
    console.log(xmlDoc);
    createTableauxXml(xmlDoc);
    
}







function createTableauxXml(_xml){
    var xmlDoc=_xml;
    var entete=xmlDoc.childNodes[0];
    var rdf=xmlDoc.childNodes[1];
    var commentaires=xmlDoc.childNodes[2];
    
    var ontologie="";
    var classes=[];
    var namedIndividuals=[];
    var objectProperties=[];
    var datatypeProperties=[];
    var comments=[];    
    
    for(var i = 0; i< rdf.childNodes.length; i++){
        var element = rdf.childNodes[i];
        var name=element.nodeName;
        
        
        
        
        switch(name){
            case "owl:Ontology" :
            ontologie=element.getAttribute("rdf:about");
            break;
            case "owl:Class" :
            console.log("classe");
            classes.push(element);
            break;
            case "owl:NamedIndividual" :
            console.log("namedIndividual");
            namedIndividuals.push(element);
            break;
            case "owl:ObjectProperty" :
            console.log("objectProperties");
            objectProperties.push(element);
            break;
            case "owl:DatatypeProperty" :
            console.log("datatype");
            datatypeProperties.push(element);
            break;
            case "#comment" :
            console.log("comment");
            comments.push(element);
            break;
            default : 
            // console.log("non géré :");
            // console.log(element);
            break;
        }
        
    } 
    
    
    
    Xml2Noeuds(ontologie, "ontologie");
    Xml2Noeuds(classes, "classe");
    Xml2Noeuds(namedIndividuals, "individual");
    Xml2Noeuds(objectProperties, "propriete");
    //Xml2Noeuds(datatypeProperties, "propriete");
    Xml2Noeuds(comments, "comment");
}


function Xml2Noeuds( _datas,  _type) {
    var datas=_datas;
    var type=_type;
    console.log(type);
    console.log(datas);
    
    for (var i = 0; i < datas.length; i++) {
        
        var data = datas[i];
        
        
        
        if (type=="individual") {
            //  console.log(data);
            console.log(" ");
            var about=data.getAttribute("rdf:about");
            var easyCutS=about.split('#');
            var sujetPrefix=easyCutS[0];
            var sujetLocalName=easyCutS[1];
            //    console.log("récupération des propriétés de "+sujetLocalName);
            //recuperation des proprietes
            var proprietes=data.childNodes;
            for (var j=0; j<proprietes.length; j++) {
                var proprieteXml=proprietes[j];
                if (proprieteXml.nodeType==1){
                    console.log(proprieteXml);
                    var prop=proprieteXml.nodeName;
                    var objetUri=proprieteXml.getAttribute("rdf:resource");
                    
                    
                    if (prop.indexOf(":") > -1){
                        console.log("coupe "+ prop);
                        var easyCutP=prop.split(':');
                        var propPrefix=easyCutP[0];
                        var propLocalName=easyCutP[1];
                        prop=propLocalName;
                    }
                    
                    var objet="";
                    
                    if((typeof objetUri != 'undefined')&&(objetUri!=null)){
                        var easyCutO=objetUri.split('#');
                        var objetPrefix=easyCutO[0];
                        objetLocalName=easyCutO[1];
                        objet=objetLocalName;
                    }
                    else{
                        
                        objet=proprieteXml.firstChild.nodeValue;
                    }
                    
                    
                    console.log(sujetLocalName+" -> "+prop+" -> "+objet);
                    
                }
            }
            /* String about =data.attributes[0].value;
                String[] easyCut  = split(about, '#'); 
                String sujetPrefix=easyCut[0];
                String sujetLocalName=easyCut[1];
                //   console.log("récupération des propriétés de "+sujetLocalName);
                
                //récupération des propriétés 
                XML[]proprietes=data.getChildren();
                // console.log(children);
                for (int j=0; j<proprietes.length; j++) {
                XML [] proprieteXml=proprietes[j];
                //  console.log(proprieteXml);
                String proprieteString=proprieteXml.fullName;
                //  console.log("prop ="+proprieteString);
                if (proprieteString) {
                if (proprieteXml.attributes[0]) {
                String objetUri= proprieteXml.attributes[0].value;
                //   console.log(proprieteXml.fullName+" "+objetUri);
                String[] easyCut  = split(objetUri, '#'); 
                String objetPrefix=easyCut[0];
                String objetLocalName=easyCut[1];
                //  ajouteInformation(sujetLocalName, proprieteString, objetLocalName);
                Array<String> infoAAjouter= new String[3];
                infoAAjouter[0]=sujetLocalName;
                infoAAjouter[1]=proprieteString;
                infoAAjouter[2]=objetLocalName;
                infosAAjouter.add(infoAAjouter);
                // console.log(infosAAjouter.size());
                var divMessage=document.getElementById("divMessage");
                divMessage.innerHTML= "DV3"+infosAAjouter.size();
                } else {
                console.log("descendre encore d'un niveau");
                }
                //  console.log("--->"+child.attributes[0].value);
                } else {
                //  console.log("fullname non trouvé "+child);
                }
                }
            */
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            //   console.log(localName);
            /*   int nx=random(width);
                int ny = random(height);
                Noeud noeud=new Noeud(localName, nx, ny);
                noeud.prefix=prefix;
                noeud.type=type;
            noeuds.add(noeud);*/
            /*  Noeud  nouveauNoeud=new Noeud(massDefaut);
                nouveauNoeud.setUriCourte(localName);
                nouveauNoeud.setPrefix(prefix);
            physics.particles.add(nouveauNoeud);*/
        }
        
        
        // console.log(type);
        // récupérer les liens de chaque Noeud
        /*  if (type.equals("individual")) {
            console.log("-------------------------------------------------------Individuel" +localName);
            XML[]children=data.getChildren();
            for (int j=0; j<children.length; j++) {
            XML [] child=children[j];
            if (child.fullname) {
            console.log(child.fullname);
            console.log(child);
            //  console.log("--->"+child.attributes[0].value);
            } else {
            //  console.log("fullname non trouvé "+child);
            }
            }
            }
        */
        
        /*
            // get children
            if (type.equals("propriete")) {
            console.log("-------------------------------------------------------propriété" +localName);
            XML[]children=data.getChildren();
            for (int j=0; j<children.length; j++) {
            XML [] child=children[j];
            if (child.fullname) {
            console.log(child.fullname);
            //  console.log("--->"+child.attributes[0].value);
            } else {
            //  console.log("fullname non trouvé "+child);
            }
            }
        }*/
    }
}



function ttl2Xml( _dataString){
    //   console.log(_dataString);
    var prefixes=[];
    var base="";
    var separateur="";
    var lignes=_dataString.split("\n");
    for (var i=0; i<lignes.length; i++){
        var ligne=lignes[i];
        //  console.log("--> "+ligne); 
        if (ligne.startsWith("@prefix ")) {
            
            var lignePrefix=ligne.split("@prefix ");
            var lignePrefixCuted=lignePrefix[1].split(": ");
            var prefix=lignePrefixCuted[0].trim();
            var vpWithPoint=lignePrefixCuted[1].trim();
            var valeurPrefix = vpWithPoint.substring(0, vpWithPoint.length-1).trim();
            console.log(prefix+" --> "+valeurPrefix);
            
            if(prefix==""){
                prefix=":"; 
            }
            prefixes.push(prefix, valeurPrefix);
            
        }
        else if (ligne.startsWith("@base ")) {
            // console.log(ligne);
            base=ligne.split("@base ")[1].trim();
            base=base.substring(0, base.length-1).trim();
            // console.log("BASE => "+base);
            }else {
            ligne=ligne.trim();
            var ligneSplit=ligne.split(" ");
            
            if(ligneSplit.length>1){
                console.log(ligneSplit.length);
                console.log(ligneSplit);
                
                var ligneValide=false;
                switch(ligneSplit.length) { 
                    case 5:
                    console.log("A gérer, import avec graphe ?");
                    ligneValide=false;
                    break;
                    case 4:
                    sujet=ligneSplit[0];
                    propriete=ligneSplit[1];
                    objet=ligneSplit[2];
                    separateur=ligneSplit[3];
                    ligneValide=true;
                    break;
                    case 3 :
                    if (separateur==";") {
                        propriete=ligneSplit[0];
                        objet=ligneSplit[1];
                        separateur=ligneSplit[2];
                        ligneValide=true;
                        } else {
                        ligneValide=false;
                        console.log("PB avec ligneSplit 3");
                    }
                    break;
                    case 2:
                    if (separateur==",") {
                        objet=ligneSplit[0];
                        separateur=ligneSplit[1];
                        ligneValide=true;
                        } else {
                        ligneValide=false;
                        console.log("PB avec ligneSplit2");
                    }
                    break;
                    case 1:
                    ligneValide=false;
                    console.log("un seul champ pour ligneSplit -> pas d'info");
                    break;
                    default :
                    ligneValide=false;
                    console.log("pb de ligne");
                    //   sketch.ajouteInformation("smag:"+sujet, "rdf:type", "smag:"+message);
                }
            }
            
            if (ligneValide) {
                console.log(" => "+sujet+" "+propriete+" "+objet);
                //ajouteInformation(sujet, propriete, objet);
            }
            ligneValide=false;
        }
  
    }
}








/*
    function ttl2Xml( _dataString) {
    HashMap<String, String> prefixes=new HashMap();
    String base=new String();
    console.log(_dataString);
    String[] lignes=_dataString.split("\n");
    String sujet=new String();
    String propriete=new String();
    String objet=new String();
    String separateur=new String();
    for (String ligne : lignes) {
    
    if (ligne.startsWith("@prefix ")) {
    String[] lignePrefix=ligne.split("@prefix ");
    String[] lignePrefixCuted=lignePrefix[1].split(": ");
    String prefix=trim(lignePrefixCuted[0]);
    String vpWithPoint=trim(lignePrefixCuted[1]);
    String valeurPrefix = trim(vpWithPoint.substring(0, vpWithPoint.length-1));
    if (prefix.equals("")) {
    prefix=":";
    }
    prefixes.put(prefix, valeurPrefix);
    // console.log(prefixes);
    //  console.log("PREFIX :\n\t "+prefix+"\t"+valeurPrefix);
    } else if (ligne.startsWith("@base ")) {
    // console.log(ligne);
    base=trim(ligne.split("@base ")[1]);
    base=trim(base.substring(0, base.length-1));
    // console.log("BASE => "+base);
    } else {
    ligne=trim(ligne);
    String[] ligneSplit=ligne.split(" ");
    console.log(ligneSplit.length);
    console.log(ligneSplit);
    Boolean ligneValide=false;
    switch(ligneSplit.length) { 
    case 5:
    console.log("A gérer, import avec graphe ?");
    ligneValide=false;
    break;
    case 4:
    sujet=ligneSplit[0];
    propriete=ligneSplit[1];
    objet=ligneSplit[2];
    separateur=ligneSplit[3];
    ligneValide=true;
    break;
    case 3 :
    if (separateur=";") {
    propriete=ligneSplit[0];
    objet=ligneSplit[1];
    separateur=ligneSplit[2];
    ligneValide=true;
    } else {
    ligneValide=false;
    console.log("PB avec ligneSplit 3");
    }
    break;
    case 2:
    if (separateur=",") {
    objet=ligneSplit[0];
    separateur=ligneSplit[1];
    ligneValide=true;
    } else {
    ligneValide=false;
    console.log("PB avec ligneSplit2");
    }
    break;
    case 1:
    ligneValide=false;
    console.log("un seul champ pour ligneSplit -> pas d'info");
    break;
    default :
    ligneValide=false;
    console.log("pb de ligne");
    //   sketch.ajouteInformation("smag:"+sujet, "rdf:type", "smag:"+message);
    }
    
    if (ligneValide) {
    console.log("Ajoute => "+sujet+" "+propriete+" "+objet);
    ajouteInformation(sujet, propriete, objet);
    }
    ligneValide=false;
    }
    }
    // fin du traitement des lignes
    //--> traitement des maps créées
    for (String key : prefixes.keySet ())
    {
    console.log(key + " -> " + prefixes.get(key));
    }
    console.log("BASE => "+base);
    }
    
    function owl2xml(String owlFile) {
    //deuxième méthode pour charger un owl/xml
    xml = new XMLElement(this, owlFile);
    createTableauxXml(xml);
    }
    
    
    void createTableauxXml(XML[] _xml) {
    console.log(_xml.getChildCount());
    // if (debug) {
    int enfants = _xml.getChildCount();
    console.log(enfants+" enfants dans le fichier chargé");
    for (int i = 0; i < enfants; i++) {
    
    XMLElement kid = _xml.getChild(i); 
    // console.log(kid.getName());
    //    console.log(kid);
    }
    //}
    ontologie=_xml.getChildren("owl:Ontology");
    classes=_xml.getChildren("owl:Class");
    individuals=_xml.getChildren("owl:NamedIndividual");
    proprietes=_xml.getChildren("owl:ObjectProperty");
    comments=_xml.getChildren("#comment");
    
    Xml2Noeuds(ontologie, "ontologie");
    Xml2Noeuds(classes, "classe");
    Xml2Noeuds(individuals, "individual");
    Xml2Noeuds(proprietes, "propriete");
    Xml2Noeuds(comments, "comment");
    }
*/

