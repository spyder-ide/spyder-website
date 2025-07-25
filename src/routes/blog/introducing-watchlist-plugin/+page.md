---
title: Introducing the Spyder-Watchlist plugin
author: rear1019
tags: plugin, watchlist, debugging
pub_date: 2022-11-18
summary: The third-party Spyder-Watchlist plugin is introduced, which can display and continually update the values of arbitrary, user-defined expressions while the debugger is active, and it's shown how to use this powerful tool for quickly exploring and debugging your code.
---

Spyder's Variable Explorer is a great tool which aids the development and debugging of Python code by displaying all variables from the current scope.
One thing the Variable Explorer is missing is the ability to display the value of arbitrary, user-definable expressions while debugging.
For example, it might be useful to see the value of a specific attribute of an object, or the value of an array at some index.
Such a feature is known as a "watchlist" or "watches" in other Integrated Development Environments (IDEs).
This blog post introduces the Watchlist plugin developed for Spyder.

## Features

The watchlist consists of a user-definable list of expressions.
They are evaluated after each debugger step, and the result of the evaluation is displayed as a string.
This means that `value = str(eval(expression))` is performed behind the scenes, and the result is shown in the plugin.
The watchlist is a very powerful tool, but this comes at a cost: Any side effect of an expression will affect the execution environment.

Expressions can be added, removed and modified at any time.
The value of an invalid expression is shown as `<exception name>`.
You can hover the mouse over the value to show the full exception message in a tooltip.
Values which have changed with the most recent debugger step are shown with a bold font, so you can recognise them more easily.

A picture is worth a thousand words, as they say, so here is a whole screencast of the Watchlist plugin in action:

<video controls>
  <source src="screencast.webm" type="video/webm">
  <source src="screencast.mp4" type="video/mp4">
  <track kind="captions">
  Sorry, your browser doesn’t support HTML5 video. Download the <a href="screencast.mp4">MP4 file</a>
</video>

## Installation and going forwards

For `conda` or `pip`-installed Spyder, the plugin can be installed by running the following with your Spyder environment activated:

```bash
pip install spyder-watchlist
```

Feel free to send your ideas, bug reports and pull requests to the [spyder-watchlist](https://github.com/procitec/spyder-watchlist) repository on GitHub.
