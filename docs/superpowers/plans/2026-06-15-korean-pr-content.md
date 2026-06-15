# Korean Pull Request Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require Korean prose for every pull request created or edited by Codex.

**Architecture:** Extend the repository-level PR automation rule in `AGENTS.md`. Keep technical literals unchanged where translation would reduce accuracy, and update the currently open PR to conform.

**Tech Stack:** Markdown, Git, GitHub CLI

---

### Task 1: Add the Korean PR writing rule

**Files:**
- Modify: `AGENTS.md`

- [ ] State that PR titles and all human-readable body sections must be written in Korean.
- [ ] List the required Korean sections: summary, verification, financial review, and human review requests.
- [ ] Allow commands, file paths, branch names, code identifiers, and product names to remain unchanged.

### Task 2: Verify and publish the rule

**Files:**
- Verify: `AGENTS.md`

- [ ] Run `git diff --check` and the repository's five required verification commands.
- [ ] Commit and push the documentation changes.
- [ ] Edit PR #2 so its title and human-readable body content are in Korean.
- [ ] Query PR #2 and confirm the final title and body.

