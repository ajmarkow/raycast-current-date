---
id: TASK-1
title: Rewrite README for Today's Date
status: To Do
assignee: []
created_date: '2026-07-10 03:31'
labels:
  - docs
  - ship-blocker
dependencies: []
priority: high
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
README.md still has the old '# Current Date' title (extension was renamed to 'Today's Date') and the whole body is a single sentence. It needs to describe what the extension does, document the preferences, show strftime examples, and either drop or verify the stale raycast.com/templates/team-time link (extension slug is now todays-date).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 README H1 is 'Today's Date'
- [ ] #2 README explains what the extension does and how root-search subtitle behaves
- [ ] #3 README documents both timezone modes (IANA vs UTC offset) and how they interact with timezoneType
- [ ] #4 README lists common strftime directives with example rendered output
- [ ] #5 Stale raycast.com/templates/team-time link is removed or replaced with a verified URL
<!-- AC:END -->
