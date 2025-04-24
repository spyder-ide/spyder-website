const e=`page:
  title: Support us
  monthly: Monthly
  oneTime: One-time
  back: Back to list
  supporters: Total Supporters
  intro: |
    Our mission is to create and maintain **the best open source Python IDE** for scientists, engineers and data analysts that is both **powerful and easy to use**. Your donations sustain this effort and fund the features you're most interested in seeing in future versions. Would you give today?

    * All donations are stewarded by [NumFOCUS](https://numfocus.org/), a registered non-profit charitable organization.    
    * Spyder is a fully independent, community-developed project, unaffiliated with Anaconda or other commercial companies.

projects:
  - id: 0
    title: Support Spyder
    collected: Current balance
    separator: of
    intro: >-
      Do you want to support the Spyder project as a whole, with the money used where it is needed most? Donate here!
    content: |
      Spyder’s continued development and maintenance is made possible by you, our user community\\! Your contributions to Spyder as a whole have helped us fund developers, students and interns to contribute critical improvements, support key members of the team such as our web and interface designer, pay for critical web infrastructure, and fund outreach and community efforts to make sure we are doing the best we can to serve all of you!
    button:
      text: Support Spyder

  - id: 1
    title: Smarter code completion
    collected: Raised so far
    separator: of
    intro: >-
      Spyder’s code completions in the Editor have a lot of room for improvement, and we have a straightforward path forward to greatly enhance them. Help us make them world class!
    content: |
      Spyder's Editor would benefit greatly from a much needed overhaul to provide better code completions. With your support we'll able to:

      * Enhance our [current language server](https://github.com/python-lsp/python-lsp-server/) and/or use a more [powerful one](https://github.com/DetachHead/basedpyright) (similar to that used by VSCode) for completions.  
      * Connect the Editor to the IPython console to get completions and documentation from it in case they are not available through the language server.
    button:
      text: Support This Project

  - id: 2
    title: New Viewer pane
    collected: Raised so far
    separator: of
    intro: >-
      Popular plotting libraries such as Bokeh, Plotly or Altair currently only work in a notebook environment. A new Viewer pane would allow interacting with them right within Spyder, no notebook necessary.
    content: |
      Plotting libraries like Bokeh, Plotly or Altair and interfaces such as IPywidgets, Panel or Dash are currently only designed to work in a notebook environment. A new Viewer pane would address that by packaging the necessary Javascript libraries to display and interact with these types of content from within Spyder.

      This would both greatly improve the development and data analysis experience for Spyder users, and also enable wider adoption of these visualization tools outside of the confines of Jupyter notebooks.
    button:
      text: Support This Project

  - id: 3
    title: Supercharge syntax highlighting
    collected: Raised so far
    separator: of
    intro: >-
      Help us support enhanced and overhauled semantic syntax highlighting in the Editor, enabling function arguments, class and function names, and other special code snippets to be detected and styled. This would also lead to major improvements in Spyder’s Outline pane.
    content: |
      Full semantic syntax highlighting, the ability to color code according to its semantic role, is a long-standing feature request. Adding support for it would enable highlighting of function arguments, class/function names and other constructs in unique colors, which would greatly improve code readability.

      Additionally, it would allow for the Outline pane to be able to display much richer and more appropriate contents for each file, making navigation much easier.

      It has been challenging to implement this as the libraries Spyder has relied on for syntax detection and highlighting have not kept up with those used by many other editors. Your support would allow us to migrate to a modern, actively developed framework providing the same features you’ve come to expect in the most popular IDEs.
    button:
      text: Support This Project

  - id: 4
    title: Level-up the Variable Explorer
    collected: Raised so far
    separator: of
    intro: >-
      We'd like to add support for viewing custom objects/data types in the Variable Explorer without needing to install all of their corresponding libraries in Spyder’s application environment, as well as make saving and loading sessions much more robust.
    content: |
      The Variable Explorer is one of the most beloved panes in Spyder. However, to inspect any object of a custom class or data type, it needs to have the libraries used to create it installed in Spyder’s own application environment. This is impractical, could break Spyder, and is precluded by design with our recommended standalone installers.

      We'd like to address that by supporting a portable, streamlined method of object representation that is not limited by such a restriction. Alongside that, we’d also like to make saving and loading spydata files to restore your current session later more reliable and work on a wider variety of data types by using a more robust library for that task.
    button:
      text: Support This Project
`;export{e as default};
