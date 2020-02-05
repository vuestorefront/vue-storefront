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
  
  <h2>Setting up</h2>
  <Block type="warning" title="Using API Client outside of VSF Theme">
    If you're not using our Nuxt theme you first need to install the API Client package:
    <Content slot-key="installation-ct" />
  </Block>
  <p>Once you install the package you need to call its <code>setup</code> method where you will pass the API Clieny configuration like API Url, API key, default language etc.</p>
  <Content slot-key="setup-ct"/>

  <h2>Methods</h2>
  <Content slot-key="methods-ct"/>
</div>
</template>