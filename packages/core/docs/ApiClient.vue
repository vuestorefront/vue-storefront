<template>
<div> 
  <h1>API Client</h1>
  <p>
    API Client provides a friendly abstraction layer over network calls to your eComemrce platform. 
    It expresses each network request as declarative method like <code>getProduct</code> or <code>getCategory</code>. 
  </p>
  <p>
    By having this additional layer we can hide implementation details of <b>how</b> we get the data which gives you freedom to introducing major changes in this layer without influencing other parts of the app. 
    If you want to change the way you're getting certain types of data - for example switch from REST API to GraphQL or fetch product reviews from external service you can easily do that without introducing breaking changes <b>as long as your method is will have the same interface</b>.
  </p>
  <p>
    API Client is a Vanilla JavaScript application and it doesn't require any frontend framework to run.
  </p>
  <ul>
    <li><a href="#configuration">Configuration in Vue Storefront Theme</a></li>
    <li><a href="#installation">Adding to currently existing JavaScript projects</a></li>
  </ul>
  <h2 id="configuration">Configuration in Vue Storefront Theme</h2>
  <p>
    If you're using Vue Storefront Nuxt Theme you should already have at least one file in your <code>plugins</code> folder. The name of each file represents 3rd party integration configuration that it's holding. If you want to change the API Urls or set credentials this is the right place to do this.
    <Block type="danger" title="Storing credentials">
      <b>Never</b> pass fragile data like API Client secrets as plain strings. Use env variables instead!
    </Block>
    <code>Setup</code> method is responsible for configuring the API Client of your integration.
    </p>
  <Content slot-key="setup-ct"/>
  <h2 id="installation">Adding to currently existing JavaScript projects</h2>
  <p>
    As API Client is a vanilla JavaScript application you can use it without VSF Theme or even without Vue.js. 
    You just need to perform few additional steps that Vue Storefront Theme does for you out of the box
  </p>
  <p>
  <h2>Methods</h2>
  <Content slot-key="methods-ct"/>
</div>
</template>

  <Block type="warning" title="Using API Client outside of VSF Theme">
    If you're not using our Nuxt theme you first need to install the API Client package and invoke `setup` method.
    <Content slot-key="installation-ct" />
  </Block>