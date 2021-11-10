# Security Policy

## Reporting a Vulnerability

Please do not publicly disclose potential security vulnerabilities. Instead, report them to our dedicated email address security@vuestorefront.io. Informing us this way will allow us to quickly determine the severity of the problem and provide a fix without putting existing projects at risk.

If you would like to provide a patch, please **do not open a pull request**. Instead, create a commit on your fork of Vue Storefront and run this command:

```bash
git format-patch HEAD~1..HEAD --stdout > patch.txt
```

It will generate a file called `patch.txt`. Please email a description of the patch along with the patch itself to our dedicated email address mentioned above.
