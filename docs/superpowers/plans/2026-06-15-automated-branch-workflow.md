# Automated Branch Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make branch creation, commit, push, and pull request creation the default Codex completion workflow.

**Architecture:** Add a repository-level agent rule to `AGENTS.md` so every future task follows the same Git lifecycle. Preserve mandatory verification, human review, and the prohibition on automatic merging or production deployment.

**Tech Stack:** Markdown, Git, GitHub CLI or equivalent PR tooling

---

### Task 1: Add the automated Git workflow rule

**Files:**
- Modify: `AGENTS.md`

- [ ] Add a `브랜치와 PR 자동화` section after the completion commands.
- [ ] Define the ordered branch, commit, push, and PR steps.
- [ ] Define stop conditions for failed verification, unavailable authentication, missing remotes, and unavailable PR tooling.
- [ ] Preserve human review and prohibit automatic merge and production deployment.

### Task 2: Verify and publish the rule change

**Files:**
- Verify: `AGENTS.md`

- [ ] Run `git diff --check` and inspect the final Markdown.
- [ ] Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run validate:content`, and `npm run build`.
- [ ] Commit only the workflow documentation changes.
- [ ] Push the current `codex/` branch to `origin`.
- [ ] Create a PR containing the change summary and verification results.

