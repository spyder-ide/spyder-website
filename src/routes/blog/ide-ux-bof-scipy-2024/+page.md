---
title: "Scientific IDE UX Birds of a Feather session at SciPy 2024"
author: camgerlach
pub_date: 2024-09-05
category: News
tags: community, outreach, media, team
summary: The Spyder team hosted a Birds of a Feather session at SciPy 2024, this time on the topic of users' experiences (good and bad) with the UI/UX of scientific interfaces and IDEs, and how their developers can better serve users. Here, we share what we learned from the session, as well as a link to the full detailed community notes.
---

The Spyder team hosted a Birds of a Feather (BoF) session, [What do you want to see from your scientific IDE?](https://cfp.scipy.org/2024/talk/VWMV7B/), at [SciPy 2024](https://www.scipy2024.scipy.org/).
The focus was on users' experiences, both positive and negative, with IDEs and other scientific interfaces, and how their developers (like us) can make them better for everyone.
We along with the community recorded [collaborative notes from the meeting](https://hackmd.io/@CAM-Gerlach/Scipy-2024-IDE-BoF), which you're welcome to check out for the full details!
Here, we'll focus on summarizing the points raised at the session and our insights from them.

Around 40 people attended, comprising a diverse mix between interface/IDE developers, users and external stakeholders.
In a brief, informal survey of the room, many hands went up when asked how many people used VSCode, and about as many for Jupyter. Perhaps a half dozen to a dozen identified as Spyder users, and a handful mentioned other IDEs and platforms, such as RStudio, PyCharm and Emacs.

In addition to myself, attending the session we had [Pierre Raybaut](https://pierreraybaut.github.io/), the original creator of Spyder (who also gave a great [talk on Spyder's history and his current work](https://www.youtube.com/watch?v=MKPUuV1LEqk)), as well as another former Spyder developer.
What's more, to our delight there were also multiple representatives from both [Posit/RStudio](https://posit.co/) and [Jupyter](https://jupyter.org/), perhaps the two other best known and most used interfaces aimed specifically at scientists and engineers.
We were hoping to have the discussion focus more broadly on many different IDEs and tools and to have leaders from other communities present to give their input as well, and it certainly did not disappoint.


## Generative AI in scientific research

Unsurprisingly given its recent surge in popularity in the programming world, generative AI, the challenges it faces and how and whether IDEs should offer it was a popular topic of discussion.

Participants empathized that scientific coding is different from other forms of programming, and that the "Copilots of the world" may not help with the former.
Indeed, they would not necessarily be expected to assist with properly designing valid digital experiments, correctly implementing appropriate scientific algorithms, ensuring the analysis techniques used are valid for the data, and choosing appropriate metrics and statistics to  interpret the results.
Rather, unless both specifically trained and high performing in these tasks, they may lull newer students or even veteran PIs into a false sense of security in code that ultimately outputs subtly invalid results, feeding the present reproducibility crisis.

Attendees also commented that LLMs, particularly general-purpose examples like ChatGPT, generated code that breaks "a lot" when actually used.
This has also been the author's experience, particularly with systems not specialized in actually generating correct, best-practice code, and is also supported by research in the literature.
In response to the question one participant posed to the room, as to whether there are any LLMs that work well out of the box for scientific programming, only silence was the answer.

However, it was also mentioned that specialized systems can be quite helpful, with a particularly high amount of interest in GitHub Copilot.
We mentioned that we are currently working with GitHub and others about a potential optional integration in Spyder, specialized for scientific tasks.

One participant shared that their large scientific organization was very reticent to use Jupyter AI because it was effectively a blackbox, and they needed to be able to show where their code comes from.
They expressed the desire for an AI that generates citations, to help address this issue.
Responding to their question of whether others were interested in the same, attendees stated that they'd still need to go and verify the generated citation, and were unsure it would save them much time overall.
Another participant added that more so than citations for code, the most important thing AI would help with is tests that verify that the code does what it is supposed to do.
Others agreed, saying that AI tend to do much better iterating on existing code than writing brand new code, and recommended that people try asking LLMs to write tests for existing code and examining the results.
They also found that AIs tend to do much better on code that has proper variable names and literate structure, which is certainly a benefit to everyone but very much not always found in scientific scripts.

Overall, attitudes in the room toward LLMs and generative AI varied quite a bit, but there was a general consensus that while scientists were open to considering the technology as an aid, it had to be reasonably correct and verifiable, which is a rather difficult challenge for the current AI state of the art.


## Interactive computation with diverse data types

Another common theme was a desire for scientific IDEs to allow users to visualize and interact with more of the diverse array of data types and structures used in scientific computation.

One participant in the geospatial field mentioned that interactivity with these data is limited with IDEs, and that they generally like notebooks but there are workflows where an IDE would be nice.
THey also expressed a desire for IDEs having native support for interactive map displays like in QGIS or ArcGIS rather than just static Matplolib images, which would make for more rapid prototyping.

Another attendee shared their focus on using dataframes and other rich data structures backed by a database instead of instead of just plain CSVs, asking if IDEs can add a "database browser" instead of just a way to view a single Pandas table.
They described how their data lives in databases, possibly remote or in the cloud, rather than flat files on their filesystem, and have made this the norm at their institution.
Their solution supports any database type that pandas does, with the simplest interface to it, so it feels like a CSV file, and would like IDEs to support that workflow.
In response, an audience member following on Slack mentioned that Ibis covers a lot of territory for exploring tabular data in many different data storage backends, and this might be a path to database exploration in IDEs.

Other participants shared their challenges when debugging large datasets, saying this led to slow stepping through the code (of around 30 seconds per step) when a very large variable needs to be refetched at every step.
This, they related, resulted from a lack of a facility to do "lazy data loading" in Python; everything needs a wrapper.
They'd like to see a streaming wrapper plugin that data types can implement lazy loading in, which could be then used in all IDEs and notebooks.
In response, other attendees mentioned that the main challenge here was creating a way to indicate to consumers that data is expensive to generate a `repr`, which is where the costs really come in.

Finally, a PyCharm user shared how the xarray/pandas data types and their extension systems and data accessors were all opaque to that IDE's autocomplete, at least without further tagging or augmentation in the IDE or the code.
They expressed that to address this, IDEs should be better aware of extensions such as these.
Others, including ourselves, mentioned in response that using customizable LSP servers can help make editors better aware of extensible syntaxes like this, which is indeed what Spyder and other IDEs do (and the Spyder team maintains the [de-facto standard pluggable Python implementation of](https://github.com/python-lsp/python-lsp-server)).

While user needs here varied, there was a clear theme that users greatly value being able to interactively view, edit and analyze a diverse array of data types right within their IDE, as Spyder continues to particularly focus on.


## Desktop vs web-based IDEs

A popular point of discussion was the merits of desktop versus web-based interfaces and IDEs for science research, which saw some mixed opinions on the topic.

Posing the question directly, we asked people to share their opinions on a web-based vs. desktop applications, and on a true desktop programs versus those just with a webview as a UI.
One participant stated that a web browser can help them be effective for collaboration, but may not be as useful for single-user situations as a native application would be.
Another had concerns with the usability of Zoom screen sharing, as sharing a desktop application just shared that application, while sharing a web-based IDE shared the user's entire web browser.
A third suggested [vscode.dev](https://vscode.dev/), which runs in a browser and which can be self-hosted, but stated that Python support is not "fully on par" with the desktop version.
A final point discussed was the possibility of running desktop IDEs inside a web-based container to improve security and ease of deployment, particularly using Python's new WASM support.

On a related note, an attendee shared that they support a small statistics group, and their biggest challenge is helping students learn scientific computing.
They have a rather "rugged individualist culture", and feel they need to learn how to share knowledge with others, asking the audience how they could accomplish that with IDEs.
This prompted others to relate how, where they work, platforms for accessing data require a lot of authentication.
This entails using JupyterHub as their default IDE/platform, with very little flexibility in the matter.
They would like a platform for other IDEs to be able to connect to a shared JupyterHub environment, which is exactly what we are working on for Spyder 6.1 and beyond.


## GPU compute integration

One fairly specific topic that got a disproportionate amount of attention was incorporating better support for GPU computing (e.g. CUDA) within IDEs and interfaces, thanks to Nvidia representatives in the room posing the initial question.
They stated that Nvidia was "getting serious" about Python and CUDA, and they would love to "hear people's gripes about developing GPU apps in Python, what tooling you use and what problems you face and how do you debug them".
They also asked for people's experiences working in Python together with native code (C++).

Responding first to the question on native code, one participant described how they had to compile a Fortran module and import it from Python.
They just used `f2py` and the workflow was already in there and worked: they'd change the native code, recompile and rinse and repeat.
However, they said it would be nice to offer a workflow to shorten that development loop.
It was mentioned that this was particularly a problem with two separate codebases, where changes in one can affect the other, which is difficult to conceptualize and work with the coupling between them.
The Nvidia representatives then asked them how they would like to have a debugger with the ability to step into their code from Python to Fortran but still able to inspect your variables on the Python side, to which they replied "Sounds awesome!".

Another attendee supervises a postdoc using a bunch of A100 GPUs, and asked the postdoc how he knew he was getting the most performance out of it.
The postdoc's reply, which the attendee found rather telling, was that "PyTorch [just] runs": it was painful enough for them to just get it running. so they were not particularly interested in spending even more time optimizing it further.
The participant now has new students doing JAX and expect the same thing to happen, since diving into hardware level optimization is something that students really won't do and can be very intimidating.
They have students who don't know how to use the 4 CPUs in their laptop, much less the GPUs in a supercomputer center.
When asked what they feel is the main problem causing this, such as documentation or tooling, the researcher replied it was courage on the student's part to actually "go down there" and dig into the low-level code.
The postdoc clearly likes the platform and bought 40 new A100s, and is fine with the platform abstracting that for him.
However, the attendee expressed concern that this poses a real sociological challenge to get students used to using—much less optimizing—GPUs.

Finally, it was asked what IDEs could do to make GPU workflows more convenient.
In reply, participants suggested better integration with NVSMI or an integrated dashboard of GPU usage, which would allow users to see that, for instance, a particular kernel crunching data is too big to use the full potential of the GPU.
The Nvidia folks mentioned that they do have a profiling tool that could potentially address some of those concerns, gives visibility on GPU utilization, bottlenecks and efficiency, and for interested folks to follow up with them directly.
In response to people asking about support for such tools in a VSCode extension, they shared that these tools have their own UI but could explore IDE integration.
They mentioned that tooling in Python tends to be "pretty thin" as users often don't go looking for tools and use the ones that are there, whereas their profiler can be really intimidating and throws a lot of information at such users, potentially putting them off.

All told, there was a surprising amount of interest and discussion around this once-niche topic, signaling that GPU computing has become something much closer to a mainstream need in the scientific space.
Thus, while the discussion is of course of most interest to GPU companies like Nvidia, it suggests an IDE plugin to support this profiling tooling and other GPU integration features might be of significant benefit to the wider user community.


## Spyder feedback

While most of the discussion focused on topics applicable to broader categories of IDEs, there were a few specific bits of Spyder feedback.
In particular, attendees praised Spyder's plotting functionality, though some expressed a preference for the non-default mode of displaying plots in separate windows over the Plots pane.
Others mentioned that the one killer feature for them that it was missing was multi-line editing, a common request over the years and something we plan to work on for forthcoming Spyder versions, along with support for collaborative editing.

A particularly salient comment was one of the attendees' request that "We need RStudio for Python", with another replying that Spyder fills most of that gap.
Perhaps the main RStudio feature not built in is Quarto/RMarkdown, though we are currently exploring the possibility of helping develop a plugin supporting that.
Other comments, such as a desire for GitHub Copilot, better data exploration and visualization capabilities, and support for connecting to remote JupyterHub instances, are also features we already offer or are developing or exploring.


## Next steps

Overall, the broader learnings gained here for IDE and interface developers were perhaps less in the detailed specifics of each comment, but rather the common themes users focused the most on.
Perhaps the least surprising was interest in generative AI, suggesting that IDE developers should continue to explore integration possibilities, but keeping a critical eye while doing so.
By contrast, the most surprising was the extensive discussion about GPU computing and how IDEs and tools can help with that, which seems to indicate that IDE plugins for assisting in this regard might be valuable.

Another area of user emphasis was the importance of interactive data exploration for a variety of formats and structures.
While a subset of such could be built into an IDE (as we have with Spyder's Variable Explorer), given the diversity of scientific data types across fields this suggests the need for a more pluggable/extensible approach to variable exploration.
Finally, the consensus was unresolved on desktop versus web-based IDEs, though participants did identify a need for a common framework to connect local IDEs to remote platforms like JupyterHub.
To that end, we're working to provide those facilities in Spyder 6.1, and could eventually be developed into such an common interface.

Thanks to everyone for attending and sharing such great ideas and insights, and we look forward to continuing to learn from the community and hear more in the future.
And until then, as always, happy Spydering!