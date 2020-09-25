# Vue Storefront API Design Philosophy

While designing something so complex as Vue Storefront it's vital to set up rules that will guide us when designing APIs. The purpose of those rules is to make sure that problems ale solved in a similar, predictable and consistent to understand way which will highly contribute to the learning curve of the framework itself.


## General rules


1. We build **simple**, **declarative** and **general-purpose** APIs that are not tied to implementation details or a specific solution to a problem. That way we can ensure that our APIs will remain  general-purpose and won't break on updates even if we do heavy changes in the underlying business logic.
2. API Surface should be possibly minimal. If there is a feature that can be achieved with already existing APIs we shouldn't add new ones just to make it simplier.
3. Focus on good defaults and embracing [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) paradigm. Every API should work as it is for most of the use cases and have ability to be configured for other ones.
4. APIs should not limit the users. If we can't fulfill all use cases with parameters we should provide extension points so users can do this by themselves.
5. Same code should work on every platform (excluding specific object properties and search params)

