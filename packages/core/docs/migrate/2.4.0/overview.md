# Migration guide 2.4.0

This version introduces many renaming or changes related to the function declarations among of the core.
We had to proceed with this in order to keep the convention and unify the naming across whole VSF.

We change the composables and our factories according to the following rules:
- each composable always return one field with the response from the api
- each composable function takes one argument which is an object of given parameters
- each factory param function takes two arguments, first one is context (as it was before) and second one contains a function parmeters along with other options (such as customQuery)
