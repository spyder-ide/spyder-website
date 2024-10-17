---
title: Officially announcing the release of Spyder 6!
author: camgerlach
tags: Release-Announcement
category: Releases
pub_date: 2024-10-17
summary: After two years in development and more than 2600 commits from over two dozen authors around the world, Spyder 6.0.0 had its stable release on September 3, 2024! Now that 6.0.1 is out and the dust has settled, we'd like to formally announce the release here, thank those who've contributed to it, and introduce a series of posts highlighting its major new features and improvements that haven't already been showcased here.
---

After two years in development and more than 2600 commits from over two dozen authors around the world, [Spyder 6.0.0](https://github.com/spyder-ide/spyder/releases/tag/v6.0.0) had its stable release on September 3, 2024!
Now that [6.0.1 is out](https://github.com/spyder-ide/spyder/releases/tag/v6.0.1) and the dust has settled, we'd like to formally announce the release here, summarize the major changes, thank those who've contributed to it, and introduce a series of posts highlighting its biggest new features and improvements.

You can [download the latest installer on our website](/download) (recommended), or you can also install this version via [a variety of other methods](https://docs.spyder-ide.org/installation.html), including Conda and Conda distributions, Pip, WinPython, OS and distro package managers, from source and GitHub and more.
We can't wait for you to try Spyder 6.0 if you haven't already, and to find out more about what we're excited about, read on!


## Highlights and new features

This new release comes with a lengthy list of user-requested features that improve both Spyder's interactive computing facilities and its software development capabilities, along with many UI and usability enhancements.
Additionally, it completes the migration process to the new plugin API introduced in Spyder 5 and adds further new features for Spyder plugin developers, allowing them to build even more powerful extensions for our beloved IDE.
Overall, over two dozen contributors made more than 2600 commits and contributed 312 pull requests closing 137 unique issues, adding or modifying approximately 200 000 lines of code across 900 files.
We're excited that in less than a month and a half since being published, just our new standalone installers for Spyder 6.0.0 and 6.0.1 have been downloaded over 350 000 times across Windows, Mac and Linux!

We'll have followup blogs by each of our team members highlighting the biggest improvements, including among others our new remote development architecture, UI/UX improvements, updated plugins, and a new website, docs site and translations, in addition to [Ryan's existing post](../cbi-installers) on the Conda-based installers/updaters.
Keep an eye out for those in the coming weeks!

In the meantime, here's a summary of what's new in the Spyder 6 release! Check out the [Spyder 6 Changelog](https://github.com/spyder-ide/spyder/blob/6.x/changelogs/Spyder-6.md#version-600-2024-09-03) for a complete list of new features, UI improvements, bug fixes, API changes and more.


### Major new features

* Initial support for connecting to remote workstations, cloud desktops, computing clusters and other severs via SSH, allowing automatically installing and starting a kernel and running code remotely (part of our [CZI grant](../czi-grant))
* [Conda-based installers](../cbi-installers) for Windows, macOS and Linux, with more convenient and robust updates, newer Python versions and opening the door to many future features
* A Debugger pane to explore the stack frame of the current debugging session, centralizing debugger functionality in one place, and including a new button to enter the debugger during the current execution


### Global enhancements

* Add ability to manage external plugins (e.g. Spyder-Notebook) in `Preferences > Plugins`
* The interface font used by the application is now configurable
* Support accepting Chinese, Japanese and Korean input on Linux
* Show intro message for panes that don't display content at startup
* Experimental support for Qt 6 and increase minimum version to Qt 5.15


### Editor and files

* Quick switcher (Ctrl/Cmd-P) can now browse and open files present in the current project
* Allow files to be opened in the Editor by pasting their path in the Working Directory toolbar item
* Allow copying the absolute and relative paths of the current file in the Editor tab context menu
* Improve performance in Projects when checking for filesystem changes


### IPython Console

* New submenu to start a new console in any registered Conda or Pyenv environment in one click
* Kernel restarts are now much faster
* Environment variables declared in `~/.bashrc` or `~/.zhrc` are now passed to the console


### Variable Explorer

* New refresh button for viewer windows to update the variables within them (at last!)
* All real number data types are now supported in the DataFrame viewer
* Add back ability to load HDF5 and Dicom files (removed in Spyder 5)
* Improve how options are displayed and handled in the different viewers
* New button to indicate when variables are being filtered


### Plots

* Plots pane is now used to display figures generated by the Variable Explorer
* Increase DPI of Matplotlib plots so they look better on high resolution screens
* Respect Matplotlib user settings configured outside Spyder
* Matplotlib backend and Python environment information now shown in the status bar


### Major plugin changes

* Add a Debugger plugin to centralize all functionality related to debugging
* Port the Editor to the new API introduced in Spyder 5, completing Spyder's migration of internal panes to fully modular plugins
* Generalize the Run plugin to support generic inputs and executors, allowing custom plugins to run specific files, cells and selections and display the results
* Add a Switcher plugin for the files and symbols switcher
* Add an External Terminal plugin to execute Python and Bash/Batch/PwSh files in a system terminal
* Declare a proper API for the Projects plugin.
* Move the former Breakpoints plugin's functionality to the new Debugger plugin


## A special thanks from Spyder

First and foremost, we'd like to thank _**YOU**_, our amazing Spyder users, for helping use, test, support, and contribute to Spyder!
Its because of you all, the members of this fantastic community, that we're motivated and able to keep making Spyder better for everyone!
We'd like to especially thank the many folks who financially support Spyder development via charitable donations through our [Open Collective page](https://opencollective.com/spyder).
If you like Spyder and would like to see it keep moving forward and and becoming even better, we appreciate whatever you are able to give, financially or otherwise.
If every ~~Wikipedia~~ Spyder user gave $1 per year, we would be able to cover our entire annual budget several times over, so every little bit helps!

Next, we'd like to give a round of applause to our many dedicated contributors who made significant code contributions to this release: [@AngelaRemolina](https://github.com/AngelaRemolina), [@Mte90](https://github.com/Mte90), [@dpturibio](https://github.com/dpturibio), [@rear1019](https://github.com/rear1019), [@stevetracvc](https://github.com/stevetracvc), [@remisalmon](https://github.com/remisalmon), [@sthibaul](https://github.com/sthibaul), [@hmaarrfk](https://github.com/hmaarrfk), [@jnsebgosselin](https://github.com/jnsebgosselin), [@rhkarls](https://github.com/rhkarls), [@musicinmybrain](https://github.com/musicinmybrain), [@isabela-pf](https://github.com/isabela-pf), [@habibmy](https://github.com/habibmy), and [@kevinsmia1939](https://github.com/kevinsmia1939).
We also want to thank [our translators](https://crowdin.com/project/spyder/activity-stream), who make it possible to use Spyder in nearly a dozen different languages!

We'd also like to thank our other major fiscal sponsors, [NumFOCUS](https://numfocus.org/) and the [Chan Zuckerberg Initiative](https://chanzuckerberg.com/)!
NumFOCUS is a 501(c)3-registered charitable nonprofit that serves as the current home of the Spyder project along with the rest of the core PyData ecosystem.
We couldn't have gotten where we are now without their help, as well as their [Small Development Grants](https://numfocus.org/programs/small-development-grants) that helped fund a number of features in this release.
CZI has provided critical funding for Spyder 6, particularly the new remote development architecture, through a grant in Cycle 5 of its [Essential Open Source Software for Science program](https://chanzuckerberg.com/eoss/).

Finally, we'd like to extend personal thanks to our fellow current and former core developers and Spyder team members for their amazing efforts to make Spyder 6 possible!
In no particular order, and mentioning only the most prominent contribution of each person:

- [Ryan Clary](https://github.com/mrclary) created and maintains our brand new Conda-based installers and much of their related features and infrastructure
- [Jitse Niesen](https://github.com/jitseniesen) updated and improved many of our plugins for Spyder 6, including [Spyder-Notebook](https://github.com/spyder-ide/spyder-notebook), [Spyder-Unittest](https://github.com/spyder-ide/spyder-unittest) and [Spyder-Line-Profiler](https://github.com/spyder-ide/spyder-line-profiler)
- [Quentin Peter](https://github.com/impact27) created the new Debugger pane and improved the IPython Console and Spyder-Kernels
- [Daniel Althviz](https://github.com/dalthviz) served as Release Manager throughout the Spyder 6 cycle, ported the Editor to our new API and mentored Juan Sebastian
- [Juan Sebastian Bautista](https://github.com/jsbautista) made many UI/UX improvements to make Spyder's interface more user-friendly
- [Hendrik Louzada](https://github.com/hlouzada) created the backend for the whole remote development architecture
- [Edgar Margffoy](https://github.com/andfoy) and [Stephannie Jimenez](https://github.com/steff456) created a brand new, pluggable and configurable Run architecture for Spyder as well as several other major API/under the hood improvements
- [Andrés Montoya](https://github.com/conradolandia) helped improve the UI/UX, design and theming of Spyder 6 and created this brand new website for the project
- And of course, [Carlos Cordoba](https://github.com/ccordoba12) lead the project throughout the Spyder 6 development process, both managing and supporting the team as well as making innumerable contributions of his own

Three cheers for everyone who made Spyder 6 a reality!


## What's next

Spyder 6.0 will continue to receive point release updates with bug fixes and minor improvements, but we're already working on the next big release for Spyder, 6.1!
We currently are planning for it to be closer to a major release than a typical minor release, with a number of further new features and enhancements building directly on the groundwork introduced in Spyder 6.0.
Our plans and the specific features are likely to evolve as we get closer to release, so stay tuned to this blog and [@Spyder_IDE on Twitter/X](https://x.com/Spyder_IDE) for updates.
However, some of the biggest new features we hope to bring you include:

- Major improvements to the remote development platform first introduced in 6.0, including the ability to easily open, manage and run remote files just as if you were working locally.
- A new built-in package and environment manager that'll let you create Conda environments (automatically linked to projects) and install packages right from the Spyder graphical interface, leveraging our existing Conda-based installers.
- A graphical Spyder plugin browser, allowing you to find, install and manage external plugins with one click in a standalone-installed Spyder.

Want to start using Spyder 6 right now?
The easiest way is by downloading our own installers for Windows, macOS and Linux [from our website](/download).
You can also [install it via a variety of other methods](https://docs.spyder-ide.org/installation.html), such as  Conda and Conda distributions, Pip, WinPython, OS and distro package managers and from source on GitHub.

Keep in mind that if you use our standalone installers and want to install your own Python packages not included with Spyder, for now you'll need to have another Python environment installed on your machine and select it in Spyder, if you don't have one already configured.
We have an FAQ entry on [how to install one](https://docs.spyder-ide.org/faq.html#using-packages-installer) that includes a short video tutorial and step by step instructions, as well as an entry on [connecting an existing environment](http://docs.spyder-ide.org/faq.html#using-existing-environment).

We hope you all enjoy the new features and improvements in Spyder 6, and as as always, happy Spydering!
