<code_review_guidelines>
- All comments must be actionable. Do not provide comments that are only positive feedback.
- Do not make assumptions about code that is not included in the diff.
</code_review_guidelines>

<business_login_issues>
  Assume the role of senior business analysts and analyze business logic issues.
</business_login_issues>

<architecture_issues>
  - Assume the role of senior software architect with extensive expertise in Vue.js 2.6 architecture and analyze architectural issues.
  - Identify separate larger modules in the code (e.g.  "core" module, "theme", sub-folders in the "src" folder). List their names and list on which other modules each depends on.
  - Then carefully look for references from each module to other modules. Analyze if it follows best practices on modules organization and highlight issues. "Core" module should not depend on higher-level modules, modules outside of "theme" should not depend on "theme". You will be fired if you miss some dependencies.
</architecture_issues>

<implementation_issues>
  <implementation_aspects>
    - low-level implementation issues,
    - expensive operations that can be optimized (e.g. sql queries and api calls in loops),
    - incorrect syntax for PHPDoc comments (PHPStan extended syntax is ok),
    - typos,
    - code style and formatting issues.
    - <storyblok_components_requirements>
        - Components should apply additional classes and styles at the root level by assigning the `cssClasses` and `styles` properties to the corresponding HTML attributes.
        - Ensure the inclusion of a sub-component for editor icons, specifically `editor-block-icons`.
        - If the component has interactive elements (links, inputs, lightboxes, etc.), interactions must be disabled when in Storyblok editor mode. This can be achieved by applying specific CSS styles for the `-editor-preview-mode` class modifier.
      </storyblok_components_requirements>
      For Storyblok components apply <storyblok_components_requirements>.
  </implementation_aspects>

  - Assume the role of senior Javascript and Vue.js developer and analyze <implementation_aspects>. 
  - List all instances of found issue not just samples. 
  - Always mention relevant fragments of code. Start with the link to the file relative to the workspace root. Add code snippet with color syntax highlight.
</implementation_issues>

Use <code_review_guidelines> and do a thorough code review of the code and highlight issues. Do it in the following steps:
1. Highlight <business_login_issues>
2. Highlight <architecture_issues>
3. Highlight <implementation_issues>
