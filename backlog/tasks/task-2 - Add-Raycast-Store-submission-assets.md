---
id: TASK-2
title: Add Raycast Store submission assets
status: To Do
assignee: []
created_date: '2026-07-10 03:31'
labels:
  - docs
  - ship-blocker
dependencies: []
priority: high
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Store submission via 'ray publish' requires a metadata/ folder with screenshots and a CHANGELOG.md with the {PR_MERGE_DATE} placeholder. package.json declares MIT license but there is no LICENSE file in the repo. Without these, the extension cannot be submitted to the Raycast Store.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 metadata/ directory exists with at least one PNG screenshot showing the root-search subtitle
- [ ] #2 metadata/ contains at least one screenshot of the preferences pane
- [ ] #3 CHANGELOG.md exists at repo root with an 'Initial Version' entry using the {PR_MERGE_DATE} placeholder
- [ ] #4 LICENSE file exists at repo root matching the MIT license declared in package.json
<!-- AC:END -->
