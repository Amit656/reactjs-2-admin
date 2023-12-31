# Committing Code

## General Rules

* Make [atomic commits](http://en.wikipedia.org/wiki/Atomic_commit) of changes, even across multiple files, in logical units. That is, as much as possible, each commit should be focused on one specific purpose.
* As much as possible, make sure a commit does not contain unnecessary whitespace changes. This can be checked as follows:

```
$ git diff --check
```

## Commit Messages

As a general rule, your commit message should start with a single line that's no more than about 50 characters and that describes the commit concisely. If you feel the need for more detailed explanations, create a blank line, followed by a more detailed explanation.

For consistency, try and use the imperative present tense when creating a message. Examples:

* Use "Add tests for" instead of "I added tests for"
* Use "Change x to y" instead of "Changed x to y"

*This information has been curated base on the [Issues 2.0 release blog post](https://github.com/blog/831-issues-2-0-the-next-generation)*

In order to associate commits with GitHub Issues, the commit message should indicate one or more issue number and (optionally) a state change for the story. The commit message should start with square brackets containing a hash mark followed by the issue number. For example:

    [#123] Diverting power from warp drive to torpedoes

To automatically close an issue by using a commit message, include "Closes" in the square brackets in addition to the issue number. For example:

    [Closes #123] Torpedoes now sufficiently powered

Note: There is more than one way of closing an issue via the commit message, however "Closes" is our suggested standard:

* `Fixes #xxx`
* `Fixed #xxx`
* `Fix #xxx`
* `Closes #xxx`
* `Close #xxx`
* `Closed #xxx`

Theoretically, it is possible to enclose more than one issue numbers within brackets, as well as combine actions with commit tracking. For example:

    [Closes #123][#124][#125] Torpedoes now sufficiently powered

This would close issue 123 and add commit references to issues 124 and 125 for tracking purposes.

## Message Template

Based on the [blog post](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) by [tbaggery](http://tbaggery.com/), here is a template to use as guideline for commit messages:

    [<optional state> #issueid] (50 chars or less) summary of changes

    More detailed explanatory text, if necessary. Wrap it to about 72
    characters or so. 

    Further paragraphs come after blank lines.

    - Bullet points are okay, too

    - Typically a hyphen or asterisk is used for the bullet, preceded by a
    single space, with blank lines in between, but conventions vary here