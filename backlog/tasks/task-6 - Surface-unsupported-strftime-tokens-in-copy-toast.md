---
id: TASK-6
title: Surface unsupported strftime tokens in copy toast
status: Done
assignee: []
created_date: '2026-07-10 03:32'
updated_date: '2026-07-10 20:25'
labels:
  - feature
  - ux
  - strftime
dependencies: []
priority: medium
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
src/strftime.ts:55 silently passes unknown tokens through: format.replace(/%-?[A-Za-z%]/g, (token) => directives[token] ?? token). If a user types %q, the clipboard gets '%q' verbatim with no indication anything went wrong. Raycast's textfield preference type has no validation hook at edit time, but the toast on copy is a natural place to notice. Post-format, scan for any surviving %[A-Za-z] and either flip the toast to Failure or append the unsupported tokens to the Success toast message.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 After formatting, output is scanned for stray %[A-Za-z] tokens
- [x] #2 If any survive, the copy toast surfaces them to the user (e.g. 'Copied — unsupported tokens: %q, %V')
- [x] #3 Well-formed format strings still show the plain Success toast unchanged
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
After strftime(), scan output for /%[A-Za-z]/g. If any survive (deduplicated), show 'Copied — unsupported tokens: %x, %y' as the toast title; otherwise the plain Success toast is unchanged. Implemented in index.ts after task-5 directives are in place.
<!-- SECTION:NOTES:END -->
