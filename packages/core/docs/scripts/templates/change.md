- <%= isBreaking ? '**[BREAKING]** ' : '' %><%= description %> ([#<%= prNumber %>](<%= link %>)) - [<%= author %>](<%= linkToGitHubAccount %>)
<% if(breakingChanges.length) { -%>
  | Before | After | Comment | Module 
  | ------ | ----- | ------- | ------
  <% breakingChanges.forEach(function(change) { -%>
| <%= change.before %> | <%= change.after %> | <%= change.comment %> | <%= change.module %>
  <% }); %>
<% } %>
