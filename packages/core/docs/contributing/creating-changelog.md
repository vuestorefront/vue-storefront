# Creating changelog

To keep our changelog consistent, it is created automatically. 
Now you don't need to worry about its structure and order of the information. 
There are just a few steps to do in order to create the changelog. 

## Steps

1. Go to folder `/changelog`, create a `.js` file and give it the same name as a number of your current issue form GitHub. For example `4523.js`
2. Copy this code below, paste it inside your `.js` file and fill it in with your data and save it

```js
module.exports = {
  description: "description of your changes",
  link: "link to your issue",
  isBreaking: true or false, //(depends if you applied some breaking changes),
  breakingChanges: [ //leave it empty if there aren't any breaking changes
    {
      module: "affected module",
      before: "how it was",
      after: "how it is",
      comment: "quick migration guide"
    }
  ],
  author: "your name",
  linkToGitHubAccount: "link to your github account",
}
```
3. Check a release version in which your changes should appear. Let's assume it's `2.0.14`
4. In your console run `yarn changelog --v 0.14.3` 
5. And it's done! Your changes should appear in `changelog.md` and the `/changelog` folder is empty now

## Changing default `in` and `out` paths

The `in` and `out` paths are set by default: 
- `../changelog` - the `in` path should always lead to a folder with `.js` files
- `../contributing/changelog.md` - the `out` path should always lead to `.md` file


If you need to change one of them or even both then you need to add a particular path to your command.

:::warning
If you want to change any of the default paths, you have to ensure that the new paths lead to already existing folders or files in the project.
:::

Let's assume you want to change `in` and `out` default paths. Your new `in` path is `../new-changelog` and the `out` path is `../new-changelog.md`. 
In this case you need to run in your console 
`yarn changelog --in ./changelog --out ./contributing/changelog.md --v 0.14.3`
