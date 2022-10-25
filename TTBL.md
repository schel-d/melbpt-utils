# Timetable format (v2)

Timetables in MelbPT (TrainQuery) are stored as `.ttbl` files.

## Version declaration

The first lines of a valid `.ttbl` file must be:

```
[timetable]
version: 2
```

Any other content at the start of a file will result in the parser rejecting it
for being an unsupported version.

## Sections

Squared bracketed strings denote the start of a new "section". The string inside
the brackets is the "title", which itself may not contain any square brackets.

## Metadata

The section titled `[timetable]` (containing the version declaration) must be
the first section in the file, and stores metadata in a `"key: value"` format.

### Example

```
[timetable]
version: 2
created: 2022-08-22
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *
```

### Fields

| Field   | Description                                            | Required |
| ------- | ------------------------------------------------------ | -------- |
| version | Version number, must be `"2"`.                         | ✅       |
| created | Date the file was created.                             | ✅       |
| id      | Timetable ID as a decimal integer (see details below). | ✅       |
| line    | Line ID as a decimal integer.                          | ✅       |
| type    | Either `"main"`, `"temporary"`, or `"public-holiday"`. | ✅       |
| begins  | Date the timetable comes into effect, or `"*"`.        | ✅       |
| ends    | Date the timetable is retired, or `"*"`.               | ✅       |

### Timetable IDs

Timetable IDs must be between 0 to 1295 inclusive. The first character when
written in base-36 should ideally match the line ID written in base-36.

## Grids

After the `[timetable]` section, every other section must be a "grid" section,
and each `.ttbl` file must have at least one grid section. The title of a grid
section must contain two elements, separated by commas:

- The direction ID, e.g. `"down"`, or `"up-via-loop"`.
- The weekday range expressed as `"MTWTFSS"` with days outside the weekday range
  replaced with underscores (`"_"`), e.g. `"MTWT___"` for Monday-Thursday.

The content of the section must have a row for each stop in that direction on
this line, and each row must have (in order, separated by spaces):

- The stop ID (ideally written with 4 digits).
- A string (ideally the stop name) without any spaces. After parsing the file,
  this is generally ignored, but it helps a human reading the raw `.ttbl` file
  read the timetable without needing to cross-reference the stop IDs.
- A series of times, written in 24 hour format. A prefix of `">"` can be used
  to indicate that this time has rolled over to the next day.

An example of a timetable grid could be:

```
[down, MTWT___]
0106 frankston   07:04  10:37  12:56  16:16  23:38  >02:04
0158 leawarra    07:06  10:39  12:58  16:18  23:40  >02:06
0022 baxter      -      10:46  -      16:25  23:47  >02:13
0248 somerville  07:17  10:50  13:09  16:29  23:51  -
0279 tyabb       -      10:54  -      16:33  23:55  -
0125 hastings    -      10:59  -      16:38  >00:00 -
0033 bittern     -      11:03  -      16:42  >00:04 -
0191 morradoo    -      11:06  -      16:45  >00:07 -
0071 crib-point  -      11:09  -      16:48  >00:10 -
0259 stony-point 07:40  11:13  13:32  16:52  >00:14 -
```

Note that the 2:04am service will run each Tuesday-Friday morning despite being
part of the Monday-Thursday timetable.

## Complete example

The current Seymour line timetable at the time of writing (25 Oct 2022):

