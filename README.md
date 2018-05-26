test Polymer 3
(En raison de l'utilisation des [web components](https://www.webcomponents.org/), SPOGGY fonctionne avec les dernières versions de Chrome & Opera, Le chargement dans Firefox < v60 est lent)
# heroku-spoggy

[voir la doc en pleine page ](https://scenaristeur.github.io/heroku-spoggy/) ou  
[voir le repo github](https://github.com/scenaristeur/heroku-spoggy)
[Premiers pas et prise en mains de Spoggy](https://www.youtube.com/watch?v=5BHIoRyPIWc&list=PLmnJTs7YASPO61OzacKf4atmLObMFMD3m)

Spoggy est un outil de stockage de connaissances.
Si vous êtes expert d'un domaine et souhaitez partager vos connaissances, si vous foisonnez d'idées mais avez toujours du mal à vous faire comprendre par un public 'non initié', si vous devez travailler en équipe de manière 'collaborative', si le collègue que vous devez remplacer part à la retraite sans vous avoir donné toutes les clés de sa fonction, si vous voulez exprimer de manière simple une tension 'holocratique', Spoggy peut vous aider.
# DEMO
[Essayer Spoggy](https://spoggy.herokuapp.com/)

# Spoggy Aide-mémoire de SPOGGY INPUT
- Saisir un message pour le chat
Un message pour le chat ne doit ni commencer par / , ; .
ni se terminer par , ; . sinon, il sera considéré comme un triplet

- Saisir un triplet au format Turtle
Une saisie qui ne se termine pas par . ou ; ou , n'est pas pris en compte comme un triplet
David a man. -> triplet complet,
David a man; -> indique de garder le sujet
David a man, -> indique de garder sujet et propriete

- Récupérer le dernier triplet saisi
en commençant par . -> on récupère tout le dernier triplet
en commençant par ; -> on récupère le sujet et la propriete
en commençant par , -> on récupère seulement le dernier sujet

- Saisir une commande
le commandes commencent par / -> exemple /h pour afficher l'aide


[Un cours sur le RDF ?](https://perso.liris.cnrs.fr/pierre-antoine.champin/enseignement/semweb/rdf.html)
[inférence W3C](https://www.w3.org/standards/semanticweb/inference)
[OWl -inférence](https://fr.wikipedia.org/wiki/Web_Ontology_Language)
[Qu'est-ce que l'inférence ?](http://www.csrdn.qc.ca/discas/MaterielDidactique/inferences.html)
[catégories d'inférences](http://www-igm.univ-mlv.fr/~dr/XPOSE2009/Le%20Web%203.0/concepts.html#requetes)
[OWL-reasoning-Protege](https://protege.stanford.edu/conference/2007/slides/owlTutorial-reasoning_dameron.pdf)
[theory to reality](http://www.sce.carleton.ca/faculty/esfandiari/agents/OntologiesInPracticeLast2.pdf)

# Intégrer Spoggy sur votre site Web ? Simple comme une iframe :
<pre><code class="js">&lt;iframe  width="90%" height="700" src="https://spoggy.herokuapp.com/?source=/exemple_files/NCC_2018.json"&gt;&lt;/iframe&gt;</code></pre>


<iframe  width="90%" height="700" src="https://spoggy.herokuapp.com/?source=/exemple_files/NCC_2018.json"></iframe>


# Deployer Spoggy sur Heroku
[![Deploy](http://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

<p>
  Vous pouvez utiliser les boutons <b><i>'Edit / Add node'</i></b>
   pour ajouter un noeud ou '<b><i>Edit / Add Edge</i></b>' pour relier deux noeuds.
</p>
<p>  ou la zone de saisie # SPOGGY INPUT<br>
  ## Saisir un message pour le chat<br>
  Un message pour le chat ne doit ni commencer par <b>/ , ; .</b><br>
  ni se terminer par <b>, ; . -</b> sinon, il sera considéré comme un triplet
</p>
<p>
  ## Saisir un triplet au format Turtle<br>
  Une saisie qui ne se termine pas par <b>.</b> ou <b>;</b> ou <b>,</b> ou <b>-</b>
   n'est pas pris en compte comme un triplet, par contre, les exemples ci-dessous sont des triplets<br>
  - David type Personne<b>.</b> -> triplet complet,<br>
  - David type Personne<b>;</b> -> indique de garder le sujet<br>
  - David type Personne<b>,</b> -> indique de garder sujet et propriete<br>
  - David type Personne<b>-</b> -> indique de passer l'objet à la place du sujet
</p>

<p>
  ## Récupérer le dernier triplet saisi<br>
  - en commençant par <b>.</b> -> on récupère tout le dernier triplet<br>
  - en commençant par <b>;</b> -> on récupère le sujet et la propriete<br>
  - en commençant par <b>,</b> -> on récupère seulement le dernier sujet
</p>
<p>
  ## Saisir une commande<br>
  - les commandes commencent par <b>/</b> -> exemple <b>/h</b> pour afficher l'aide
</p>

/C pour afficher un formulaire proposant les classes les plus courantes et un formulaire de saisi adapté à cette classe (foaf:Person, hola:Tension...)

# Polymer 2 cheatsheet
https://meowni.ca/posts/polymer-2-cheatsheet/

# Partager un fichier
- http://127.0.0.1:3000/?source=/exemple_files/Spoggy-Donner%20du%20sens%20%C3%A0%20l%27IA_spoggy_nodes_edges_1524152542056.json
- http://127.0.0.1:3000/?source=https://raw.githubusercontent.com/scenaristeur/heroku-spoggy/master/public/exemple_files/Spoggy-Donner%20du%20sens%20%C3%A0%20l%27IA_spoggy_nodes_edges_1524152542056.json



Spoggy facilite le stockage, la transmission, le partage des connaissances :
## entre humains

### mode solo

- j'ai une idee, je peux facilement la mettre en forme, comme une carte heuristique, l'enregistrer au format rdf ou turtle, l'exporter, la partager pour que d'autres puissent l'importer, la modifier, et la partager à nouveau.

## entre humains et machines
### Comment un 'robot', une voiture autonome, une machine ou encore un objet connecté pourraient-ils 'proteger les humains' s'il n'ont pas un minimum de connaissances de ce qu'est un être humain ?

- description d'un contexte, d'un lieu,
- possiblite d'inférence sur des graphes RDF, déduction d'information non contenues dans un graphe en fonction de règles.



- [plus d'infos sur le wiki Spoggy](https://github.com/scenaristeur/heroku-spoggy/wiki)


# TODO : tous les modules sont implémentés : graphe, socket, chat, levelgraph, connection endpoint fuseki, inférence y'a plus qu'à les remettre en ordre ;-)

#Installation et Lancement de SPOGGY en local :
nécessite nodejs > 6.2
```
git clone https://github.com/scenaristeur/heroku-spoggy.git
cd heroku-spoggy
npm install && cd public && bower install
cd ..
node .

```
votre spoggy devrait alors être accessible à l'adresse [http://127.0.0.1:3000](http://127.0.0.1:3000)


# la suite était présente dans les anciennes versions (dossier archive) et est à réinitégrer dans la nouvelle

# commandes disponibles :
Import : commande /i

Export : commande /e



[exemples de fichiers exportés depuis spoggy](https://github.com/scenaristeur/smag0-connaissance/tree/master/meet-up_conf)

pour les consulter, vous pouvez utiliser passer la source en paramètre, comme dans l'exemple ci -dessous :
[https://spoggy.herokuapp.com/?source=https://raw.githubusercontent.com/scenaristeur/smag0-connaissance/master/meet-up_conf/de_OWL_a_Fameus_spoggy_nodes_edges_1511030598081.json](https://spoggy.herokuapp.com/?source=https://raw.githubusercontent.com/scenaristeur/smag0-connaissance/master/meet-up_conf/de_OWL_a_Fameus_spoggy_nodes_edges_1511030598081.json)




# spoggy en local : (en cours)
télécharger et décompresser apache-jena-fuseki-3.6.0

[http://jena.apache.org/documentation/fuseki2/](http://jena.apache.org/documentation/fuseki2/)

lancement :
création d'un dossier data/DEFAUT,
puis
fuseki-server --update --loc=data/DEFAUT /ds
--> update = maj possible,
--> --loc = persistant
--> serveur accessible sur http://127.0.0.1:3030

FAQ :
si pb space object map ,
java -Xmx1024M -jar fuseki-server.jar %*
@java -Xmx1200M -jar fuseki-server.jar %*


    "evejs": "^0.5.0",
