---
title: "Reusable research Birds of a Feather session at Scipy 2023: Solutions and tools"
author: camgerlach
pub_date: 2024-03-14
category: News
tags: community, outreach, media, team
summary: The Spyder team and collaborators hosted a Birds of a Feather session at SciPy 2023, focused on moving beyond just scripts and notebooks toward truly reproducible, reusable research. Here, we share the tips, tools, platforms and strategies that participants offered to help achieve these goals.
---

The Spyder team and [collaborators](https://cfp.scipy.org/2023/speaker/SE7SNC/) hosted [a Birds of a Feather (BoF) session](https://cfp.scipy.org/2023/talk/LGZUNG/) at [SciPy 2023](https://www.scipy2023.scipy.org/), focused on moving beyond just scripts and notebooks toward truly reproducible, reusable research.
In [Part 1 of this two-part series](https://www.spyder-ide.org/blog/reusable-research-bof-scipy-2023/), we went over our motivation and goals for the session and the challenges that attendees brought up.
Now, we’ll review the tips, strategies, tools and platforms (including Spyder!) that participants shared as ways to address these obstacles.
We'd again like to thank [Juanita Gomez](https://cfp.scipy.org/2023/speaker/SE7SNC/) for helping organize the BoF, Hari for his hard work compiling a summary of the outcomes, and everyone for attending and sharing such great ideas and insights!

## Making notebooks more reusable

As far as reproducibility is concerned, it was brought up that it can be difficult to easily compare outputs between notebooks created by different researchers.
In response, one participant mentioned that VSCode recently made [an improvement](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_custom-notebook-diffing) to the notebook diff viewers to more easily show just the code changes.
However, users stressed that it was critical to be able to diff the actual notebook output, not just its contents, and expressed a desire for a tool to cover that aspect.

In response to these concerns, others responded that notebooks should not be considered a unit of reproducible research, which should instead be a complete software project, including notebooks or scripts, an environment/requirements file and a record of commands to run there.
They recommended the [8-levels of Reproducibility](https://www.anaconda.com/blog/8-levels-of-reproducibility) and [Conda Project](https://github.com/conda-incubator/conda-project) to help guide and implement this.

Additionally, attendees recommended [Papermill](https://papermill.readthedocs.io/en/latest/), describing it as a very useful tool for parameterizing and executing notebooks programmatically.
Others suggested [Devcontainers](https://containers.dev/), to allow collaborating with a lab group or team in a shared environment and seeing everything on their screen, as well as [Live Share in VSCode](https://code.visualstudio.com/learn/collaboration/live-share).

Participants also expressed frustration that despite notebooks being intended to make programming more literate, this often does not happen in practice.
Beginners like the interactivity in notebooks because they don't know how to use more advanced programming tools, but they don't always take advantage of their readability features.
To address this, attendees stressed the importance of getting users accustomed to best practices that can also be helpful for reproducibility.
A participant mentioned a ``nbflake8`` tool to lint notebooks, though it could not be easily found online, and others wished for a [Ruff implementation](https://github.com/astral-sh/ruff/issues/1218) (which at the time of this writing is [now complete](https://github.com/astral-sh/ruff/issues/5188)).


## Migrating notebooks to modules

As one participant put it, "I love notebooks, and also love modules, and love the flow of code from notebooks into modules once it approaches that point."
They went on to describe modules as a key unit of documented, tested code, but which doesn't mean a lot on its own, whereas combined with a notebook, it gives them context and meaning.
For communities that may be afraid of modules, the participant recommended trying to make creating and transitioning to them easier, so users have fully importable, reusable Python code.
For students, notebooks often turn into a fancy scratch pad or script file, and once they get stuff that works, they can move that stuff out into modules, and then the notebooks start to morph into examples and the history of what the work was about that can be interpreted by other researchers.

Other attendees chimed in with similar stories, with a NIST researcher mentioning this is an area they'd been working on for 10 years, with their approach being putting the stuff they want to be modular in a regular Python module, and then have a Jupyter notebook that shows an example using the code, such as in their [IPRPy project](https://github.com/usnistgov/iprPy).
To aid this process, participants suggested tools like the [Autodocstring extension in VSCode](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring) and the docstring generator built into [Spyder's editor](https://docs.spyder-ide.org/current/panes/editor.html) as great ways to reduce the friction for students when writing documentation, as they just add the triple quotes and the IDE generates a pre-filled docstring for them.

An important reproducibility and reusability tool many cited for this was [nbdev](https://github.com/fastai/nbdev), which can allow users to develop their code and let it grow, and then eventually export the parts as modules at the end.
According to attendees, its documentation mostly talks about everything as packages, but it can also be used for individual notebooks and modules.
Some participants were initially hesitant to show it to their students since they're early Python programmers, but it was actually quite easy for them, only requiring as little as one line of code at the end.
(Unfortunately as of this writing, it seems ndbdev development [has stalled](https://hamel.dev/blog/posts/nbdev/) due to its expected commercial opportunities not materializing.)
Others asked for more documentation resources for this, since they were still learning Python themselves and would like to learn more about this and teach it to their students.
In addition to this very blog post and guide, one attendee brought up that they did [a tutorial on that topic at SciPy](https://www.youtube.com/watch?v=l7zS8Ld4_iA), adding that the documentation is pretty intimidating but it would be great to have something more focused on smaller-scale usage.

As additional approaches, attendees mentioned they have their students use [Jupytext](https://jupytext.readthedocs.io/), which helps the student to convert notebooks to Python files that can be committed to a Git repository.
This allows the code to be committed as a Python file, while allowing Jupyter to open it as a notebook and continue working on it.
Others brought up [nb-convert](https://nbconvert.readthedocs.io/en/latest/index.html), a command line tool that can convert notebooks to many different formats including a Python script, which is integrated into IDEs like Spyder, and that there is also a [similar VSCode feature](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_export-your-jupyter-notebook).


## Enabling reusable Python packages

When it comes to overall workflow, all agreed that going from a script or notebook to a reusable, installable Python package could be a major challenge, especially for students and non-programmers.
Attendees from NASA mentioned that for their projects everything has to be documented, and one of the things they've struggled with was converting a notebook to the type of report NASA is typically looking for.
Others described their workflow being as simple and "old school" as writing a ``aaa_readme.txt`` file where they record a diary of what they were doing on that project so if they have a break working on it, they can go back to those notes and remind themselves.

To help address this, participants recommended a "really cool" [tool called "Show Your Work"](https://github.com/showyourwork/showyourwork) that comes out of the astrophysics community, which is primarily aimed at producing a paper at the end but also a Python package, and includes all the steps that show users' work along the way.
It is built around a tool called [Snakemake](https://snakemake.readthedocs.io/), which then sets up a template for both the Python package and the paper.
Additionally, attendees described it as having a "really helpful" guide for getting started and ensuring all of a user's projects have the same structure.
It was brought up that Azel Donath, maintainer of Gammapy and speaker at SciPy 2023, published [their Gammapy paper](https://arxiv.org/abs/2308.13584) by [using this tool](https://github.com/gammapy/gammapy-v1.0-paper).

As a followup, participants asked how this differed from [Quarto](https://quarto.org/), to which the response was that Quarto is much more general, whereas Show Your Work was specifically built to allow users to produce a PDF in LaTeX at the end.
Others mentioned [Duecredit](https://github.com/duecredit/duecredit/), a related tool for citing open source authors which looks at code and finds the authors (via Git commits) that wrote it.

Additionally, users expressed particular appreciation for the [Cookiecutter template](https://github.com/scientific-python/cookie) that [Henry Schreiner III](https://iscinumpy.dev/) has for packaging.
They mentioned that a lot of their workflows are just messing around with their data, and having something like a package structure from the get go helps make it easier to not miss things.
As a followup, a nuclear engineer mentioned they often have two week projects leveraging Jupyter at their center, with a cookiecutter template that has Sphinx, and a directory structure, and metadata that looks familiar and has everything set up by default.
They described how this particularly helps ensure that different colleagues and team members are on the same page with doing things.
Finally, others suggested the [data-driven Cookiecutter template](https://drivendata.github.io/cookiecutter-data-science/), which provides an ordered structure for where things go, what they are named and how they are run.

## Next steps

Now that we’ve gathered a wealth of community feedback, ideas and resources, we’re currently working to further translate these insights into an actionable guide (or series of such) on a community platform, to make it easier for everyone to apply them.
Keep an eye out for that, and until then, happy Spydering!
