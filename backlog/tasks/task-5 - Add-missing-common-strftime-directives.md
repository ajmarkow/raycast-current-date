---
id: TASK-5
title: Add missing common strftime directives
status: Done
assignee: []
created_date: '2026-07-10 03:32'
updated_date: '2026-07-10 20:25'
labels:
  - feature
  - strftime
dependencies: []
priority: medium
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
src/strftime.ts:32-53 supports the core directives but is missing %F (=%Y-%m-%d), %T (=%H:%M:%S), %R (=%H:%M), %e (space-padded day), and %z (numeric offset). %F and %T in particular are the two most common shortcut directives on devhints.io/strftime — which is the exact reference we point users at from the preference description (package.json:1838). If a user types %F they currently get literal '%F' back in their clipboard. %z is cheap on both timezone paths (parseUtcOffsetHours for UTC mode, Intl.DateTimeFormat with timeZoneName: 'shortOffset' for IANA).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 %F renders as YYYY-MM-DD
- [x] #2 %T renders as HH:MM:SS (24-hour)
- [x] #3 %R renders as HH:MM (24-hour)
- [x] #4 %e renders day-of-month space-padded (e.g. ' 7' for the 7th)
- [x] #5 %z renders as +HHMM or -HHMM for both IANA and UTC-offset timezone modes
- [x] #6 Existing directives still pass all previous behavior
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added %F=%Y-%m-%d, %T=%H:%M:%S, %R=%H:%M, %e=space-padded day, %z=±HHMM. Extended DateParts with utcOffsetMinutes; getZonedParts populates it for both UTC (via parseUtcOffsetHours*60) and IANA (via timeZoneName:'shortOffset' parsed to minutes).
<!-- SECTION:NOTES:END -->
