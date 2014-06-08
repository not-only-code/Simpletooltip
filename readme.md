#Simpletoolip

![Simpletooltip logo](https://codingsomething.files.wordpress.com/2012/06/simpletooltip-logo-cropped.png?w=200&h=200)
> _...is a Jquery plugin, thought to insert short tooltips to any element of your website more easily_

## Features

* Jquery based
* Minimal configuration
* 12 functional positions
* no extra html structures, use "title" attribute
* cross-browser
* lightweight and fast download, less than 8Kb

## Build

```
$ npm install
```

```
$ grunt
```

## Installation

Download the plugin and decompress files, put the folder `simpletooltip` in your tree project files, would be nice create a folder that contains it, for example js (/js/simpletooltip).

In the header of your document attach the scripts `simpletooltip.min.css` and `simpletooltip.min.js`, of course, you will need load jQuery first:

```
<link rel="stylesheet" href="..../simpletooltip/dist/css/simpletooltip.min.css" media="screen" />

<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="..../simpletooltip/dist/js/simpletooltip.min.js"></script>
```


Initialize the plugin, it will detect all tooltips marked in the page:

```
<script>
    jQuery(document).ready(function($) {
        $.simpletooltip();
    });
</script>
```


## Usage

You can use Simpletooltip in any element easily, first declare the class simpletooltip, and complete the attribute title, that will be tooltip content, for example:

```
<h1 class="simpletooltip" title="And this is his tooltip">_This is a page title</h1>
```

Simpletooltip is thought for use small and descriptive texts replacing the original yellow tooltip that browsers offers when we complete the attribute title. Anyway, you can insert content more complex like linebreaks, lists, images, etc...

```
<h1 class="simpletooltip" title="list options:<br /><ul><li>first option</li><li>second option</li><li>third option</li></ul>">lists</h1>
```


## Parameters

attribute          | description                                      | values                                                                                                                                               | default
-------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|----------
`position`         | position of tooltip in relation with the element | `top`, `top-left`, `left-top`, `left`, `left-bottom`, `bottom-left`, `bottom`, `bottom-right`, `right-bottom`, `right`, `right-top`, `top-right`     | `top` 
`color`            | color of text inside the box                     | hex `#FFFFFF`, rgba `'rgba(255, 255, 255, 0.5)'`, string `'white'`                                                                                   | `#CCCCCC`
`background_color` | color of background of the box                   | hex `#000000`, rgba `'rgba(0, 0, 0, 0.5)'`, string `'black'`                                                                                         | `#222222`
`border_color`     | color of the box border                          | hex `#000000`, rgba `'rgba(0, 0, 0, 0.5)'`, string `'black'`                                                                                         | `#111111`
`border_width`     | width of box border (in pixels)                  | number `4`, string `4px`, without border `0`, `'none'`                                                                                               | `4px`     
`arrow_width`      | size of the arrow (in pixels)                    | number `6`, string `6px`                                                                                                                             | `4px`     
`fade`             | animation when appears                           | `true`, `false`                                                                                                                                      | `true`    
`max_width`        | limit of the box width                           | number `200`, string `'200px'`                                                                                                                       | `200px`  



## Positioning

Simpletooltip has 12 funcional positions, by default is located on 'top' position, you can choose: top, top-left, left-top, left, left-bottom, bottom-left, bottom, bottom-right, right-bottom, right, right-top, top-right.

To add the desired position, add a `position` data attribute:

```
<div class="simpletooltip" data-simpletooltip-position="right-top">right top</div>
```


## Color Themes

Simpletooltip has 4 color themes, the default theme is seablue, you can choose: blue, gray, dark, white.

To add the desired theme, add a `theme` data attribute:

```
<img src="./images/themesample-seablue.png" class="simpletooltip" title="blue Theme" data-simpletooltip-theme="blue" />
```

## Download

You can download the plugin (zip format) [from here](https://github.com/not-only-code/Simpletooltip/zipball/master), anyway also you can access to GIT repo Contribute with your ideas, bugs, new features on [Git issues](https://github.com/not-only-code/Simpletooltip/issues). If this plugin helped you, also you can [donate](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MRNNVK3SDEQKN), thank you very much.

## Changelog

### v1.3.0 (15.06.2014)

* added grunt/npm install/compile system
* new: parameters. You can pass some parameters to adjust size, border, colors, animation, arrow size, etc.
* new: color schemes. 4 default configurations you can customize: dark, gray, white, blue. 
* tweak: arrow images are removed, now are css based
* tweak: change style system, use .less instead .css
* tweak: files restructured
* some bugfixes and code enhancements


### v1.2.0 (01.02.2011)

* Simpletooltip Logo!
* new 4 color designs: seablue(default), pastelblue, darkgray, lightgray
* all new positions (top, top-right, right-top, right, right-bottom, bottom-right, bottom, bottom-left, left-bottom, left, left-top, top-left)
* new landmark icon design
* optimized code
* changed css structure
* added .js and .css compressed versions
* scrolling bugs fixed


### v1.1.0 (03.06.2010)

* 7 new positions ( top , right-top , right , right-bottom , bottom, left-bottom, left, left-top) 
* icon markup in the target
* short delay to launch
* bugs fixed


### v1.0 (19.05.2010)

* blue-white color version ( with fine shadow box css made)
* One position: top
* easy implementation only by css
* attribute "title" benefits
* crossbrowser compatible