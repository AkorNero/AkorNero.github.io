# Portfolio mockup prompt — Aravindkumar K S

*Adapted from the Kestrel landing-page prompt. Copy everything inside the fence into your generator. Before running it, put the moodboard images in an `images/` folder next to where the tool runs. The file names below are the originals from the project folder.*

```text
Build a personal portfolio homepage for Aravindkumar K S ("Aravind"), an AI/ML &
Software Engineer in Cork, Ireland. It is a portfolio, not a product page.
Audience: HR and recruiters (first 10 seconds), then hiring managers and
technical reviewers (first 2 minutes).

Goal: visitors look at the work and then follow Aravind on LinkedIn or check his
GitHub. The primary CTA on every version is "LinkedIn", with "GitHub" beside it
as an equal pair. Both must appear in the hero and repeat in the Contact section
at the end. "View my work" scrolls to Projects. "CV (PDF)" is a quiet text link,
not a button. There is NO email address, phone number, contact form or booking
link anywhere. The work-rights badge ("Eligible to work in Ireland, no
sponsorship needed") must be visible without scrolling.

Intent: practical AI engineering, told plainly. The site should feel like a real,
humble person who does careful work: calm, specific and precise, never hype or
self-promotion. A visitor should think "this person actually tests what he
builds" within 3 seconds. Keep the page interesting through layout, imagery and
pacing, not through louder copy.

Content: use story-review/Portfolio Story — tightened.md as the only source of
copy. Use its text verbatim and do not invent facts, numbers, logos, quotes or
skills. Build the homepage with its 6 sections in this order:
  1. Hero (headline, sub-headline, 3 badges, links) with a quiet strip of 4
     numbers underneath (30%, 90%+, 15+, 16%), one line of context each
  2. About (one section, four short paragraphs; no chapters, no timeline)
  3. Experience (LTIMindtree role with its 4 headline bullets, a "Show more"
     toggle, tools as small chips; the internship as one line)
  4. Projects & Research (3 case-study cards: Agentic RAG, Serverless
     Observability on AWS, MSc KAN research with its benchmark table; tools as
     chips on each)
  5. Education & credentials (education, certifications, awards, Django Girls)
  6. Contact (the short closing line, the facts line, LinkedIn and GitHub)
There is no Skills section; skills appear only as the tools under each role and
project. Do not describe Aravind as a mechanical engineer anywhere; the
mechanical degree appears only in the Education table. Ignore the "Build notes"
and "Things to fix before launch" lists; they are not site copy. Where the copy
says "(add ...)", leave a visible placeholder.

Photo: Aravind will supply one portrait at images/aravind.jpg. Where a version's
hero is a portrait, put it in the hero slot; in every other version, put it in
the About section. Apply the direction's processing to it in CSS or canvas
(halftone, dither, grain, duotone, strips) but keep the face recognisable. If the
file is not there yet, use a flat stand-in of the same size and aspect.

Portfolio references (Aravind will add these links before running):
  - [portfolio link 1]
  - [portfolio link 2]
  - [portfolio link 3]
Study them for structure, pacing and interaction only. Do not copy their
colours, copy or imagery.

Structure to borrow from the layout references (structure only, never their
colours or icon cards): images/0c06773399efb14f923f55b2ec657ec6.webp for the
oversized name in the hero and experience as full-width rows of company / role /
dates; images/Screenshot 2026-10-23 165955.png for big numbers with two-line
captions.

Guardrails — always: one monumental image anchors the page; imagery is
processed, never raw (halftone, dither, grain, ASCII, linework); technical
marginalia (coordinates, IDs, ruler ticks, timestamps); type at extremes —
monumental display or tiny mono labels, little middle; near-monochrome ground
with a single warm accent.
Never: purple gradients, glossy 3D SaaS blobs, untextured stock photography,
rounded-everything friendliness, icon-grid feature rows, Inter/system-font-only
typography, evenly-distributed colorful palettes.

Marginalia should come from Aravind's world, not generic sci-fi: Cork's
coordinates (51.8985° N, 8.4756° W), year markers 2022 → today, plate and figure
numbers for case studies, metric readouts (RAGAS, latency p95, parameter counts),
CI/build IDs, ruler ticks.

Create 12 versions of this page, each in its own folder (v1a/ ... v6b/): two
variants for each of the six directions below. Same intent, content and
guardrails for all twelve.

Use subagents: give each of the 12 versions to its own subagent, running in
parallel. Each subagent gets this whole brief plus its one direction and variant,
reads that direction's reference images and the story file itself, and builds
only its own folder. When they finish, check every folder against the content
list and the guardrails, fix anything that drifts, and add a root index.html that
links to all 12 versions with their names. Do NOT blend directions. Each version commits fully to
its own aesthetic, and the two variants within a direction share its palette and
type system but differ in hero subject and placement.

IMPORTANT — hero images come later. Do NOT generate or source any imagery; the
only real image is Aravind's own photo, handled as described under Photo. For each version, reserve the hero slot exactly
where the placement note says (<img> or background with the correct aspect and
position) and fill it with a flat CSS stand-in that matches the direction's
palette. Size all typography and negative space as if the described image were
already there, so the real image drops in with zero layout changes.

--- DIRECTION 1 — Lab Notebook Collage ---
Aesthetic: scientific plate x Swiss editorial — warm paper ground (#E2DED5) with
grain, black ink (#1E1A1A), kraft and pale-mint paper strips (#D1C9BA, #CAD7C7),
typewriter-mono labels ("Fig. 1", "Pl. VII", coordinates), strict grid, crop
marks, periodic-table-style skill tiles, grotesk display.
References: images/3f338befd96cf12dfff732b6f88e33f5.jpg,
images/beabfda760d4ccbfd3f0fb302d8ee442.jpg,
images/c997e8229e4c2febff5691b12c91b252.jpg — read them before designing; match
feel, not content.

v1a — Specimen Strips. Accent: specimen red (#D94F4A).
Future hero: Aravind's portrait (images/aravind.jpg) as black-and-white halftone,
cut into vertical paper strips, interleaved with red and kraft strips carrying mono readouts (30%,
90%+, 16%).
Placement: strips occupy the right 55% at roughly 4:5, bleeding off the top;
headline and badges in the left column on bare paper; a hand-drawn red pencil
line crosses from the strips into the headline area.

v1b — Orbit Plate. Accent: orbit orange (#E15610).
Future hero: grayscale engraved plot of Wendland basis functions, the bell-shaped
curves from his MSc research, inside dotted orbit rings, with a thin vertical
orange axis line through its centre.
Placement: centred on the page at roughly 1:1; the axis line continues down the
whole page as the spine the sections hang from; headline left of the axis,
badges and buttons right of it.

--- DIRECTION 2 — Signal & Grain ---
Aesthetic: monochrome experimental poster — heavy film grain, halftone
dot-matrix faces, horizontal motion-blur bands, small widely tracked uppercase
lists with triangle bullets ("▸ #01. RETRIEVAL", "▸ GUARDRAILS",
"▸ EVALUATION"), thin connector lines, tiny mono indices. Big type is rare and
quiet. Accent: one warm ember (#E2683C) used only for the CTA and one data point
per section.
References: images/8d2019f4f9480bffaf26fbe766fab950.jpg,
images/229f6c7d8e3343d8b629ce4d48bf122c.jpg,
images/37389de7d25c8162cbb084a11cb5f218.jpg,
images/3aeb4d2f8a3eae733d5458f0c69a9743.jpg — read them before designing; match
feel, not content.

v2a — Frequency. Ground: void black (#0B0B09).
Future hero: Aravind's portrait (images/aravind.jpg), head and shoulders,
rendered as a coarse grey halftone dot matrix (dots #BEBDBE) dissolving into black at the edges, like a signal resolving
out of noise.
Placement: centred, portrait 2:3, occupying the middle third and most of the
viewport height; tiny label clusters float left and right of it joined by thin
lines; headline set small above, CTA row below.

v2b — Grain Fog. Ground: fog grey (#BEBDBE) with heavy grain.
Future hero: Aravind's portrait (images/aravind.jpg), soft, grainy and lightly
motion-blurred, with one sharp horizontal crop band across the eyes.
Placement: full-bleed 4:3 behind everything; the crop band sits at about 40%
height and doubles as the headline strip; "▸" label lists scattered lower left
and right; a single diagonal hairline links them.

--- DIRECTION 3 — Twilight Calm ---
Aesthetic: cinematic night-sky minimalism — deep night navy ground (#10162D),
slate (#34485D), sparse star specks, one thin glowing horizon line, extreme
negative space, light airy display sans at large sizes with generous tracking,
tiny mono year markers. Accent: horizon ember (#CB855F). Sky colour lives only
inside the hero image; the page ground stays flat navy.
References: images/8cff27645fd1931456594a627881ebca.jpg,
images/9a4303dbf7c4eda5d9f012924c4f3d48.jpg,
images/82a37aba436ecd0e316bf22eb00a274b.jpg,
images/2886e1de8d8637a139478d903feb0643.jpg,
images/acda74b881ec2adf40f6019e22bccc44.jpg — read them before designing; match
feel, not content.

v3a — Night Ridge.
Future hero: grain-processed night sky with sparse stars and a snow-lit mountain
ridge along the bottom.
Placement: full-bleed 16:9; the upper two thirds of empty sky is the headline
zone with small centred type; the ridge fills the lower third and the page
continues from its dark base.

v3b — Horizon Line.
Future hero: a thin panoramic band of dusk horizon, navy fading to ember at a
sharp black horizon, with grain.
Placement: a full-width strip at roughly 5:1 sitting at about 60% of the first
viewport; headline above it on flat navy, badges and buttons below it. The same horizon
line returns as the divider between sections.

--- DIRECTION 4 — Lo-fi Halftone Sky ---
Aesthetic: illustrated lo-fi linework — flat sky-colour ground, ink-outlined
cumulus clouds with stipple shading, tiny four-point sparkles, a small moon.
Type is sharp, not rounded: a condensed grotesk display and tiny mono labels.
Accent: cloud cream (#F8E0D4) for the CTA and highlights.
References: images/38c4933a44e49720e6f1fd5dd516f7d8.jpg,
images/cea46f745a7ee691435459383778ea93.jpg,
images/4c10e4d4591b0d6e90a548a005f78469.jpg — read them before designing; match
feel, not content.

v4a — Stipple Clouds. Ground: navy (#012245).
Future hero: a towering stippled cumulus cloud bank, cream tops shading to grey
(#616A7C), with ink outlines.
Placement: full-bleed; clouds fill the lower 45% of the first viewport and rise
higher on the right; headline and badges sit in the empty upper-left sky.

v4b — Moonlit Linework. Ground: midnight (#000E31).
Future hero: a large ink-linework cloud mass in pale grey and navy with a small
moon top-left, a few birds and power lines running diagonally.
Placement: right 60% at roughly 3:4, bleeding off the right edge; the power
lines continue across the left column as thin rules that the headline sits on.

--- DIRECTION 5 — Bold Poster Type ---
Aesthetic: typographic poster — an ultra-condensed display set at viewport size,
with an image passing in front of and behind the letters; tiny mono metadata in
the corners ("AI/ML ENGINEER", "CORK, IE", "01 // 08" section numbering);
paper grain. Every section opener is its own poster with one huge word (ABOUT,
BUILT, TESTED, STUDIED, CONTACT).
References: images/c08553b1d11c1fd894fa8c98e6f1822d.jpg,
images/c5f1c88a82c9495a00f652a1f1fdb33a.jpg,
images/d4cfcf999b514f4e0fbeee8c357b7590.jpg — read them before designing; match
feel, not content.

v5a — Sand & Charcoal. Ground: sand (#E5D8CF), letters warm charcoal
(#554D48), accent racing orange (#F7833A).
Future hero: halftone cut-out of Aravind's portrait (images/aravind.jpg), overlapping the giant word
ARAVIND, with a diagonal orange stripe cutting through the letters behind him.
Placement: the word spans the full width at about 60% of viewport height; the
figure stands centre-right, in front of some letters and behind others;
sub-headline and buttons tucked into the lower-right corner.

v5b — Cobalt & Cream. Ground: cobalt (#4C7898), letters cream (#E1D0BE),
accent mustard (#F7B820).
Future hero: grain-processed duotone (cream on cobalt) photo of a single object,
a circuit board or a server rack, rising through the stacked words
BUILT / AND TESTED.
Placement: words stacked in two lines filling the width; the object sits
centred, crossing both lines; tiny paragraph columns of the About text run
down the far left and right edges.

--- DIRECTION 6 — Electric Violet ---
Aesthetic: dark product-tech, made strict — a near-black ground, flat solid
colour blocks stacked like palette cards with mono hex-style labels (used for
the hero numbers and the case-study cards), sharp corners, a wide heavy
geometric display face, clean sans body. No gradients anywhere and no glow.
References: images/fa6217afbdd4cd2217fe88b5bd450038.jpg,
images/fd176be5cb90dae77061e556dc467317.jpg — read them before designing; match
feel, not content.

v6a — Violet Ink. Ground: Russian violet (#1F004B), blocks grape (#600DB5),
accent phlox (#EC00F0).
Future hero: Aravind's portrait (images/aravind.jpg), heavily dithered in violet
monotone, lit from the right.
Placement: right half at 4:5 against the ground; the left half is the headline
column; the four number blocks stack directly under the hero edge to edge.

v6b — Carbon & Mint. Ground: carbon (#0F1417), blocks royal purple (#6045F4)
and soft grey (#EBEBED), accent neon mint (#53E6D4).
Exception: this is the only version where the single accent is cool rather than
warm; every other guardrail still applies.
Future hero: fine contour-linework ribbons in mint and grey flowing across the
frame, like a loss surface drawn as a topographic map.
Placement: full-bleed behind the top of the page at 16:9; headline left on the
darkest area; the ribbons thin out behind the stacked colour blocks below.
```

## What changed from the Kestrel prompt

- **Brief and goal:** a portfolio for Aravind instead of a SaaS landing page. LinkedIn and GitHub are the calls to action, in the hero and in Contact. The CV is a quiet link, and there's no email, phone or form.
- **Content:** points to the revised story: 6 sections, a single About, no Skills section, Contact instead of "For recruiters", and the mechanical degree only in Education.
- **Photo:** your portrait at `images/aravind.jpg` goes in the hero where the hero is a portrait, and in About everywhere else. It's processed to match each direction, but your face stays recognisable.
- **Subagents:** one per version, run in parallel, with a final check pass and an index page linking all 12.
- **Portfolio references:** three placeholder lines. Replace them with your links before running.
- **Directions:** the six moodboard families, two variants each (`v1a` to `v6b`). The grid-fin heroes are replaced with your MSc basis-function plot and a circuit board.
- **Guardrails:** kept word for word. There's one added line of portfolio-specific marginalia and one scoped exception: `v6b` uses a cool mint accent. Delete `v6b` if you'd rather not bend the rules at all.
