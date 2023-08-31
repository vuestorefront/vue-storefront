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

### Adding the README to all the Packages
It's always good to add your README.md file to the packages in your integration. 
So when people are looking at NPM, they can see a piece of more detailed information about the project. 
You can copy and paste the main README.md file from the root folder or create a new one from each package.

### Displaying the contributors of the project

In your `README.md` you can use it to display the names of the contributors of the project. You can use the [all-contributors](https://github.com/all-contributors/all-contributors) CLI to help you with this.

If you are using the `ecommerce-integration-boilerplate` in your project, there are some commands already prepared to use in conjunction with `all-contributors` CLI.

#### Adding a new contributor

You can add a new contributor to the project, by running the command `yarn contributors:add` on the root directory of your project. This will bring the `all-contributors` CLI, and there you can fill the information for the new contributor. 

#### Generating the contributors list

You can always refresh the contributors list, you need to execute the command `yarn contributors:generate` on the root directory of your project. Then the `README.md` file on the root directory will be automatically updated to reflect the changes made to the `.all-contributorsrc` file.

## Roadmaps
When creating new integrations, defining a roadmap can take some time and is not easy as people think. But there are some ways to develop essential roadmaps for the community, pointing out your future steps of the integration and helping newcomers.

### Creating a roadmap
There are two ways of developing a roadmap inside your repository. You can create a pinned issue for each planned roadmap, or create a GitHub Project for the roadmap. Here we will teach you how to create both of the implementations.

#### GitHub Projects
On your repository, enable the **Projects** feature. Then go to the **Projects** tab and create a new **Project** with the title `Roadmap`, and your can add the description you want. Choose the **Template** as `None`, and create your new **Project** board.

Then you will be asked to add new columns. Here you add the first column as `F.A.Q`, and the second one as your first release on the roadmap. Then, if you want to create more columns for future releases and planing the future roadmap of your integration, fell free to add.

When creating a new card, you can use this template as a base for the card:

```md
#### {Group Title}
-----
- [ ] {Feature to be implemented or Bug to be fixed}
...
```

For the `F.A.Q` column, you can use this template as a base:

```md
#### Q: {Question}
**A:** {Answer}
```

#### Pinned Issue
On your repository **Issues** list, create a new **issue** with the title `[ROADMAP] {INTEGRATION NAME} - {NEXT RELEASE}`, then pin the issue.

Inside the issue, you need to point what is going to be developed for the next release. If there are open issues, you can link those issues to each topic of the roadmap. For example:

```md
title: [ROADMAP] {INTEGRATION NAME} - {NEXT RELEASE}
-------

This roadmap includes all the development and enhancements needed for releasing a stable version of the {INTEGRATION NAME} integration

This roadmap is mutable and can be updated in the process.

Follow the issue to receive notifications on each change.

## F.A.Q

#### Q: {Question}
**A:** {Answer}

-------

## Roadmap

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
