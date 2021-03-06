# WWDC 2017 : Building Apps with Dynamic Type

<script>$(document).ready(function () {
    setBreadcrumb([{"label":"iOS","url":"mobile-ios.html"},
                   {"label":"WWDC","url":"dev-ios-wwdc.html"},
                   {"label":"2017 - Building Apps with Dynamic Type"}]);
    addSubMenu([
        {"label":"Design criteria","url":"criteria-ios.html"}, 
        {"label":"Developers guide","url":"dev-ios.html"},
        {"label":"VoiceOver","url":"voiceover.html"},
        {"label":"WWDC","url":"dev-ios-wwdc.html"},
        {"label":"Tests","url":"criteria-ios-test.html"}
    ]);        
});</script>

<span data-menuitem="mobile-ios"></span>

This video available on the **official Apple website** ([session 245](https://developer.apple.com/videos/play/wwdc2017/245/)) aims at defining what `Dynamic Type` is, based on good practice implementation.
</br><img style="max-width: 200px; height: auto;" alt="" src="./images/iOSdev/wwdc17-logo.png" />
<img style="max-width: 700px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245.png" />
</br></br>Various contents and their video timelapse are indicated hereunder :
- [Text styles](#TextStyles) (06:06) ⟹ **iOS 11 upgrade**
- [Custom fonts](#CustomFonts) (08:17) ⟹ **iOS 11 new feature**
- [Web views](#WebViews) (09:25)
- [Wrap to multiple lines](#WrapToMultipleLines) (10:14)
- [Auto layout system spacing constraints](#AutoLayoutSystemSpacingConstraints) (11:31)
- [Scaled values](#ScaledValue) (12:56) ⟹ **iOS 11 new feature**
- [Side-by-side text](#SideBySideText) (13:36)
- [PreferredContentSizeCategory](#PreferredContentSizeCategory) (15:23)
- [Table view cells](#TableViewCells) (16:38)
- [Images](#Images) (20:13)
- [Example](#Demo) (24:32)

Thereafter, the selection of a title will give rise to the video playback on the Apple website directly at the proper moment.

<a name="TextStyles"></a>
### [Text styles (06:06)](https://developer.apple.com/videos/play/wwdc2017/245/?time=366)
**All the text styles can have the 5 accessibility sizes** in iOS 11 whereas it was only the case for the *body* text style before.
</br>In the Xcode Interface Builder, just indicate the style in the Attribute Inspector part and tick `Dynamic Type` to adjust the text size to the device settings.
</br><img style="max-width: 1000px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-TextStyle_1.png" />
</br>Get the exact same result with the following code :
</br><img style="max-width: 500px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-TextStyle_2.png" />

<a name="CustomFonts"></a>
### [Custom fonts (08:17)](https://developer.apple.com/videos/play/wwdc2017/245/?time=497)
The new iOS 11 class `UIFontMetrics` allows a custom font to be automatically adjusted.
</br><img style="max-width: 750px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-CustomFonts.png" />

<a name="WebViews"></a>
### [Web views (09:25)](https://developer.apple.com/videos/play/wwdc2017/245/?time=565)
When a web view is used, the CSS may contain information about the text style to be displayed :
</br><img style="max-width: 600px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-WebViews.png" />

<a name="WrapToMultipleLines"></a>
### [Wrap to multiple lines (10:14)](https://developer.apple.com/videos/play/wwdc2017/245/?time=614)
When a `label` may be troncatured after adjustment, it's recommended to write `0` number of lines in the Attribute Inspector part of the Interface Builder that will be understood as no limit.
</br><img style="max-width: 1000px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-WrapToMultipleLines.png" />

<a name="AutoLayoutSystemSpacingConstraints"></a>
### [Auto layout system spacing constraints (11:31)](https://developer.apple.com/videos/play/wwdc2017/245/?time=691)
Using a baseline constraint between two labels, the good practice for `Dynamic Type` is not to put a constant value so as not to end up in the following situation :
</br><img style="max-width: 450px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-AutoLayoutsystemSpacingConstraints_1.png" />
</br>The baseline contraint `Standard Value` in Interface Builder or a programmatic solution using  `constraintEqualToSystemSpacingBelow` (iOS 11 feature) will lead to an overcome situation.
</br><img style="max-width: 650px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-AutoLayoutsystemSpacingConstraints_2.png" />

<a name="ScaledValue"></a>
### [Scaled values (12:56)](https://developer.apple.com/videos/play/wwdc2017/245/?time=776)
The new **scaledValue** method provides the height of a graphical element containing text whose size may automacally grow or shrink.
</br><img style="max-width: 700px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-ScaledValue.png" />
</br>This might be useful for a button whose background content must be updated after a font size modification for instance.

<a name="SideBySideText"></a>
### [Side-by-side text (13:36)](https://developer.apple.com/videos/play/wwdc2017/245/?time=816)
Vertically nearby labeled elements may become unreadable or may worsen the graphical interface at a specific text size.
</br>In that case, it's highly recommended to update the alignment from horizontal to vertical once this size threshold is reached.
</br><img style="max-width: 700px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-SideBySideText.png" />

<a name="PreferredContentSizeCategory"></a>
### [PreferredContentSizeCategory (15:23)](https://developer.apple.com/videos/play/wwdc2017/245/?time=923)
**2 specific groups** gather all the possible text sizes :
- The first one contains the **7 basic thresholds** from `extraSmall` to `extraExtraExtraLarge`.
- The second one is **accessibility dedicated** and must be activated to be taken into account. It includes the **last 5 thresholds** from `accessibilityMedium` to `accessibilityExtraExtraExtraLarge`.

These values can be obtained from the view `traitCollection` or from the application **preferredContentSizeCategory** method.
</br><img style="max-width: 900px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-PreferredContentSizeCategory_1.png" />
</br>It's also possible to set conditions dealing with text sizing in order to rearrange graphical elements when necessary.
</br><img style="max-width: 650px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-PreferredContentSizeCategory_2.png" />

<a name="TableViewCells"></a>
### [Table view cells (16:38)](https://developer.apple.com/videos/play/wwdc2017/245/?time=998)
Standard table view cells content is automatically adjusted thanks to the [cell-sizing](https://developer.apple.com/videos/play/wwdc2017/245/?time=1058).
</br><img style="max-width: 600px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-TableViews_1.png" />
</br>Constraints must be adapted in case of custom cells in order to obtain the desired rendering and let the cell-sizing work.
</br><img style="max-width: 750px; height: auto;" alt="" src="./images/iOSdev/wwdc17-245-TableViews_2.png" />

<a name="Images"></a>
### [Images (20:13)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1213)
`Dynamic Type` allows image size adjustment for both views and tab bars as well.
</br>All the detailed explanations for this implementation can be found in the [development part](./dev-ios.html#graphical-elements-size).

<a name="Demo"></a>
### [Example (24:32)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1472)
During this presentation, some solutions for `Dynamic Type` pitfalls are suggested thanks to a simple application ([take a look at it](https://developer.apple.com/videos/play/wwdc2017/245/?time=1506) before reading what's next) :
- **Why doesn't my implemented `Dynamic Type` work** ?
[(26:19)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1579) (hint = `adjustsFontForContentSizeCategory` (code) or `Automatically Adjusts Font` (Attribute Inspector) + `scaledFont` if custom font is used)
- **How can I change items position to adapt text enlargement** ?
[(28:01)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1681) (hint = set up constraints for a vertical alignment + define these new constraints activation thanks to `preferredContentSizeCategory` + `traitCollectionDidChange` to be notified of a text size changing)
- **How to make my table view cells size to fit content** ?
[(31:03)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1863) (hint = `UITableViewAutomaticDimension` + `estimatedRowHeight`)
- **Why is there unscaled image size with the text enlargement** ?
[(32:11)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1931) (hint = `adjustsImageSizeForAccessibilityContentSizeCategory`)
- **Why have I unsmooth images when enlargement is set up** ?
[(33:07)](https://developer.apple.com/videos/play/wwdc2017/245/?time=1987) (hint = `Preserve Vector Data` in the Attribute Inspector of the .xcassets)
- **How can I check enlargement with accessibility inspector** ?
[(34:56)](https://developer.apple.com/videos/play/wwdc2017/245/?time=2096)

<!--  This file is part of a11y-guidelines | Our vision of mobile & web accessibility guidelines and best practices, with valid/invalid examples.
 Copyright (C) 2016  Orange SA
 See the Creative Commons Legal Code Attribution-ShareAlike 3.0 Unported License for more details (LICENSE file). -->