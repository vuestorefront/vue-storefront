# Installation

## Prerequisites

### Node.js
#### All Users
Before proceeding, make sure you have [Node 12+](https://nodejs.org/en/) and [Yarn 1](https://classic.yarnpkg.com/lang/en/) installed given...
* Nuxt v2.15.x has a minimum version dependency on node 12
* Given node 10 reached End of Life (EOL) in April 2021

#### MacBook Pro Users with M1
Before proceeding, make sure you have [Node 15+](https://nodejs.org/en/) installed, otherwise yarn package manager will fail due to inherent memory issues with node < v15 when using yarn 2.4.x+

##### Recommendation
Utilize Node Version Manager installation via homebrew [nvm package](https://formulae.brew.sh/formula/nvm#default) as an effective way to set & maintain 1 or more node versions on your local machine

``` bash
# install nvm using homebrew
brew install nvm
```

```bash
# print a list of available installation options to console
nvm ls-remote
```
```bash
# install Long Term Support (LTS) version of node v15 via nvm
nvm install 15
```


###yarn package manager
#### Default Package Manager
The vue-storefront framework utilizes the yarn package manager by default

#### yarn v1 End of Life....
yarn v1 entered "maintenance mode" as of June 2020, therefore the platform has been upgraded to utilize v2.4.x as the default

### Installing yarn
It is recommended to install yarn globally and to use the global installation as the secure location to store your registry authorization code via your local yarnrc.yml

1. Install yarn package globally

```bash
# install yarn globally
npm i -g yarn
```
2. OPTIONAL, but RECOMMENDED:  Navigate to npmjs.com, login and create an authorization token

3. Append the api config token to your global setup by editing the global yarnrc.yml for key "npmAuthToken:" or via the following commands via the cli
```bash
# Setting yarn config via command line
yarn config set npmAuthToken <paste_npm_authToken_here></paste_npm_authToken_here>
```



#### IMPORTANT - Macbook Pro M1 Users !!!

   Utilization of yarn v2.4.x+ will REQUIRE the use of node v15+ due to the inherent memory v8 memory issue which was resolved in node v15+

#### Alternative Approach to installing node v15
An alternative approach can be to utilize the "Rosetta" feature if a developer chooses, but the recommended approach is to leverage nvm to manage project specific node versions to overcome the issue 


### node gyp package
When the project is built, there are some dependent and /  or transient  packages that may need to be built, and in order to build some of those packages the "gyp" package should be installed
```bash
# install gyp package
npm -i gyp
```

## Using Vue Storefront CLI

The easiest way to get started with Vue Storefront is to set up your project using our CLI. You can run it using the `npx` command:

```bash
# Run Vue Storefront CLI

npx @vue-storefront/cli init
```
Enter the name of the project and select the backend platform you wish to use.

<center>
  <img src="../images/cli.jpg" alt="Vue Storefront CLI" />
</center>

Once selected, the CLI creates the project files in the directory matching your project name. The only thing left is to go to this directory in the terminal and install the dependencies:

```bash
# Go to project folder
cd <project_name>

# Install required dependencies
yarn install
```

Now the project is ready. To start the application in development mode, use the `yarn dev` command:

```bash
# Start the project in development mode
yarn dev
```

You can read more about available commands and environments on [commands](https://nuxtjs.org/docs/2.x/get-started/commands/) page in Nuxt.js documentation.

## What's next?

- Learn about [key concepts in Vue Storefront](./key-concepts.html) to confidently work with your newly created Vue Storefront project.
- Check out the platform-specific docs in the `eCommerce platforms` category to learn more about your integration.
