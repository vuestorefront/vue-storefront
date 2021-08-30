- <%= isBreaking ? '**[BREAKING]** ' : '' %><%= description %> ([#<%= prNumber %>](<%= link %>)) - [<%= author %>](<%= linkToGitHubAccount %>)

<% if(breakingChanges.length) { -%>
  | Before | After | Comment | Module 
  | ------ | ----- | ------- | ------
  <% breakingChanges.forEach(function(bc) { -%>
| <%= bc.before %> | <%= bc.after %> | <%= bc.comment %> | <%= bc.module %>
  <% }); %>
<% } %>
