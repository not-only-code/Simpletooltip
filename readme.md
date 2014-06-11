#Simpletoolip
> _...is a Jquery plugin, thought to insert short tooltips to any element of your website more easily_  

![Simpletooltip logo](https://codingsomething.files.wordpress.com/2014/06/simpletooltip-logo.png?w=200&h=200)

## Table of contents
1. [Features](#features)
1. [Build](#build)
1. [Installation](#installation)
1. [Usage](#usage)
  1. [Using data attribute](#using-data-attribute)
  1. [Using JavaScript](#using-javascript)
1. [Options](#options)
  1. [Default options](#default-options)
  1. [Global options](#global-options)
1. [Positions](#positions)
1. [Themes](#themes)
  1. [Creating Themes](#creating-themes)
1. [Download](#download)
1. [Changelog](#changelog)



## Features

* minimal configuration
* highly customizable: options and themes
* no extra html structures, use "title" attribute
* 12 functional positions
* cross-browser
* lightweight: less than 7Kb

## Build

```
$ npm install
```

```
$ grunt
```

## Installation

Download the plugin and decompress files, put the folder **simpletooltip** in your tree project files, would be nice create a folder that contains it, for example **js** (/js/simpletooltip).

In the header of your document attach the scripts simpletooltip.min.css` and `simpletooltip.min.js`. Of course, you will need to load jQuery first:

```
<link rel="stylesheet" href="..../simpletooltip/dist/css/simpletooltip.min.css" media="screen" />

<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="..../simpletooltip/dist/js/simpletooltip.min.js"></script>
```


## Usage

To initialize the plugin you have 2 options:

### Using data attribute

First declare `data-simpletooltip="init"` in the html element, and complete the attribute `title`, that will be the content of the tooltip. The plugin will initialize automatically.

```
<h1 data-simpletooltip="init" title="This is a tooltip">This is a header</h1>
```

### Using JavaScript

You can use the jquery function `simpletooltip()` to initialize the plugin for one or more objects together. Remember the attribute `title must exist in each element.

```
<h1 title="This is a tooltip">This is a header</h1>

<script>
    jQuery(document).ready(function($) {
        $('h1').simpletooltip();
    });
</script>
```

Simpletooltip was thought for use small and descriptive texts in order to substitute the ugly yellow tooltip that browsers offers by default. Anyway, you can insert more complex content like linebreaks, lists, images, etc...

```
<h1 title="This is a tooltip">This is a header</h1>

<script>
    jQuery(document).ready(function($) {
        $('h1').simpletooltip();
    });
</script>
```

## Options

You can add some options to customize your tooltips. This options works in cascade, that means you can override them. Here, the priorities:

1. The [default options](#default-options) will be applied at first instance.
1. Your [global options](#global-options) will override the default ones.
1. Your [theme options](#themes) will override the global ones
1. All [data attributes](#custom-options) will override the rest.

### Default options


attribute          | description                                      | values                                                                                                                                 | default
-------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|----------
`position`         | position of tooltip in relation with the element | `top` `top-left` `left-top` `left` `left-bottom` `bottom-left` `bottom` `bottom-right` `right-bottom` `right` `right-top` `top-right`  | `top` 
`color`            | color of text inside the box                     | `#FFFFFF` / `'rgba(255, 255, 255, 0.5)'` / `'white'`                                                                                   | `#CCCCCC`
`background_color` | color of background of the box                   | `#000000` / `'rgba(0, 0, 0, 0.5)'` / `'black'`                                                                                         | `#222222`
`border_color`     | color of the box border                          | `#000000` / `'rgba(0, 0, 0, 0.5)'` / `'black'`                                                                                         | `#111111`
`border_width`     | width of box border (in pixels)                  | `4` / `4px` / `0` `'none'`                                                                                                             | `0`     
`arrow_width`      | size of the arrow (in pixels)                    | `6` / `6px`                                                                                                                            | `4px`     
`fade`             | animation when appears                           | `true` / `false`                                                                                                                       | `true`    
`max_width`        | limit of the box width                           | `200` / `'200px'`                                                                                                                      | `200px`  

### Global options

You can add it globally, witch affects all tooltips of your queried objects:

```
<script>
    jQuery(document).ready(function($) {
        $('.tooltip').simpletooltip({
            position: 'right',
            border_color: 'purple',
            color: '#FFFFFF',
            background_color: 'rgba(125,100,230, 0.5)',
            border_width: 4
        });
    });
</script>
```

### Custom options

Or be more specific and _override_ 1 option in 1 tooltip using _data_ attribute:

```
<h1 class="tooltip" data-simpletooltip-color="#FF0055">my title</h1>
```

## Positions

Simpletooltip has 12 funcional positions, by default goes on top position, but you can choose: `top`  `top-left`  `left-top`  `left`  `left-bottom`  `bottom-left`  `bottom`  `bottom-right`  `right-bottom`  `right`  `right-top`  `top-right.

To add the desired position, in that example we'will use attribute `data-simpletooltip-position.

```
<div class="simpletooltip" data-simpletooltip-position="right-top">right top</div>
```

## Themes

Themes are _packages of options_ you can set up in one place, Simpletooltip comes with 4 default themes, you can choose: `blue`  `white`  `dark`  `gray`.

To assign a `theme`, configure theme parameter with the theme name:

```
<img src="images/themesample-seablue.png" class="simpletooltip" data-simpletooltip-theme="blue" title="blue theme" />
```

Also you can extend it, imagine a blue theme without border:

```
<p data-simpletooltip="init" data-simpletooltip-theme="blue" data-simpletooltip-border-width="0" title="blue custom theme">blue theme customized<p>
```

### Creating Themes

Also you can create your own themes. Imagine you need to repeat continuously 2 schemes in your site and don't want to fill your html code with noisy variables inside data attributes. For that you can use themes attribute.

```
<script>
    jQuery(document).ready(function($) {
        $('.tooltip').simpletooltip({
            themes: {
                pink: {
                    color: 'red',
                    border_color: 'red',
                    background_color: 'pink',
                    border_width: 4
                },
                brazil: {
                    color: 'yellow',
                    background_color: 'green',
                    border_color: 'yellow',
                    border_width: 4
                }
            }
        });
    });
</script>
```

## Download

Download the plugin [here](https://github.com/not-only-code/Simpletooltip/zipball/master), also you can access to [GitHub repo](https://github.com/not-only-code/Simpletooltip).  
Contribute with ideas, new features, or bugs on [Github Issues](https://github.com/not-only-code/Simpletooltip/issues).  
If this plugin helped you, any [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MRNNVK3SDEQKN) will be wellcome.


## Changelog

**v1.3.0 (13.06.2014)**

* new: parameters. You can pass some parameters to adjust size, border, colors, animation, arrow size, etc.
* new: color schemes. 4 default configurations you can customize: dark, gray, white, blue. Add your own color scheme. 
* tweak: added npm, grunt and bower in order to automatize and build all scripts
* tweak: changed code structure, now based on prototypes.
* tweak: move from css to .less
* tweak: files restructured /src -> /dist
* tweak: new responsive project page (demo) with all new features documented.
* tweak: new logo design
* now available from [jQuery Plugins](http://plugins.jquery.com/)
* some bugfixes and performance issues solved.


**v1.2.0 (01.02.2011)**

* Simpletooltip Logo!
* new 4 color designs: seablue(default), pastelblue, darkgray, lightgray
* all new positions (top, top-right, right-top, right, right-bottom, bottom-right, bottom, bottom-left, left-bottom, left, left-top, top-left)
* new landmark icon design
* optimized code
* changed css structure
* added .js and .css compressed versions
* scrolling bugs fixed


**v1.1.0 (03.06.2010)**

* 7 new positions ( top , right-top , right , right-bottom , bottom, left-bottom, left, left-top) 
* icon markup in the target
* short delay to launch
* bugs fixed


**v1.0 (19.05.2010)**

* blue-white color version ( with fine shadow box css made)
* One position: top
* easy implementation only by css
* attribute "title" benefits
* crossbrowser compatible