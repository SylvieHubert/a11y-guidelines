# WWDC 2019 : Large Content Viewer

<script>$(document).ready(function () {
    setBreadcrumb([{"label":"iOS", "url": "./criteria-ios.html"},
                   {"label":"WWDC", "url": "./criteria-ios-wwdc.html"},
                   {"label":"2019 - Large Content Viewer"}
	]);
    addSubMenu([
        {"label":"Critères de conception","url":"criteria-ios-conception.html"}, 
        {"label":"Guide pour les développeurs","url":"criteria-ios-dev.html"},
        {"label":"VoiceOver","url":"lecteur-ecran-voiceover.html"},
        {"label":"WWDC","url":"criteria-ios-wwdc.html"},
        {"label":"Tests","url":"criteria-ios-test.html"}
    ]);
});</script>

<span data-menuitem="criteria-ios"></span>

Cette présentation visualisable sur le **site développeur officiel d'<span lang="en">Apple</span>** ([session 261](https://developer.apple.com/videos/play/wwdc2019/261/)) détaille les nouveautés iOS&nbsp;13 de la fonctionnalité **<span lang="en">Large&nbsp;Content&nbsp;Viewer</span>** utilisée par les personnes souhaitant visualiser l'écran avec une taille de police personnalisée et implémentée de concert avec le **<span lang="en">Dynamic&nbsp;Type</span>** depuis iOS&nbsp;11.
</br><img style="max-width: 700px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261.png" />
</br></br>Les thèmes abordés ainsi que leur référence temporelle au sein de la vidéo sont décrits ci-dessous :

- [Dynamic Type](#DynamicType) (00:57)
- [Large Content Viewer](#LargeContentViewer) (01:54)
- [Images](#ImageSettings) (04:02)
- [Custom Views](#CustomViews) (04:52) ⟹ **nouveauté iOS 13**
- [Exemples](#Examples) (09:15)

Par la suite, selon la configuration de la présentation, le fait de cliquer sur un titre ou un temps indiqué permet d'ouvrir la vidéo <span lang="en">Apple</span> directement au moment spécifié.
</br></br>
<a name="DynamicType"></a>
## [Dynamic Type (00:57)](https://developer.apple.com/videos/play/wwdc2019/261/?time=57)
Petit rappel sur la fonctionnalité <span lang="en">Dynamic&nbsp;Type</span> dont le but est de **permettre l'adaptation graphique à la taille des polices** modifiable dans les réglages utilisateurs
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-DynamicType.png" />
</br>Une explication détaillée de l'implémentation de cette fonctionnalité est disponible dans la partie [guide pour les développeurs](./criteria-ios-dev.html#taille-des-textes).
</br></br></br>
<a name="LargeContentViewer"></a>
## [Large Content Viewer (01:54)](https://developer.apple.com/videos/play/wwdc2019/261/?time=114)
Cette fonctionnalité iOS&nbsp;11 **disponible uniquement quand l'option `Tailles de police plus grandes` est activée** permet de rendre très efficace le grossissement des éléments de barres *(navigation, onglets...)* pour les personnes souhaitant grossir la taille des polices à l'aide du <span lang="en">Dynamic&nbsp;Type</span>.
</br><img style="max-width: 350px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-LargeContentViewer_1.png" />
</br>Le déclenchement de cette fonctionnalité s'effectue par un **appui long** sur l'élément concerné que l'on peut **laisser glisser** sur les éléments voisins pour les grossir à leur tour et finalement activer celui sur lequel on **relève le doigt de l'écran**.
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-LargeContentViewer_2.png" />
</br></br>Il est très important d'avoir à l'esprit que les modifications de taille liées au <span lang="en">Dynamic&nbsp;Type</span> doivent toujours être implémentées de façon **P.R.I.O.R.I.T.A.I.R.E.** : le <span lang="en">Large&nbsp;Content&nbsp;Viewer</span> n'est à utiliser qu'à partir du moment où **l'élément graphique impacté ne peut pas répondre aux changements souhaités**.
</br></br></br>
<a name="ImageSettings"></a>
## [Images (04:02)](https://developer.apple.com/videos/play/wwdc2019/261/?time=242)
Dans cette partie de la vidéo, toutes les caractéristiques des images à importer sont passées en revue pour obtenir une excellente définition du rendu après grossissement comme détaillé dans la partie [guide pour les développeurs](./criteria-ios-dev.html#taille-des-l-ments-graphiques).
</br></br>L'interface graphique de Xcode peut être utilisée conjointement à du code pour obtenir le résultat escompté :
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-ImageSettings.png" />
</br></br></br>
<a name="CustomViews"></a>
## [Custom Views (04:52)](https://developer.apple.com/videos/play/wwdc2019/261/?time=292)
En implémentant le <span lang="en">Dynamic&nbsp;Type</span>, **iOS&nbsp;13** rend possible un **même rendu graphique** pour un élément standard UIKit d'une barre *(navigation, onglets...)* et pour une UIView en suivant les étapes ci-dessous :
</br><img style="max-width: 650px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_1.png" />
</br>Le **protocole `UILargeContentViewerItem`** (<a alt="Lien vers l'extrait vidéo au temps indiqué." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=335">05:35</a>) définit toutes les informations nécessaires au <span lang="en">Large&nbsp;Content&nbsp;Viewer</span> ⟹ la classe **UIView se conforme à ce protocole** par défaut :
</br><img style="max-width: 650px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_2.png" />
</br></br>L'ajout d'une interaction tactile (<a alt="Lien vers l'extrait vidéo au temps indiqué." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=412">06:52</a>) est aussi nécessaire pour finaliser l'implémentation de cette fonctionnalité&nbsp;:
</br><img style="max-width: 850px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_3.png" />
</br></br>Quelques propriétés liées à cette interaction tactile (<a alt="Lien vers l'extrait vidéo au temps indiqué." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=431">07:11</a>) permettent d'obtenir et/ou de définir certains types de détails :
</br><img style="max-width: 750px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_4.png" />
</br></br>Pour finir, le `delegate` de cette interaction tactile contient un ensemble d'options (<a alt="Lien vers l'extrait vidéo au temps indiqué." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=472">07:52</a>) qui permettent de réaliser certaines actions :
</br><img style="max-width: 850px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_5.png" />
</br></br></br>
<a name="Examples"></a>
## [Exemples (09:15)](https://developer.apple.com/videos/play/wwdc2019/261/?time=555)
Le premier exemple concerne les **éléments UIKit standards** :
</br><img style="max-width: 600px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-Examples_1.png" />
</br></br>Le second exemple traite de **classes personnalisées pour des boutons** (<a alt="Lien vers l'extrait vidéo au temps indiqué." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=593">09:53</a>) dont certaines propriétés doivent être redéfinies pour une parfaite implémentation du <span lang="en">Large&nbsp;Content&nbsp;Viewer</span> :
</br><img style="max-width: 600px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-Examples_2.png" />
</br></br>Enfin, le dernier exemple détaille les modifications à apporter à un **bouton ayant déjà une action prévue suite à un appui long** (<a alt="Lien vers l'extrait vidéo au temps indiqué." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=636">10:36</a>) pour ne pas avoir de conflit avec le <span lang="en">Large&nbsp;Content&nbsp;Viewer</span>.
</br></br></br>
<!--  This file is part of a11y-guidelines | Our vision of mobile & web accessibility guidelines and best practices, with valid/invalid examples.
 Copyright (C) 2016  Orange SA
 See the Creative Commons Legal Code Attribution-ShareAlike 3.0 Unported License for more details (LICENSE file). -->