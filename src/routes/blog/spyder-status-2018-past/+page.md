---
title: "State of the Spyder, Part 1: Looking back"
pub_date: 2018-05-06
tags: development, status-update, milestone
category: Status
author: camgerlach
summary: In the first of a three part series, we look back at the major events, project changes, milestones, and progress over the past six months since our previous funding ended. We'll also go over funding and development stats and status up to the present.
---

As we approach some major development milestones, now is as good a time as ever to share with you some perspective on where we've been, what's happening now, and where we're going in the world of Spyder.
In this post, part one of a three part series, we'll take a look back over the past six months at some of the key events, accomplishments and challenges for Spyder and its community, and how that all leads up to where we are now.

Stay tuned right here, since part two will share several exciting announcements that affect the project (in a good way, we promise!) and its immediate future.
Even better, part three will formally announce the next Spyder 3 release and—what I'm sure you are all looking forward to—the plan for the first official Spyder 4 beta, plus our schedule and feature roadmap for Spyder 4 and beyond!


## A Call Answered

Starting off, as we announced back in mid-November, our funding from Anaconda, Inc was discontinued, leaving Spyder without formal institutional financial support.
As Spyder was, is and always will be a community-developed and supported IDE, this was far from a mortal blow to the project, but it did impact the pace and breadth of development.
Developer effort previously spent on our Spyder plugins, like [spyder-notebook](https://github.com/spyder-ide/spyder-notebook), [spyder-reports](https://github.com/spyder-ide/spyder-reports), and [spyder-terminal](https://github.com/spyder-ide/spyder-terminal), among others, was refocused on the Spyder core, and the development and release of Spyder 4 was put mostly on hold.
To help make up for the loss of funding, we appealed to the community for support, asking users who found Spyder valuable to back our project on [OpenCollective](https://opencollective.com/spyder), in order to accelerate development and fund more features for Spyder 4.

![Spyder OpenCollective, showing many donations and backers](spyder_opencollective.png)

To our unending gratitude, you responded! In the few months since then, we've gone from zero to a budget of well over $4500 per year and rising at an increasing pace, thanks to the continuing contributions of over 80 (and counting!) individual and institutional backers.
We also had several new core team members and community contributors pitch in to help carry the load, and we've got some more great news in the very next post on the funding front.
While we've got a ways to go to match the level of funding we've received under Anaconda, your support has helped make possible several of the new features we've planned for Spyder 4, and allow us to commit to releasing it much sooner than we would be able to otherwise.
Your generous donations go directly toward funding the Spyder community's most-requested new and improved features for Spyder 4, so keep them coming!
Stay tuned; we are considering rolling out new donation tiers and rewards at some point soon so you won't want to miss that.


## Development by the Numbers

On the development side of the project, while our overall pace is modestly lower than its peak under our Anaconda funding, we've been quite active fixing bugs and adding new features and enhancements over the past six months.
By the numbers, since mid-November, we've pushed approximately 1200 commits to ``master`` (Spyder 4), comprising over 37 000 lines added and 16 000 removed, and 900 commits to ``3.x`` (Spyder 3), with over 16 500 additions and 10 000 deletions.
Users have opened over 1375 issues (bugs, feature requests and other feedback), of which we've managed to resolve more than 1330, or nearly 97%.

![Github commit timeseries for Spyder, with high activity over the past few years](github_commit_history.png)

Further, over 250 pull requests from almost two dozen unique contributors, some old, some new, have been submitted since that time—fixing bugs, adding new or enhanced functionality, or making other improvements—of which 226 have been merged to the main Spyder codebase.
This work has coalesced into four separate official releases during that period, with another only days away.
Finally, we've recently blown past the 3000 Github stars milestone a few weeks ago (we're now at more than 3200), with almost 700 unique forks to date.


## Key Spyder Improvements

All those numbers are nice, but what matters most are the tangible improvements that you all get to use every day in your favorite IDE.
Over those same past six months, alongside hundreds of bugfixes and minor enhancements, we've made multiple significant improvements to the Spyder 3 Editor, IPython Console, Variable Explorer, and Find in Files tool, along with a number of others under the hood and to the application as a whole.
Even better, the majority of these were suggested by you, our users, and some of you even pitched in to help implement them.

Especially since you will probably be spending most of your time in it, we added a several new commands and functions to the **Editor** that will hopefully make your life easier, each with corresponding customizable shortcuts for easier access.
You can now insert a new line below the current one regardless of the cursor's current position with ``Ctrl-Shift-Enter``, and you can now use ``Shift-Delete`` to cut selected text, and ``Shift-Insert`` to paste it.
``Ctrl-PageUp``, ``Ctrl-PageDown``, and ``Ctrl-Tab`` shortcuts are all now fully configurable.
Finally, you can now easily ``Tab`` from the ``Find`` to the ``Replace`` box when open, and better yet your ``Find`` text is automatically copied to the ``Replace`` box to make modifications easier.

Second only to the Editor in terms of them most critical Spyder components, the **IPython Console** also got a lot of love in recent releases.
We've made several improvements to significantly improve the startup time, and added an optional feature to show the elapsed time each kernel has been running.
You can now remove all user-defined variables with a GUI command, and changes in ``import``ed modules now take effect instantly and automatically in the console, without even a re-``import`` needed.
``Cloudpickle`` is now used to serialize objects from the Console to the Variable Explorer, greatly improving the latter's capabilities (as discussed below).
Finally, Cython files are now automatically run in dedicated Cython consoles, and you can now use the edit magic command from the Console to open any file right inside Spyder's Editor.

![Variable Explorer, with a variety of array types displayed](varexp_array_display.png)

The **Variable Explorer**, which many of you cite as Spyder's "killer feature", has greatly improved as well.
Most notably, thanks to the aforementioned ``cloudpickle`` change, you now have access to rich, deep exploration of nearly any object, builtin or custom, and can traverse, view, and when possible even edit complex hierarchies of nested types with ease.
The Variable Explorer now fully supports ``Timedelta`` objects, both built-in and ``Pandas`` variants, allowing you to easily view and edit them just like ``datetime`` and ``Timestamp``.
It also now uses a "pretty", more human-readable format for dates, times, timedeltas and the like, and also now supports displaying a much wider range of ``Numpy`` array types.
As a quality of life change, it has much better handling of immutable types, like ``tuples``, clearly showing they can't be edited upfront and avoiding bothersome errors when trying to do so.

Rounding out the major changes, the **Find in Files** tool now allows you to remove items from the ``Search In`` list by hovering over them and pressing ``Delete``, and there's also a new option to clear all recent directories.
Under the hood, we've made ``PyQt5`` a dependency for easier, one-command installation and added many more tests and better project infrastructure to help catch errors.
To make things easier on you if something does go wrong, we've greatly improved the error reporting system, the UI/UX and the explanatory text to be more up to date, informative, and user friendly.

![New Spyder error report dialog, with more helpful UI text](error_report_dialog.png)

All of the mentioned additions are included in the latest released version of Spyder, 3.2.8, which you can update to with ``conda update spyder`` (if using Anaconda), with your package manager/distribution (if installed that way) or with ``pip update spyder`` (otherwise).
Even more are already implemented for our next release, due out in a week's time, and we'll have a preview of what to expect right here on the blog even sooner.


## Affiliated Project Progress

Outside the core Spyder IDE, while most plugins have been paused until the Spyder 4 release, work on other affiliated projects has continued. The new [spyder-unittest](https://github.com/spyder-ide/spyder-unittest) plugin has seen particularly active development, and lead developer and Spyder team member [Jitse Niesen](http://www1.maths.leeds.ac.uk/~jitse/) recently published a [tutorial on its use](https://www.spyder-ide.org/blog/introducing-unittest-plugin/).
Since November, it has gotten improved ``pytest`` support with realtime test results and click-to-open, better UI/UX, a robust communications backend (ZeroMQ), and numerous bug fixes and minor improvements.
[QtPy](https://github.com/spyder-ide/qtpy), another affiliated project which Spyder uses as its Qt GUI abstraction layer, has had three releases including one major, with new Qt classes, early support for ``PySide2``, better performance, and a number of bugfixes.

![Spyder-unittest dialog, displaying test results](spyder_unittest.png)

Other projects under the Spyder umbrella are also making major progress. The [pywinpty](https://github.com/spyder-ide/pywinpty) pseudo-terminal library has seen six official releases (three major), with a new rich high level interface to create and track processes, new process wrappers, Python 2.7 support, major performance, stability and security improvements, and many bug fixes.
Most importantly, we are proud to report that since this January Jupyter Notebook (in 5.3.0) and JupyterLab have both adopted it to create and manage system terminals on Windows!
The [qtsass](https://github.com/spyder-ide/qtsass) SASS to Qt stylesheet compiler has a new maintainer, with development including new dev infrastructure, refactoring work, a PyPI release, and new features, with more on the way.
Finally, our [loghub](https://github.com/spyder-ide/loghub) automatic changelog generator has seen significant internal and external developer interest, as well as three releases, bug fixes, additional examples, and the ability to group issues and PRs together if desired.
The common thread between all five of these projects has been a substantially increased development pace in recent weeks, so expect to see even more good news soon if that trend continues.


## Beyond the Code

The team has made progress on a number of fronts outside core program development.
We've been joined by several new team members from around the world, who have each contributed new skillsets to the project.
Further, we've created, developed and deployed a brand new, modern and responsive website and blog, to provide an accessible, central source for Spyder news and information for both newcomers and old hands alike, as you might have noticed :)

Our new, comprehensive [Troubleshooting Guide and FAQ](https://github.com/spyder-ide/spyder/wiki/Troubleshooting-Guide-and-FAQ) will help users easily resolve common issues without having to wait for a response from us, and we've revised and improved our Github issue tracking workflow to do an even better job at quickly responding to users' needs.
On top of that, our Readme, contributing guide, install docs, and developer wiki have all been thoroughly overhauled to make them more up to date, informative and accessible.
Finally, we've deepened our relationship with [NumFOCUS](https://www.numfocus.org/), integrating us more closely with the broader PyData community, as well as leading to some exciting news...but that will have to wait for our next post!

Until then, thanks for all you do for us and the community, and happy Spydering!
