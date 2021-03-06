# WWDC 2019 : Large Content Viewer

<script>$(document).ready(function () {
    setBreadcrumb([{"label":"iOS","url":"mobile-ios.html"},
                   {"label":"WWDC","url":"dev-ios-wwdc.html"},
                   {"label":"2019 - Large Content Viewer"}
	]);
    addSubMenu([
        {"label":"Design criteria","url":"criteria-ios.html"}, 
        {"label":"Developers guide","url":"dev-ios.html"},
        {"label":"VoiceOver","url":"voiceover.html"},
        {"label":"WWDC","url":"dev-ios-wwdc.html"},
        {"label":"Tests","url":"criteria-ios-test.html"}
    ]);
});</script>

<span data-menuitem="mobile-ios"></span>

This video available on the **official Apple website** ([session 261](https://developer.apple.com/videos/play/wwdc2019/261/)) aims at highlighting the new iOS 13 features dealing with the **Large Content Viewer** implemented with the Dynamic Type accordingly since iOS 11.
</br><img style="max-width: 700px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261.png" />
</br></br>Various contents and their video timelapse are indicated hereunder:

- [Dynamic Type](#DynamicType) (00:57)
- [Large Content Viewer](#LargeContentViewer) (01:54)
- [Image settings](#ImageSettings) (04:02)
- [Custom Views](#CustomViews) (04:52) ⟹ **iOS 13 new feature**
- [Examples](#Examples) (09:15)

Thereafter, according to the presentation configuration, the selection of a title or a timelapse will give rise to the video playback on the Apple website directly at the appropriate moment.
</br></br>
<a name="DynamicType"></a>
## [Dynamic Type (00:57)](https://developer.apple.com/videos/play/wwdc2019/261/?time=57)
Reminder on the Dynamic Type feature whose goal is to **customize the text size** thanks to the user settings.
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-DynamicType.png" />
</br>The [iOS developers guide section](./dev-ios.html#text-size) of this site contains many useful information about the implementation of this feature.
</br></br></br>
<a name="LargeContentViewer"></a>
## [Large Content Viewer (01:54)](https://developer.apple.com/videos/play/wwdc2019/261/?time=114)
This feature introduced in iOS 11 and **available only for the accessibility text sizes** allows people with low vision to use UIKit bar elements as effective as the Dynamic Type grows the text size.
</br><img style="max-width: 350px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-LargeContentViewer_1.png" />
</br>To trigger this functionnality, the user must **long press** the element to see a larger version, **drag his finger along the bottom bar** to find out all the bar items and let it go to activate the proper one.
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-LargeContentViewer_2.png" />
</br>It's important to notice that **'scaling with Dynamic Type is always preferred to showing the Large Content Viewer'** that must be implemented **'only for the case when your custom UI cannot grow in size'**.
</br></br></br>
<a name="ImageSettings"></a>
## [Image settings (04:02)](https://developer.apple.com/videos/play/wwdc2019/261/?time=242)
In this part of the video, all the image characteristics are reviewed to get as smooth and detailed a rendering as possible when the image is getting larger, as indicated in the [iOS developers guide section](./dev-ios.html#graphical-elements-size).
</br></br>The Xcode Interface Builder can be associated to some lines of code for this purpose:
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-ImageSettings.png" />
</br></br></br>
<a name="CustomViews"></a>
## [Custom Views (04:52)](https://developer.apple.com/videos/play/wwdc2019/261/?time=292)
When implementing the Dynamic Type feature, **iOS 13** allows to **show the same UI that's shown for standard UIKit bar items** following the steps hereafter:
</br><img style="max-width: 650px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_1.png" />
</br>The **`UILargeContentViewerItem` protocol** (<a alt="Click to playback the video at the indicated time." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=335">05:35</a>) defines the needed information for the large content viewer and is **already implemented by the UIView class** that provides setters as well *(no need to subclass and override)*:
</br><img style="max-width: 650px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_2.png" />
</br></br>A gesture interaction must also be added (<a alt="Click to playback the video at the indicated time." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=412">06:52</a>) to finalize the large content viewer implementation:
</br><img style="max-width: 850px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_3.png" />
</br></br>Some properties are also bound to this interaction (<a alt="Click to playback the video at the indicated time." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=431">07:11</a>) to get and/or define more details:
</br><img style="max-width: 750px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_4.png" />
</br></br>Finally, the delegate of the gesture interaction contains some specific options (<a alt="Click to playback the video at the indicated time." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=472">07:52</a>) to provide custom actions:
</br><img style="max-width: 850px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-CustomViews_5.png" />
</br></br></br>
<a name="Examples"></a>
## [Examples (09:15)](https://developer.apple.com/videos/play/wwdc2019/261/?time=555)
The first example deals with **standard UIKit views**:
</br><img style="max-width: 600px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-Examples_1.png" />
</br></br>The second example takes into account **custom classes for some buttons** (<a alt="Click to playback the video at the indicated time." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=593">09:53</a>) whose properties must be overriden to be well defined:
</br><img style="max-width: 600px; height: auto;" alt="" src="./images/iOSdev/wwdc19-261-Examples_2.png" />
</br></br>The last example tackles a **button with an already existing long press action** (<a alt="Click to playback the video at the indicated time." href="https://developer.apple.com/videos/play/wwdc2019/261/?time=636">10:36</a>).
</br></br></br>
<!--  This file is part of a11y-guidelines | Our vision of mobile & web accessibility guidelines and best practices, with valid/invalid examples.
 Copyright (C) 2016  Orange SA
 See the Creative Commons Legal Code Attribution-ShareAlike 3.0 Unported License for more details (LICENSE file). -->