```
[timetable]
version: 2
created: 2022-10-22
id: 542
line: 15
type: main
begins: 2022-10-23
ends: *

[shepparton-up, MTWT___]
0245 shepparton         -      -      05:16  -      06:27  -      -      09:05  -      -      -      12:57  -      -      16:07  -      -      -
0188 mooroopna          -      -      05:21  -      06:32  -      -      09:10  -      -      -      13:02  -      -      16:12  -      -      -
0194 murchison-east     -      -      05:44  -      06:55  -      -      09:30  -      -      -      13:25  -      -      16:35  -      -      -
0196 nagambie           -      -      06:01  -      07:12  -      -      09:46  -      -      -      13:42  -      -      16:52  -      -      -
0244 seymour            05:03  05:38  06:24  07:05  07:35  08:16  09:16  10:13  11:16  12:16  13:16  14:05  15:45  16:26  17:15  18:16  19:53  21:56
0268 tallarook          05:09  05:44  06:30  07:11  -      08:22  09:22  10:19  11:22  12:22  13:22  14:11  15:51  16:32  -      18:22  19:59  22:02
0039 broadford          05:18  05:53  06:40  07:20  07:49  08:31  09:31  10:29  11:31  12:31  13:31  14:21  16:00  16:41  17:29  18:31  20:08  22:11
0151 kilmore-east       05:26  06:01  06:48  07:28  07:57  08:39  09:39  10:37  11:39  12:39  13:39  14:29  16:08  16:49  17:37  18:39  20:16  22:19
0287 wandong            05:32  06:07  06:54  07:34  08:04  08:45  09:45  10:43  11:45  12:45  13:45  14:35  16:14  16:55  17:44  18:45  20:22  22:25
0129 heathcote-junction 05:35  06:10  -      07:37  -      08:48  09:48  10:46  11:48  12:48  13:48  14:38  16:17  16:58  -      18:48  20:25  22:28
0286 wallan             05:40  06:15  07:01  07:42  08:10  08:53  09:53  10:51  11:53  12:53  13:53  14:43  16:22  17:03  17:50  18:53  20:30  22:33
0082 donnybrook         05:48  06:23  07:10  07:50  08:19  09:01  10:01  11:00  12:01  13:01  14:01  14:52  16:30  17:11  17:59  19:01  20:38  22:41
0068 craigieburn        -      -      -      -      -      09:10  10:10  -      12:10  13:10  14:10  -      16:39  17:20  -      19:10  20:47  22:50
0040 broadmeadows       06:04  06:40  07:30  08:06  08:38  09:18  10:18  11:18  12:18  13:18  14:18  15:08  16:48  17:29  18:17  19:18  20:55  22:58
0096 essendon           06:17  06:54  -      08:20  -      -      -      -      -      -      -      -      -      -      -      -      -      -
0204 north-melbourne    06:27  07:05  07:54  08:32  09:04  09:40  10:32  -      12:32  -      -      -      -      -      -      -      -      -
0253 southern-cross     06:34  07:12  08:02  08:39  09:10  09:47  10:39  11:39  12:39  13:39  14:39  15:39  17:19  18:03  18:48  19:41  21:19  23:19

[albury-up, MTWT___]
0004 albury             06:45  12:51  17:27
0308 wodonga            06:56  13:02  17:38
0057 chiltern           07:13  13:19  17:55
0256 springhurst        07:22  13:28  18:04
0288 wangaratta         07:38  13:44  18:20
0028 benalla            08:03  14:09  18:45
0285 violet-town        08:17  14:23  18:59
0097 euroa              08:27  14:33  19:09
0015 avenel             08:46  14:52  19:28
0244 seymour            09:02  15:08  19:44
0268 tallarook          -      -      -
0039 broadford          -      -      -
0151 kilmore-east       -      -      -
0287 wandong            -      -      -
0129 heathcote-junction -      -      -
0286 wallan             -      -      -
0082 donnybrook         -      -      -
0068 craigieburn        -      -      -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0204 north-melbourne    -      -      -
0253 southern-cross     10:27  16:33  21:45

[shepparton-down, MTWT___]
0253 southern-cross     05:55  07:05  08:14  09:26  10:36  11:36  12:36  13:36  14:36  15:33  16:07  16:37  17:05  17:33  18:28  19:07  20:05  21:43
0204 north-melbourne    -      -      -      -      -      -      12:41  13:41  14:41  15:38  -      16:42  17:10  17:38  18:33  19:11  20:10  21:48
0096 essendon           -      -      -      -      -      -      -      -      -      -      16:20  16:49  17:17  17:48  18:40  -      -      -
0040 broadmeadows       06:16  07:27  08:43  09:52  10:56  11:56  12:58  13:56  14:56  16:01  16:33  17:04  17:33  18:04  18:55  19:28  20:25  22:03
0068 craigieburn        06:24  07:38  08:55  -      11:04  12:04  -      14:04  15:08  -      -      -      -      -      -      -      20:33  22:11
0082 donnybrook         06:30  07:43  09:00  10:09  11:09  12:09  13:10  14:09  15:13  16:17  16:51  17:22  17:50  18:21  19:11  19:41  20:38  22:16
0286 wallan             06:39  07:52  09:09  10:18  11:18  12:18  13:20  14:18  15:22  16:26  17:01  17:31  17:59  18:30  19:20  19:51  20:47  22:25
0129 heathcote-junction 06:44  07:57  09:14  10:23  11:23  12:23  13:25  14:23  15:27  16:31  -      17:36  18:04  18:35  19:25  -      20:52  22:30
0287 wandong            06:47  08:00  09:17  10:26  11:26  12:26  13:27  14:26  15:30  16:33  17:07  17:38  18:06  18:37  19:27  19:57  20:55  22:33
0151 kilmore-east       06:53  08:06  09:23  10:32  11:32  12:32  13:34  14:32  15:36  16:40  17:13  17:45  18:13  18:44  19:34  20:03  21:01  22:39
0039 broadford          07:01  08:14  09:31  10:40  11:40  12:40  13:42  14:40  15:44  16:47  17:21  17:52  18:20  18:51  19:41  20:11  21:09  22:47
0268 tallarook          07:11  08:23  09:40  10:50  11:49  12:49  13:52  14:49  15:53  16:56  -      18:01  18:29  19:00  19:50  -      21:18  22:56
0244 seymour            07:38  08:33  09:50  11:04  11:59  12:59  14:08  14:59  16:03  17:07  17:43  18:12  18:40  19:11  20:01  20:34  21:28  23:06
0196 nagambie           07:56  -      -      11:22  -      -      14:26  -      -      -      18:01  -      -      -      -      20:52  -      -
0194 murchison-east     08:12  -      -      11:38  -      -      14:42  -      -      -      18:17  -      -      -      -      21:08  -      -
0188 mooroopna          08:36  -      -      12:02  -      -      15:06  -      -      -      18:41  -      -      -      -      21:32  -      -
0245 shepparton         08:45  -      -      12:10  -      -      15:15  -      -      -      18:50  -      -      -      -      21:41  -      -

[albury-down, MTWT___]
0253 southern-cross     07:07  12:04  18:02
0204 north-melbourne    -      -      -
0096 essendon           -      -      -
0040 broadmeadows       07:35  12:32  18:30
0068 craigieburn        -      -      -
0082 donnybrook         -      -      -
0286 wallan             -      -      -
0129 heathcote-junction -      -      -
0287 wandong            -      -      -
0151 kilmore-east       -      -      -
0039 broadford          -      -      -
0268 tallarook          -      -      -
0244 seymour            08:26  13:23  19:21
0015 avenel             08:37  13:34  19:32
0097 euroa              08:56  13:53  19:51
0285 violet-town        09:07  14:04  20:02
0028 benalla            09:24  14:21  20:19
0288 wangaratta         09:49  14:46  20:44
0256 springhurst        10:02  14:59  20:57
0057 chiltern           10:10  15:07  21:05
0308 wodonga            10:29  15:26  21:24
0004 albury             10:43  15:40  21:38

[shepparton-up, ____F__]
0245 shepparton         -      -      05:16  -      06:27  -      -      09:05  -      -      -      12:57  -      -      16:07  -      -      -
0188 mooroopna          -      -      05:21  -      06:32  -      -      09:10  -      -      -      13:02  -      -      16:12  -      -      -
0194 murchison-east     -      -      05:44  -      06:55  -      -      09:30  -      -      -      13:25  -      -      16:35  -      -      -
0196 nagambie           -      -      06:01  -      07:12  -      -      09:46  -      -      -      13:42  -      -      16:52  -      -      -
0244 seymour            05:03  05:38  06:24  07:05  07:35  08:16  09:16  10:13  11:16  12:16  13:16  14:05  15:45  16:26  17:15  18:16  19:53  21:56
0268 tallarook          05:09  05:44  06:30  07:11  -      08:22  09:22  10:19  11:22  12:22  13:22  14:11  15:51  16:32  -      18:22  19:59  22:02
0039 broadford          05:18  05:53  06:40  07:20  07:49  08:31  09:31  10:29  11:31  12:31  13:31  14:21  16:00  16:41  17:29  18:31  20:08  22:11
0151 kilmore-east       05:26  06:01  06:48  07:28  07:57  08:39  09:39  10:37  11:39  12:39  13:39  14:29  16:08  16:49  17:37  18:39  20:16  22:19
0287 wandong            05:32  06:07  06:54  07:34  08:04  08:45  09:45  10:43  11:45  12:45  13:45  14:35  16:14  16:55  17:44  18:45  20:22  22:25
0129 heathcote-junction 05:35  06:10  -      07:37  -      08:48  09:48  10:46  11:48  12:48  13:48  14:38  16:17  16:58  -      18:48  20:25  22:28
0286 wallan             05:40  06:15  07:01  07:42  08:10  08:53  09:53  10:51  11:53  12:53  13:53  14:43  16:22  17:03  17:50  18:53  20:30  22:33
0082 donnybrook         05:48  06:23  07:10  07:50  08:19  09:01  10:01  11:00  12:01  13:01  14:01  14:52  16:30  17:11  17:59  19:01  20:38  22:41
0068 craigieburn        -      -      -      -      -      09:10  10:10  -      12:10  13:10  14:10  -      16:39  17:20  -      19:10  20:47  22:50
0040 broadmeadows       06:04  06:40  07:30  08:06  08:38  09:18  10:18  11:18  12:18  13:18  14:18  15:08  16:48  17:29  18:17  19:18  20:55  22:58
0096 essendon           06:17  06:54  -      08:20  -      -      -      -      -      -      -      -      -      -      -      -      -      -
0204 north-melbourne    06:27  07:05  07:54  08:32  09:04  09:40  10:32  -      12:32  -      -      -      -      -      -      -      -      -
0253 southern-cross     06:34  07:12  08:02  08:39  09:10  09:47  10:39  11:39  12:39  13:39  14:39  15:39  17:19  18:03  18:48  19:41  21:19  23:19

[albury-up, ____F__]
0004 albury             06:45  12:51  17:27
0308 wodonga            06:56  13:02  17:38
0057 chiltern           07:13  13:19  17:55
0256 springhurst        07:22  13:28  18:04
0288 wangaratta         07:38  13:44  18:20
0028 benalla            08:03  14:09  18:45
0285 violet-town        08:17  14:23  18:59
0097 euroa              08:27  14:33  19:09
0015 avenel             08:46  14:52  19:28
0244 seymour            09:02  15:08  19:44
0268 tallarook          -      -      -
0039 broadford          -      -      -
0151 kilmore-east       -      -      -
0287 wandong            -      -      -
0129 heathcote-junction -      -      -
0286 wallan             -      -      -
0082 donnybrook         -      -      -
0068 craigieburn        -      -      -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0204 north-melbourne    -      -      -
0253 southern-cross     10:27  16:33  21:45

[shepparton-down, ____F__]
0253 southern-cross     05:55  07:05  08:14  09:26  10:36  11:36  12:36  13:36  14:36  15:33  16:07  16:37  17:05  17:33  18:28  19:07  20:05  21:43  23:43
0204 north-melbourne    -      -      -      -      -      -      12:41  13:41  14:41  15:38  -      16:42  17:10  17:38  18:33  19:11  20:10  21:48  23:48
0096 essendon           -      -      -      -      -      -      -      -      -      -      16:20  16:49  17:17  17:48  18:40  -      -      -      -
0040 broadmeadows       06:16  07:27  08:43  09:52  10:56  11:56  12:58  13:56  14:56  16:01  16:33  17:04  17:33  18:04  18:55  19:28  20:25  22:03  >00:03
0068 craigieburn        06:24  07:38  08:55  -      11:04  12:04  -      14:04  15:08  -      -      -      -      -      -      -      20:33  22:11  >00:11
0082 donnybrook         06:30  07:43  09:00  10:09  11:09  12:09  13:10  14:09  15:13  16:17  16:51  17:22  17:50  18:21  19:11  19:41  20:38  22:16  >00:16
0286 wallan             06:39  07:52  09:09  10:18  11:18  12:18  13:20  14:18  15:22  16:26  17:01  17:31  17:59  18:30  19:20  19:51  20:47  22:25  >00:25
0129 heathcote-junction 06:44  07:57  09:14  10:23  11:23  12:23  13:25  14:23  15:27  16:31  -      17:36  18:04  18:35  19:25  -      20:52  22:30  >00:30
0287 wandong            06:47  08:00  09:17  10:26  11:26  12:26  13:27  14:26  15:30  16:33  17:07  17:38  18:06  18:37  19:27  19:57  20:55  22:33  >00:33
0151 kilmore-east       06:53  08:06  09:23  10:32  11:32  12:32  13:34  14:32  15:36  16:40  17:13  17:45  18:13  18:44  19:34  20:03  21:01  22:39  >00:39
0039 broadford          07:01  08:14  09:31  10:40  11:40  12:40  13:42  14:40  15:44  16:47  17:21  17:52  18:20  18:51  19:41  20:11  21:09  22:47  >00:47
0268 tallarook          07:11  08:23  09:40  10:50  11:49  12:49  13:52  14:49  15:53  16:56  -      18:01  18:29  19:00  19:50  -      21:18  22:56  >00:56
0244 seymour            07:38  08:33  09:50  11:04  11:59  12:59  14:08  14:59  16:03  17:07  17:43  18:12  18:40  19:11  20:01  20:34  21:28  23:06  >01:06
0196 nagambie           07:56  -      -      11:22  -      -      14:26  -      -      -      18:01  -      -      -      -      20:52  -      -      -
0194 murchison-east     08:12  -      -      11:38  -      -      14:42  -      -      -      18:17  -      -      -      -      21:08  -      -      -
0188 mooroopna          08:36  -      -      12:02  -      -      15:06  -      -      -      18:41  -      -      -      -      21:32  -      -      -
0245 shepparton         08:45  -      -      12:10  -      -      15:15  -      -      -      18:50  -      -      -      -      21:41  -      -      -

[albury-down, ____F__]
0253 southern-cross     07:07  12:04  18:02
0204 north-melbourne    -      -      -
0096 essendon           -      -      -
0040 broadmeadows       07:35  12:32  18:30
0068 craigieburn        -      -      -
0082 donnybrook         -      -      -
0286 wallan             -      -      -
0129 heathcote-junction -      -      -
0287 wandong            -      -      -
0151 kilmore-east       -      -      -
0039 broadford          -      -      -
0268 tallarook          -      -      -
0244 seymour            08:26  13:23  19:21
0015 avenel             08:37  13:34  19:32
0097 euroa              08:56  13:53  19:51
0285 violet-town        09:07  14:04  20:02
0028 benalla            09:24  14:21  20:19
0288 wangaratta         09:49  14:46  20:44
0256 springhurst        10:02  14:59  20:57
0057 chiltern           10:10  15:07  21:05
0308 wodonga            10:29  15:26  21:24
0004 albury             10:43  15:40  21:38

[shepparton-up, _____S_]
0245 shepparton         -      07:08  -      -      -      12:28  -      -      16:08  -      -
0188 mooroopna          -      07:13  -      -      -      12:33  -      -      16:13  -      -
0194 murchison-east     -      07:36  -      -      -      12:56  -      -      16:36  -      -
0196 nagambie           -      07:53  -      -      -      13:13  -      -      16:53  -      -
0244 seymour            06:17  08:16  09:37  10:57  12:17  13:36  14:57  15:57  17:16  18:37  20:27
0268 tallarook          06:23  08:22  09:43  11:03  12:23  13:42  15:03  16:03  17:22  18:43  20:33
0039 broadford          06:32  08:32  09:52  11:12  12:32  13:52  15:12  16:12  17:32  18:52  20:42
0151 kilmore-east       06:40  08:40  10:00  11:20  12:40  14:00  15:20  16:20  17:40  19:00  20:50
0287 wandong            06:46  08:46  10:06  11:26  12:46  14:06  15:26  16:26  17:46  19:06  20:56
0129 heathcote-junction 06:49  08:49  10:09  11:29  12:49  14:09  15:29  16:29  17:49  19:09  20:59
0286 wallan             06:54  08:54  10:14  11:34  12:54  14:14  15:34  16:34  17:54  19:14  21:04
0082 donnybrook         07:02  09:03  10:22  11:42  13:02  14:23  15:42  16:42  18:03  19:22  21:12
0068 craigieburn        07:11  -      10:31  11:51  13:11  -      15:51  16:51  -      19:31  21:21
0040 broadmeadows       07:18  09:17  10:38  11:58  13:18  14:37  15:58  16:58  18:17  19:38  21:28
0096 essendon           -      -      -      -      -      -      -      -      -      -      -
0204 north-melbourne    -      -      -      -      -      -      -      -      -      -      -
0253 southern-cross     07:37  09:37  10:57  12:17  13:37  14:57  16:17  17:17  18:37  19:57  21:47

[albury-up, _____S_]
0004 albury             06:45  12:51  17:27
0308 wodonga            06:56  13:02  17:38
0057 chiltern           07:13  13:19  17:55
0256 springhurst        07:22  13:28  18:04
0288 wangaratta         07:38  13:44  18:20
0028 benalla            08:03  14:09  18:45
0285 violet-town        08:17  14:23  18:59
0097 euroa              08:27  14:33  19:09
0015 avenel             08:46  14:52  19:28
0244 seymour            09:02  15:08  19:44
0268 tallarook          -      -      -
0039 broadford          -      -      -
0151 kilmore-east       -      -      -
0287 wandong            -      -      -
0129 heathcote-junction -      -      -
0286 wallan             -      -      -
0082 donnybrook         -      -      -
0068 craigieburn        -      -      -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0204 north-melbourne    -      -      -
0253 southern-cross     10:27  16:33  21:45

[shepparton-down, _____S_]
0253 southern-cross     07:16  09:16  10:36  11:36  12:36  13:56  15:16  16:36  17:36  18:36  20:15  21:45  23:45
0204 north-melbourne    -      -      -      -      -      -      -      -      -      -      -      -      -
0096 essendon           -      -      -      -      -      -      -      -      -      -      -      -      -
0040 broadmeadows       07:36  09:38  10:56  11:56  12:58  14:16  15:36  16:56  17:56  18:58  20:35  22:05  >00:05
0068 craigieburn        07:44  -      11:04  12:04  -      14:24  15:44  17:04  18:04  -      20:43  22:13  >00:13
0082 donnybrook         07:49  09:51  11:09  12:09  13:10  14:29  15:49  17:09  18:09  -      20:48  22:18  >00:18
0286 wallan             07:58  10:00  11:18  12:18  13:20  14:38  15:58  17:18  18:18  19:18  20:57  22:27  >00:27
0129 heathcote-junction 08:03  10:05  11:23  12:23  13:25  14:43  16:03  17:23  18:23  -      21:02  22:32  >00:32
0287 wandong            08:06  10:08  11:26  12:26  13:27  14:46  16:06  17:26  18:26  19:25  21:05  22:35  >00:35
0151 kilmore-east       08:12  10:14  11:32  12:32  13:34  14:52  16:12  17:32  18:32  19:31  21:11  22:41  >00:41
0039 broadford          08:20  10:22  11:40  12:40  13:42  15:00  16:20  17:40  18:40  19:39  21:19  22:49  >00:49
0268 tallarook          08:29  10:32  11:49  12:49  13:52  15:09  16:29  17:49  18:49  -      21:28  22:58  >00:58
0244 seymour            08:39  10:46  11:59  12:59  14:05  15:19  16:39  17:59  18:59  20:01  21:38  23:08  >01:08
0196 nagambie           -      11:04  -      -      14:23  -      -      -      -      20:19  -      -      -
0194 murchison-east     -      11:20  -      -      14:39  -      -      -      -      20:35  -      -      -
0188 mooroopna          -      11:44  -      -      15:03  -      -      -      -      20:59  -      -      -
0245 shepparton         -      11:53  -      -      15:12  -      -      -      -      21:08  -      -      -

[albury-down, _____S_]
0253 southern-cross     07:07  12:04  18:02
0204 north-melbourne    -      -      -
0096 essendon           -      -      -
0040 broadmeadows       07:35  12:32  18:30
0068 craigieburn        -      -      -
0082 donnybrook         -      -      -
0286 wallan             -      -      -
0129 heathcote-junction -      -      -
0287 wandong            -      -      -
0151 kilmore-east       -      -      -
0039 broadford          -      -      -
0268 tallarook          -      -      -
0244 seymour            08:26  13:23  19:21
0015 avenel             08:37  13:34  19:32
0097 euroa              08:56  13:53  19:51
0285 violet-town        09:07  14:04  20:02
0028 benalla            09:24  14:21  20:19
0288 wangaratta         09:49  14:46  20:44
0256 springhurst        10:02  14:59  20:57
0057 chiltern           10:10  15:07  21:05
0308 wodonga            10:29  15:26  21:24
0004 albury             10:43  15:40  21:38

[shepparton-up, ______S]
0245 shepparton         -      07:08  -      -      -      12:28  -      -      16:08  -      -
0188 mooroopna          -      07:13  -      -      -      12:33  -      -      16:13  -      -
0194 murchison-east     -      07:36  -      -      -      12:56  -      -      16:36  -      -
0196 nagambie           -      07:53  -      -      -      13:13  -      -      16:53  -      -
0244 seymour            07:00  08:16  09:37  10:57  12:17  13:36  14:57  15:57  17:16  18:37  20:27
0268 tallarook          07:06  08:22  09:43  11:03  12:23  13:42  15:03  16:03  17:22  18:43  20:33
0039 broadford          07:15  08:32  09:52  11:12  12:32  13:52  15:12  16:12  17:32  18:52  20:42
0151 kilmore-east       07:23  08:40  10:00  11:20  12:40  14:00  15:20  16:20  17:40  19:00  20:50
0287 wandong            07:29  08:46  10:06  11:26  12:46  14:06  15:26  16:26  17:46  19:06  20:56
0129 heathcote-junction 07:32  08:49  10:09  11:29  12:49  14:09  15:29  16:29  17:49  19:09  20:59
0286 wallan             07:37  08:54  10:14  11:34  12:54  14:14  15:34  16:34  17:54  19:14  21:04
0082 donnybrook         07:45  09:03  10:22  11:42  13:02  14:23  15:42  16:42  18:03  19:22  21:12
0068 craigieburn        07:54  -      10:31  11:51  13:11  -      15:51  16:51  -      19:31  21:21
0040 broadmeadows       08:00  09:17  10:38  11:58  13:18  14:37  15:58  16:58  18:17  19:38  21:28
0096 essendon           -      -      -      -      -      -      -      -      -      -      -
0204 north-melbourne    -      -      -      -      -      -      -      -      -      -      -
0253 southern-cross     08:19  09:37  10:57  12:17  13:37  14:57  16:17  17:17  18:37  19:57  21:47

[albury-up, ______S]
0004 albury             06:45  12:51  17:27
0308 wodonga            06:56  13:02  17:38
0057 chiltern           07:13  13:19  17:55
0256 springhurst        07:22  13:28  18:04
0288 wangaratta         07:38  13:44  18:20
0028 benalla            08:03  14:09  18:45
0285 violet-town        08:17  14:23  18:59
0097 euroa              08:27  14:33  19:09
0015 avenel             08:46  14:52  19:28
0244 seymour            09:02  15:08  19:44
0268 tallarook          -      -      -
0039 broadford          -      -      -
0151 kilmore-east       -      -      -
0287 wandong            -      -      -
0129 heathcote-junction -      -      -
0286 wallan             -      -      -
0082 donnybrook         -      -      -
0068 craigieburn        -      -      -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0204 north-melbourne    -      -      -
0253 southern-cross     10:27  16:33  21:45

[shepparton-down, ______S]
0253 southern-cross     09:16  10:36  11:36  12:36  13:56  15:16  16:36  17:36  18:36  20:15  21:45
0204 north-melbourne    -      -      -      -      -      -      -      -      -      -      -
0096 essendon           -      -      -      -      -      -      -      -      -      -      -
0040 broadmeadows       09:38  10:56  11:56  12:58  14:16  15:36  16:56  17:56  18:58  20:35  22:05
0068 craigieburn        -      11:04  12:04  -      14:24  15:44  17:04  18:04  -      20:43  22:13
0082 donnybrook         09:51  11:09  12:09  13:10  14:29  15:49  17:09  18:09  -      20:48  22:18
0286 wallan             10:00  11:18  12:18  13:20  14:38  15:58  17:18  18:18  19:18  20:57  22:27
0129 heathcote-junction 10:05  11:23  12:23  13:25  14:43  16:03  17:23  18:23  -      21:02  22:32
0287 wandong            10:08  11:26  12:26  13:27  14:46  16:06  17:26  18:26  19:25  21:05  22:35
0151 kilmore-east       10:14  11:32  12:32  13:34  14:52  16:12  17:32  18:32  19:31  21:11  22:41
0039 broadford          10:22  11:40  12:40  13:42  15:00  16:20  17:40  18:40  19:39  21:19  22:49
0268 tallarook          10:32  11:49  12:49  13:52  15:09  16:29  17:49  18:49  -      21:28  22:58
0244 seymour            10:46  11:59  12:59  14:05  15:19  16:39  17:59  18:59  20:01  21:38  23:08
0196 nagambie           11:04  -      -      14:23  -      -      -      -      20:19  -      -
0194 murchison-east     11:20  -      -      14:39  -      -      -      -      20:35  -      -
0188 mooroopna          11:44  -      -      15:03  -      -      -      -      20:59  -      -
0245 shepparton         11:53  -      -      15:12  -      -      -      -      21:08  -      -

[albury-down, ______S]
0253 southern-cross     07:07  12:04  18:02
0204 north-melbourne    -      -      -
0096 essendon           -      -      -
0040 broadmeadows       07:35  12:32  18:30
0068 craigieburn        -      -      -
0082 donnybrook         -      -      -
0286 wallan             -      -      -
0129 heathcote-junction -      -      -
0287 wandong            -      -      -
0151 kilmore-east       -      -      -
0039 broadford          -      -      -
0268 tallarook          -      -      -
0244 seymour            08:26  13:23  19:21
0015 avenel             08:37  13:34  19:32
0097 euroa              08:56  13:53  19:51
0285 violet-town        09:07  14:04  20:02
0028 benalla            09:24  14:21  20:19
0288 wangaratta         09:49  14:46  20:44
0256 springhurst        10:02  14:59  20:57
0057 chiltern           10:10  15:07  21:05
0308 wodonga            10:29  15:26  21:24
0004 albury             10:43  15:40  21:38
```
