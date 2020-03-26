# Development workflow

This document describes how changes to the core packages should be proposed and executed and how they should be incorporated into specific integrations. The purpose of below rules is to ensure smooth process of core development that is not blocking integrations development.

## Making changes to the core

Every new feature/breaking change to Vue Storefront core should be implemented in a following way

**Stage 1: Write RFC (Request for Comments)**

Before writing actual code please propose a Pull Request with markdown document to `packages/core/rfcs` where you will describe the new API or breaking change that you want to apply. Every RFC should contain:

- motivation behind the new API
- list of new APIs with usage examples
- migration process.

This way we can validate the idea very early, focus on the API first and not end up in a situation when we need to rewrite a lot of already proposed code.

The RFC needs approval from at least 2 core team members to enter Stage 2.

**Stage 2: Propose a Pull Request only with a core implementation**

Once RFC is aporoved another Pull Request should be made. This time it should contain the implementation of proposed APIs but **without updating other packages/projects depending on it (so no changes in theme or integrations, just implementation of new API)** 

This implementation needs to be accepted by 3 core team members:

- Filip Rakowski (@filrak)
- Patryk Tomczyk (@patzick)
- Patryk Andrzejewski (@andrzejewsky)

After being accepted Pull Request will receive `verified` and `blocked` labels.

**Stage 3: Apply proposed changes to default theme, write tests and docs**

Once we are sure that implementation of the API is done right the only thing that has left is writing tests, docs and implementing the changes in default theme.

You should do this as a Pull Request to your feature branch.

This implementation also needs to be accepted by 3 core team members.

Once it's acceptet we are first merging it to target feature branch, then removing `blocked` label from it and merging as well.


## Applying core changes in integrations

TBD