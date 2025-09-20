---
author: Luismi Barcos
pubDatetime: 2024-11-28
title: "GitTricks: How to keep your history clean"
description: "This post explains how to keep your git history clean."
featured: true
tags:
  - git
  - software development
---

# GitTricks: How to keep your history clean

> **Disclaimer**  
> This article was originally written for the [Celonis Blog](https://careers.celonis.com/blog/keep-git-history-clean).  
> The content remains the property of **Celonis SE**.  
> I’m sharing it here as part of my personal blog.

Git commits are fundamental to any Git repository. Each commit represents a snapshot of changes in your project and
ideally comes with a message explaining the nature of those changes.

As projects evolve —whether through adding features, deprecating old ones, fixing bugs, and so on— these changes are
recorded in commits. But without proper commit management, the history can get messy, making it difficult to track the
evolution of your project.

In this post, we will see some tricks to help you maintain a clean and readable git log that benefits both you and
your team.

## Why Should I Care About Git History?

Have you ever seen a git history like this?

![Messy History](@/assets/images/2023/keep-git-history-clean/messy-history.png "Messy History")

This log does not say too much about the changes. You can see the experiments done by the developer, bugs discovered
and fixed along the way, and non-descriptive commit messages. Now, imagine reviewing a PR with these commits,
it’s harder than it should be.

Also, consider a situation where you’re investigating a bug and checking the commit history. This history is full of
noise, making it hard to pinpoint relevant changes.

When we develop, it’s normal to experiment —maybe we’re trying out a new library or exploring different approaches to
solving a problem. But our back-and-forths during development don’t need to be preserved in the project’s history, right?

The first part of a cleaning history is to clean your branches, but what happens when you merge your changes with your
colleague’s changes?

## Problem with Merging: History Chaos

When working in a team, you often need to pull in changes from your teammates. The simplest way to incorporate these
changes is to merge their branch into yours. However, merging has its drawbacks:

- It creates additional "merge commits" that clutter your branch with commits that often have no meaningful content.
- It mixes your commit history with your teammates, making it harder to follow the progression of your changes.

How many times have you seen a git log like the following?

![History Caos](@/assets/images/2023/keep-git-history-clean/history-caos.png "History Caos")

Even in such a small project with just a bunch of commits, it is difficult to know when and what has been added to
the main branch.

Also, in this example, there are 6 merge commits from a total of 23 commits, which means **26% of commits are
merge commits.**

If you are curious about the percentage of merge commits in one of your branches, you can use the following command:

```
git log <your branch> --pretty=%P | awk '{if(NF>1) merge++} END {print merge/NR*100 "%"}'
```

## How Can We Achieve a Cleaner History?

_Disclaimer: The tricks we’re about to explore involve modifying your Git history. This can be risky if others are
working on the same branch, so avoid doing this on shared branches like main or develop. Many platforms, such as
GitHub or Bitbucket, offer branch protection to prevent accidental history changes._

### Rebasing

Rebasing is a way of integrating changes from one branch into another without creating merge commits.
Instead of merging, a rebase rewrites your branch’s history by putting your commits on top of the other branch’s commits.

![Before Rebase](@/assets/images/2023/keep-git-history-clean/before-rebase.png "Before Rebase")

![After Rebase](@/assets/images/2023/keep-git-history-clean/after-rebase.png "After Rebase")

In the images above, you can see that we are rebasing the `experiment` branch into the `master` branch.

This operation works by going to the common ancestor of the two branches (the one you’re on and the one you’re rebasing
onto), getting the diff introduced by each commit of the branch you’re on, saving those diffs to temporary files,
resetting the current branch to the same commit as the branch you are rebasing onto, and finally applying each change
in turn (check the [official documentation](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) for more details)

Let’s see an example.

![Rebase example 1](@/assets/images/2023/keep-git-history-clean/rebase-example-1.png "Rebase example 1")

You are developing a new feature in your branch called “feature-7” but, in the middle of your development, a new commit
has been added to the main branch. It is a common situation inside a team.

In order to keep a clean history, you want to put your changes ahead of the last changes of the main branch, so,
let’s **rebase your changes.**

Get all the changes from the main branch:

```
git pull origin main –-ff-only
```

Now checkout to your branch

```
git checkout feature-7
```

And now, let’s rebase your changes with the main branch:

```
git rebase main
```

![Rebase example 2](@/assets/images/2023/keep-git-history-clean/rebase-example-2.png "Rebase example 2")

Now your changes are ahead of the main branch changes:

![Rebase example 3](@/assets/images/2023/keep-git-history-clean/rebase-example-3.png "Rebase example 3")

Now, you can merge your changes to the main branch by a fast-forward merge, avoiding the merge commit.

```
git checkout main
git merge feature-7 –-ff-only
```

Your git history looks like this:

![Rebase example 4](@/assets/images/2023/keep-git-history-clean/rebase-example-4.png "Rebase example 4")

No merge commits, no mixed commits, and the commit order reflects the actual development flow.

### Handling Conflicts

Like in a regular merge, rebasing could have conflicts. When this happens, git will stop the rebase at the commit that
causes the conflict.

You can resolve the conflicts as you normally do and then continue with your rebase by doing:

```
git rebase --continue
```

In case you want to abort it, you can do:

```
git rebase --abort
```

## Rebasing on Remote Repositories

Most of us work by sending PRs to remote repositories. Platforms like GitHub and Bitbucket have options to rebase the PR
changes on top of the target branch. Let’s see the previous example but sending our “feature-7” through a PR:

Remember, we have our “feature-7” branch rebased with the main branch

![Previous git history](@/assets/images/2023/keep-git-history-clean/rebase-example-3.png "Previous git history")

Now we create a PR and we can see the options that GitHub offers to us

![Github Rebase](@/assets/images/2023/keep-git-history-clean/github-rebase.png "Github Rebase")

If we rebase and merge, our commits will be ahead of the main branch commits. It is something that we have already
done locally but while we are doing the process to merge this branch into the main branch (reviews, builds checks, etc)
other commits can be added to the main branch.

If we choose the rebase option, it will produce the same result as when we performed the merge locally.

![GitHub History](@/assets/images/2023/keep-git-history-clean/github-history.png "GitHub History")

![GitHub Rebase Local.png](@/assets/images/2023/keep-git-history-clean/github-rebase-local.png)

No merge commits, no mixed commits, and the order represents the order in which the changes have been merged into
the main branch.

_NOTE: it is possible to set rebase as the default merge mechanism in platforms like GitHub._

## Interactive rebase

Interactive rebase is a powerful tool that can be used to merge commits, edit them, rewrite the message,
or even delete it.

To execute an interactive rebase, you can do

`git rebase -i <commit-hash>`

or

`git rebase -i HEAD~X`

Where X is the number of commits.

It also provides a self-explanatory page when doing a rebase:

![Interactive Rebase Info](@/assets/images/2023/keep-git-history-clean/interactive-rebase-info.png "Interactive Rebase Info")

Let’s jump into the first messy log:

![Messy History](@/assets/images/2023/keep-git-history-clean/messy-history.png "Messy History")

We have a finished branch containing all our experiments and failures. As we want to make our lives easier in the future,
we are going to reorganize our branch history. Let’s start!

First, let’s combine some of the “fix” commits with their original commits. So:

```
git rebase -i HEAD~6
```

![Interactive Rebase Example 1](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-1.png "Interactive Rebase Example 1")

We use the “f” option to squash the commit into the previous one keeping the previous message. This is our
current status:

![Interactive Rebase Example 2](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-2.png "Interactive Rebase Example 2")

Note how the hashes have changed.

Next step, let's delete the revert commit by never doing that change:

```
git rebase -i HEAD~5
```

![Interactive Rebase Example 3](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-3.png "Interactive Rebase Example 3")

Note that we directly delete the commits. This results in:

![Interactive Rebase Example 4](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-4.png "Interactive Rebase Example 4")

Now, these commit messages don't clearly explain what we're doing. Let’s reword them:

```
git rebase -i HEAD~3
```

![Interactive Rebase Example 5](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-5.png "Interactive Rebase Example 5")

We use the “r” option to reword the commit message. This will open the default editor:

![Interactive Rebase Example 6](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-6.png "Interactive Rebase Example 6")

We change the message to whatever we want. This is the final result:

![Interactive Rebase Example 7](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-7.png "Interactive Rebase Example 7")

Now our branch looks cleaner and can be used to send a PR with it (after rebasing our changes with the
remote repository)

## Conclusion

Keeping your git history clean is essential to have a readable and maintained repository. Using the tricks
explained above you will:

- Help your team (and reviewers) understand the steps you took during development but avoid the pollution of your failure experiments during the development.
- Keep a logical commit order, which is beneficial for future maintenance.
- Simplify bug tracing and make rollbacks less painful.

Use these techniques wisely, especially on shared branches, to maintain a cleaner and more manageable Git history!
