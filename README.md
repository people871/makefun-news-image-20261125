[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/people871/makefun-news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/people871/makefun-news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

# Wednesday 25 November 2026 in one image: 34 sourced stories, a world map, a UTC timeline and a date check

A newspaper front page that sums up Wednesday 25 November 2026 in a single
1024×1024 image: 34 verified stories, a world map of where they happened, a
UTC timeline, and an explicit date check that throws out stories from the
wrong day.

The front page leads with six illustrated stories — Iran vowing to fight the
US naval blockade as mines burn tankers in the Strait of Hormuz; Shenzhou-24
launching Pakistan's first astronaut, Muhammad Zeeshan Ali, to the Tiangong
station; AI stocks crashing again as the Trump administration readies new
tariffs on 16 economies; an Israeli strike in Gaza City killing Hamas security
chief Naeem Abu Nahel; Huawei convicted on 10 of 12 counts in a US criminal
trial over its Iran business; and Zelenskiy confirming Ukraine hit a Russian
ship in the Gulf of Finland — followed by 28 more stories in brief, from the
Saudi strikes in Yemen and the Houthi hit on Riyadh's tallest tower to the
M5.6 Nepal quake, Malaysia's plan to return 6,500+ Rohingya to Myanmar, the
CIA/ODNI breach, and the US blacklisting of seven firms over chip diversion.

Every story was verified against a named source before the image was made
(Reuters, AP, Xinhua, AFP, UNAIDS, UN, UKMTO, IMD), and five wrong-date
stories are shown in the DATE CHECK box as discarded: the ICJ Myanmar genocide
ruling (19 Nov), Cyclone Akvan (20 Nov), the Senate Iran war-powers vote
(19 Nov), GTA VI's $1.84bn day one (19 Nov), and Anthropic's IPO close
(20 Nov).

## Run it

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib only) copies `entry.png` to
`$MAKEFUN_OUTPUT_DIR/entry.png` after verifying it is a whole JPEG of at most
1 MiB and exactly 1024×1024, then reads the output back and checks the bytes
are identical. Both runs write the same file.

## Files

- `entry.png` — the front page, 1024×1024 JPEG, 360,489 bytes
- `main.ts` — the entry program
- `LICENSE` — MIT
