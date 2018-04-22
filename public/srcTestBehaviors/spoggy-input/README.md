# \<spoggy-input\>




# SPOGGY INPUT
## Saisir un message pour le char
Un message pour le chat ne doit ni commencer par / , ; .
nii se terminer par , ; . sinon, il sera considéré comme un triplet

## Saisir un triplet au format Turtle
Une saisie qui ne se termine pas par . ou ; ou , n'est pas pris en compte comme un triplet
- David a man. -> triplet complet,
- David a man; -> indique de garder le sujet
- David a man, -> indique de garder sujet et propriete


## Récupérer le dernier triplet saisi
- en commençant par . -> on récupère tout le dernier triplet
- en commençant par ; -> on récupère le sujet et la propriete
- en commençant par , -> on récupère seulement le dernier sujet

## Saisir une commande
- le commandes commencent par / -> exemple /h pour afficher l'aide
