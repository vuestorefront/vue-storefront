# Good practices

When dealing with an open-source project, you have to remember that the project is not just for you or your team,
there will be a lot of developers using it too.

There are some good practices that you can establish in our repository.

## README files
All of your packages must contain a `README.md` file. This file must have some basic information like:

- What is this package for?
- Who made this package?
- How I can install this package?
- How I can use this package?
- How I can contribute? Or link to the `CONTRIBUTING.md`;

### Displaying the contributors of the project

In your `README.md` you can use it to display the names of the contributors of the project. You can use the [all-contributors](https://github.com/all-contributors/all-contributors) CLI to help you with this.

## Roadmaps
When creating new integrations, defining a roadmap can take some time and is not easy as people think. But there are some ways to develop essential roadmaps for the community, pointing out your future steps of the integration and help newcomers.

### Creating a roadmap
On your repository issue, create a new issue with the title `[ROADMAP] {INTEGRATION NAME} - {NEXT RELEASE}`, then pin the issue.

Inside the issue, you need to point what is going to be developed for the next release. If there are open issues, you can link those issues to each topic of the roadmap. For example:

```md
title: [ROADMAP] {INTEGRATION NAME} - {NEXT RELEASE}
-------

This roadmap includes all the development and enhancements needed for releasing a stable version of the {INTEGRATION NAME} integration

This roadmap is mutable and can be updated in the process.

Follow the issue to receive notifications on each change.

-------

### Theme
- Fix the XYZ bug | #{ISSUE NUMBER}
- Add a new feature | #{ISSUE NUMBER}

### Composables
- Change the getter structure | #{ISSUE NUMBER}
- Add a new feature to composable | #{ISSUE NUMBER}

### API-Client
- Update the server middleware | #{ISSUE NUMBER}
- Add a new feature | #{ISSUE NUMBER}
```
