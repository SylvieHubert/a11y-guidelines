# Le test de l’accessibilité sous Android

<script>$(document).ready(function () {
    setBreadcrumb([{"label":"Critères incontournables sous Android", "url": "./criteria-android.html"},
        {"label":"Pour le test"}
	]);
    addSubMenu([
        {"label":"Critères de conception","url":"criteria-android-conception.html"},
        {"label":"Guide pour les développeurs","url":"criteria-android-dev.html"},
        {"label":"TalkBack","url":"screen-reader-talkback.html"},
        {"label":"Tests","url":"criteria-android-test.html", "expanded": true}
    ]);
});</script>

<span data-menuitem="criteria-android"></span>

Pour le web, le niveau d’accessibilité demandé à toute interface <abbr>HTML</abbr> par le groupe Orange est **le respect des critères du niveau AA des <span lang="en">Web Content Accessibility Guidelines</span> (<abbr>WCAG</abbr>) 2.1, sans point bloquant** suite à un test utilisateur d’aide technique pour les principaux scénarios d’utilisation des fonctionnalités du site ou de l’application. Pour les applications mobiles natives, une transposition de ces critères et le respect des recommandations de la plateforme Android en terme d’accessibilité est demandé.

Des recommandations pour le test de l’accessibilité sous Android sont décrites sur le site de la plateforme, voir ces [recommandations](https://developer.android.com/training/accessibility/testing).

L’objet de ces pages est de décrire les tests techniques et fonctionnels. Ces tests sont des pré-requis aux tests utilisateurs. 

Les tests d’accessibilité doivent être effectués tout au long du cycle de vie des projets :

* Au démarrage du projet, lors du choix du Framework, du logiciel ou progiciel…

* Dès la phase de conception sur les maquettes ou les prototypes lors des développements et des tests en production, pour les nouveaux contenus.

Dans l’idéal, les tests doivent être effectués sur des mobiles Android sans surcouche constructeur comme le Pixel. Ils doivent ensuite être réalisés sur les mobiles avec surcouche constructeur les plus utilisés par l’application.

Dans les premières versions des outils, il n’était pas possible d’en activer plusieurs en même temps. Au fil des versions, les outils se sont stabilisés et il est possible de les combiner pour vérifier plus de critères à la fois.

Pour tester l’accessibilité sur Android, il faut commencer par télécharger sur le [<span lang="en">Google Play</span>](https://play.google.com/store/apps?hl=fr), [<span lang="en">Android Accessibility Suite</span>](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback) et [<span lang="en">Accessibility Scanner</span>](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor).



## Accessibility Scanner

Le [scanner](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor) est téléchargeable sur le playstore.

Le scanner prend des captures d’écran de la page et vérifie :
* que l’écran contient des “vocalisations ou label” pour le lecteur d’écran,
* que les zones cliquables sont suffisamment grandes et qu’elles ont un label propre, 
* Les contrastes de couleur.

Attention, c’est une aide à la vérification, l’outil remonte parfois des faux positifs.

Certaines de ces vérifications font doublon avec `lint`.
En cas de doute sur les contrastes, [<span lang="en">Colour contrast analysor</span>](https://developer.paciellogroup.com/resources/contrastanalyser/) permet de faire un diagnostic plus précis.

Mode opératoire :
* Activer le scanner dans les **paramètres/accessibilité/Accessibility Scanner**. Cela affiche un bouton, “<span lang="en">floatting action button</span>” sur l’écran.
* Actioner le bouton sur les écrans à tester. Une capture d’écran est réalisée et la liste des suggestions de correction s’affiche.

## Agrandissement

Android propose plusieurs options d’agrandissement :
* Taille de la police
* Taille d’affichage
* Agrandissement (zoom)

Lire les instructions lors de l’activation des outils.

Positionner **Taille de la police** et **Taille d’affichage** au maximum. Parcourir l’application et noter les textes qui ne sont plus lisibles car ils ont disparu ou se chevauchent. 

Positionner **Agrandissement** sur **Utiliser le service**. Revenir à l’application, cliquer 3 fois sur l’écran. Vérifier que les écrans sont lisibles dans ce mode. Pour agrandir, placer 2 doigts sur l’écran puis écarter les, se déplacer avec deux doigts sur l’écran et un doigt dans certaines listes. Toutes les informations de l’écran doivent être lisibles en mode zoom.


## Lecteur d’écran

Le lecteur d’écran est un outil pour les personnes non voyantes et mal-voyantes. Il a deux fonctions, la vocalisation et la navigation dans l’écran. Tous les éléments signifiants doivent être vocalisés et dans un ordre logique.

Pour l’activation et l’utilisation du lecteur, voir la [section concernant <span lang="en">TalkBack</span>](./screen-reader-talkback.html).

La navigation peut être utilisée en :
- lecture automatique de la page ou lecture élément par élément, balayage au doigt vers la droite pour l’élément suivant (obligatoire)
- lecture par niveau : **Par défaut** (obligatoire), si l’application s’y prête, le mode **En-têtes** peut avoir de l’intérêt (page structurée à plusieurs niveaux), ou **Liens**, **Commandes**, **Mots**, **Paragraphes**.

Une option développeur (Paramètres / Accessibilité / Talkback / Paramètres / Paramètres du développeur / Afficher la sortie vocale) permet d’afficher à l’écran ce qui est vocalisé et ainsi de faire un rapport de bug plus facile. Lorsque Talkback est utilisé avec l’option activée, les vocalisations sont affichées en bas de l’écran (en sur-impression), il est donc possible d’en faire un screenshot. Il est néanmoins nécessaire d’écouter le rendu audible qui n’est pas toujours correct (comme certaines abréviations).

Parcourir l’application sur les scénarios utilisateurs et vérifier que toutes les informations sont vocalisées dans un ordre logique et compréhensible ainsi que :
- les actions associées (bouton, case à cocher… Appuyer deux fois pour activer),
- avec l’état des éléments (désactivé, coché…),
- les messages d’erreurs,
- les transitions entre les écrans,
- Les images signifiantes vocalisées, les images décoratives ignorées,
- Les titres des pages vocalisés,
- Pas d’élément fantôme,
- Les scrolls horizontaux vocalisés,
- les contenus dynamiques et les erreurs,
- les formulaires (compréhension des champs à remplir, des messages d’erreur),
- dans les vidéos, les boutons de contrôles de la vidéo.


Idéalement, le test peut se faire sans regarder l’écran, ou en activant l’écran noir (**Assombrir l’écran**).

## Navigation au focus (au clavier)

Pour cela, connecter un clavier d’ordinateur sur votre smartphone soit avec un adaptateur (USB - USB C par exemple) soit si le clavier est bluetooth, en appairant le clavier et le téléphone. Le clavier bluetooth a l’avantage de faciliter le débuggage.

La navigation dans une application ou une page web doit être possible à l’aide du clavier seul, notamment pour les personnes qui ne peuvent pas utiliser l’écran tactile. Il est important de vérifier son fonctionnement, car certains développements peuvent entraîner des difficultés pour naviguer correctement dans la page.
  
Parcourir l’application à l’aide du clavier, toutes les fonctionnalités doivent être accessibles.  

De plus le focus doit rester suffisamment visible sur chaque élément recevant ce focus (éléments activables, boutons, éléments cliquables, cases à cocher,…).

### Liste des raccourcis clavier principaux&nbsp;: 
* La touche **TAB :** pour faire avancer le focus.
* Les touches **maj+TAB :** pour faire reculer le focus.
* La touche entrée pour activer l’élément qui a le focus (lien, bouton, menu…).
* La barre espace pour cocher/décocher une case à cocher.
* Les flèches directionnelles pour modifier la sélection des boutons radio, pour se déplacer dans une liste déroulante, ou faire défiler les ascenseurs **scrollbar** ) lorsque ceux-ci sont présents.

Il s'agit des touches également utilisées pour tester l'accessibilité d'un site web, néanmoins un distingo moins strict est fait entre l’usage du Tab et des flèches ainsi qu’entre l’usage de la barre et la touche entrée : on considère le test comme réussi lorsqu’au moins l’un des deux permet de réaliser l’action.

Il est considéré comme bloquant l’impossibilité de sortir d’une fonctionnalité ou de l’application.

## Colour Contrast Analyser
Les contrastes de couleurs se vérifient sur les maquettes de l’application, ou via <span lang="en">Accessibility Scanner</span> sur un mobile Android. Si un doute subsiste, il est possible de faire un screenshot de l’application, puis de faire une vérification sur un ordinateur [Mesurer le niveau de contraste des couleurs](./methodes-outils-contrastes.html) via l'outil <span lang="en">Colour Contrast Analyser</span>.

Pour les valeurs à respecter voir la [section concernant les couleurs](./criteria-android-conception.html#couleurs).

## Autres outils - optionnels

### Sélectionner pour prononcer
**Sélectionner pour prononcer** est un outil intégré à l’[<span lang="en">Android Accessibility Suite</span>](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback) qui permet de lire certaines parties de l’écran qui sont sélectionnées. 

Lorsqu’un seul élément est sélectionné, il réalise la vocalisation de l’élément. Lorsque plusieurs éléments sont sélectionnés, il implémente un ordre logique de lecture comme **<span lang="en">Talkback</span>** mais il n’implémente pas les actions ni l’état des éléments.

Il est utile pour les malvoyants, lorsque l’écran n’est pas lisible, pour l’apprentissage de la lecture (fonctionne comme un karaoké), pour l’apprentissage d’une langue étrangère.

Il peut être utilisé dans un but de démonstration mais est redondant avec Talkback pour des tests d’accessibilité, sans pouvoir le remplacer.

### Voice Access
[Voice Access](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.voiceaccess) est une applicationl intégrée à [<span lang="en">Android Accessibility Suite</span>](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback), à destination des personnes présentant des troubles moteur. Elle permet de commander à la voix l’application à la place de l’écran tactile.


### Switch Access
**Switch Access** est une application à destination des personnes présentant des troubles moteur. Elle permet de contrôler le téléphone en programmant des touches. Elle pourrait remplacer la navigation clavier mais peut introduire des incompréhensions du fait de son paramétrage ou de l’application. Elle ne peut donc se substituer aux tests au clavier.



<!--  This file is part of a11y-guidelines | Our vision of mobile & web accessibility guidelines and best practices, with valid/invalid examples.
 Copyright (C) 2016  Orange SA
 See the Creative Commons Legal Code Attribution-ShareAlike 3.0 Unported License for more details (LICENSE file). -->