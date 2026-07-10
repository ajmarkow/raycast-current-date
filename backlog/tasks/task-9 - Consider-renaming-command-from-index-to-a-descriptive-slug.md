---
id: TASK-9
title: Consider renaming command from 'index' to a descriptive slug
status: Done
assignee: []
created_date: '2026-07-10 03:32'
updated_date: '2026-07-10 20:29'
labels:
  - manifest
  - polish
dependencies: []
priority: low
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
package.json:14 sets command name to 'index'. Not user-visible in root search (title is what shows), but it does surface in the deeplink URL (raycast://extensions/aj-markow/todays-date/index) and the entry-point source file must literally be src/index.ts. A more descriptive slug like 'todays-date' or 'show-date' would give cleaner deeplinks. Pure polish — flag before v1.0 because renaming after publish would break existing deeplinks.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Decision made and captured (either 'keep index' or the new slug is chosen)
- [x] #2 If renamed: package.json command name is updated
- [x] #3 If renamed: src/index.ts is renamed to match and imports still resolve
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Renamed command slug from 'index' to 'show-date' in package.json and renamed src/index.ts to src/show-date.ts. Deeplink changes from raycast://extensions/aj-markow/todays-date/index to raycast://extensions/aj-markow/todays-date/show-date. Breaking the deeplink now (pre-v1.0) is intentional. tsc --noEmit passes with no errors.
<!-- SECTION:NOTES:END -->
