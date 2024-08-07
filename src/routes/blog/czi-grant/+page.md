---
title: Spyder gets CZI grant to add remote development features, and a new job opening!
author: ccordoba12
pub_date: 2023-06-08
category: Announcement
tags: grant
summary: Spyder has received a two-year grant from the Chan Zuckerberg Initiative to add remote development capabilities to our beloved IDE. This means you'll be able to easily take advantage of the vast resources offered by HPC clusters or the cloud to execute your code, while working from the comfort of your personal computer. And if you're interested in helping us implement that, we may have just the job opportunity for you!
---

During the last few years, Spyder has positioned itself as a popular data science IDE by combining interactive computing and ease of use with robust programming tools.
However, limited remote development support compared to some other IDEs has hindered adoption, as many users would like to work with data and code on high performance computing (HPC) clusters or cloud providers like AWS, GCP or DigitalOcean while developing on their personal computers. Adding such features would open up many new research possibilities by enabling the scientific community to tackle data and compute-intensive programming tasks from the ease and efficiency of their local development environments. Thanks to a two-year grant from the [Chan Zuckerberg Initiative](https://chanzuckerberg.com/), we will be now able to address this shortcoming.

Right now, users have two main options to work remotely using a local IDE (aside from a purely web browser-based approach, which is sometimes not available or desirable):
They can either edit and execute their files in a terminal, which is not user-friendly; or start their IDE on the server and display it locally, which is typically slow, resource-intensive and difficult to set up. Furthermore, scientists typically find it difficult to sync remote files to the local machine and version control their code on the remote one, so remote changes are often lost, out of sync or difficult to integrate with code developed locally.

To address this situation, we will add and enhance support for local Spyder installations to run code and sync files on remote servers and clusters.
The first step in that direction is to enhance the existing remote code execution features in Spyder, as the current workflow is error-prone and quite cumbersome.
It requires users to install the Spyder-Kernels package on the remote machine, manually start a kernel on it and provide the kernel connection file to the local machine.

![Dialog to create a connection to a remote kernel](remote-kernel-connection.png)

Since Spyder does not currently have a way to identify and store state changes, users currently have to repeat this costly setup process if there are any configuration modifications on the remote machine. Our plan is to fully automate this procedure so that Spyder can start and connect to a remote kernel automatically, with the user only needing to provide their SSH credentials and specify the Python environment they want to use.

After that is implemented, we will add support to create and manage remote Python environments, explore the remote filesystem in the [Files pane](https://docs.spyder-ide.org/current/panes/fileexplorer.html), and edit remote files in the [Editor](https://docs.spyder-ide.org/current/panes/editor.html). This will make most of the core Spyder functionality work when developing code remotely. In addition, users will be able to easily start system shells connected to the server once we implement that capability in [Spyder-Terminal](https://github.com/spyder-ide/spyder-terminal). This will allow the remote execution of any operating system-level command or program, such as Git commit and push instructions.

Finally, we want to announce that we're hiring for this project! We are looking for a Python developer with solid networking knowledge to help us implement the backend infrastructure that will power the features described above. This is a part time position to work as a contractor through [NumFOCUS](https://numfocus.org/); it does not require experience with PyQt (although some would be beneficial) and it lasts until the end of the year, with the possibility to renew the contract for the next. Interested? [Contact me](mailto:ccordoba12@gmail.com) to talk more about it!

We hope you will be as thrilled as we are by this fantastic news, and are looking forward to sharing more with you on this project in the near future!
