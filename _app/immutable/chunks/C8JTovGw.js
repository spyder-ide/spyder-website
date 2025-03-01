const e=`- id: what-is-spyder-section
  title: The Spyder advantage
  extraContent:
    title: >-
      Get the ease of use of Jupyter along with many advanced features
      found in PyCharm and VSCode in a single programming environment

- id: interactive-section
  title: Interactive programming built in
  content:
    title: Works the way scientists do
    text: >-
      <p>Data analysts, scientists and engineers require a lot of
      experimentation, quick feedback and short iteration cycles
      while programming. Spyder was built from the ground up
      around that workflow.</p>
  tabs:
    - title: Variable Explorer
      content:
        videoCaption: Explore variables after execution
    - title: Help
      content:
        videoCaption: Get help for code you're working on with one click
    - title: Editor
      content:
        videoCaption: Run code in line by line or in sections called "cells"

- id: pydata-section
  title: Seamless integration with the PyData ecosystem
  content:
    title: A perfect fit with the most popular scientific libraries
    text: >-
      <p>Spyder includes out of the box integration with
      <a href="https://matplotlib.org/">Matplotlib</a>,
      <a href="https://pandas.pydata.org/">Pandas</a>
      and many other libraries to help you work more efficiently with them.</p>
  tabs:
    - title: Matplotlib
      content:
        text: Browse all your plots in a single place
        imgAlt: Spyder plots pane displaying a 3D visualization in the main panel, with options above for saving, zooming or removing it, and a right panel with thumbnails of other previous plots
    - title: Pandas
      content:
        text: Interact with the contents of your dataframes
        imgAlt: Spyder Variable Explorer pane showing a pandas dataframe containing weather observations in a "spreadsheet" style view, with multi-level index columns, per-column heatmaps and toolbar options for displaying and editing the data
    - title: Numpy
      content:
        text: Explore and edit multi-dimensional arrays
        imgAlt: Spyder Variable Explorer pane displaying a three-dimensional NumPy in a "spreadsheet" style view, with cell colors forming a heatmap of values and options to adjust the axis and index of the array slice
    - title: Conda
      content:
        text: Work with multiple environments at once
        imgAlt: Spyder Consoles menu with the "New console in environment" submenu selected, showing a listing of Conda environments by name, type and Python version
    - title: Sympy
      content:
        text: View rich symbolic expressions rendered with LaTeX
        imgAlt: Spyder's IPython Console pane, showing individual lines of code constructing SymPy expressions, and several complex symbolic formulas rendered inline in publication-style rich mathematical notation

- id: growth-section
  title: Ready to take you to the next level
  content:
    title: Make a bigger impact with reusable research
    text: >-
      <p>The software you write is critical for new scientific discoveries and engineering solutions. Spyder helps you move from single scripts to structured, reusable modules and packages without losing interactivity. It also includes powerful software development tools whenever you're ready for them.</p>
  tabs:
    - title: Developer tools
      content:
        text: Take advantage of real-time hints and help to improve your code
        imgAlt: Spyder Editor pane, with several real-time code analysis warnings shown on different lines and the affected code underlined. A hovered-over warning is showing its associated message, while the Source menu is open to the left showing the "Underline errors and warnings" option enabled
    - title: Projects
      content:
        text: Easily switch between projects and browse their files
        imgAlt: Spyder Editor pane showing the Projects pane to its left, listing the files and directories of a project in a tree-style layout
    - title: Code analysis
      content:
        text: Get in-depth insight on issues and improvements with your code
        imgAlt: Spyder Code Analysis pane showing the results for a file, including an overall score and a listing of errors, warnings, refactoring and convention issues; each has a name, code, line number and message
    - title: Code search
      content:
        text: Quickly find uses of a variable or word across files
        imgAlt: Spyder Find pane, showing an example search for a method name, buttons toggling search options, an exclude field listing various file extensions, a dropdown for search location and a count and list of results per-file, including the file name and path and the line, column and context for each result

- id: setup-section
  title: Simple install and update process
  content:
    title: Install with a single click and be productive right away
    text: <p>Spyder offers standalone installers to make it as easy and reliable as possible to get started and keep it up to date.</p>

- id: sponsors-section
  title: Sponsors
  content:
    title: Spyder is funded thanks to the generous support of
  extraContent:
    title: "and the donations we have received from our users around the world through Open Collective:"
  extraImageAlt: Donate to our project
  innerColumns:
    - imgAlt: Chan Zuckerberg Initiative logo
    - imgAlt: NumFocus logo

- id: learn-more-section
  innerColumns:
    - title: YouTube
      content: Learn more
    - title: Documentation
      content: Read the docs
    - title: GitHub
      content: Check out the source
    - title: Donations
      content: Show your support
`;export{e as default};
