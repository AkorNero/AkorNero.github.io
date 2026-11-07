# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS with no build step, previewable from disk or any static host. The site lives at the repo root (`index.html`, `style.css`, `script.js`). Motion is a separate optional layer, `motion.js`, using GSAP 3.15 (ScrollTrigger, SplitText, Flip) and Lenis 1.3, vendored in `vendor/` with no CDN. Fonts (Archivo, Courier Prime) are self-hosted in `fonts/` with their OFL licences; no request goes to Google. The page must stay complete without it, and nothing in it runs for reduced-motion visitors. Photos are served as AVIF/WebP via `<picture>` with the JPGs as fallback. A loader covers the first paint until fonts and first-screen images are in; on a reload or #link it returns the visitor to their spot behind the loader, then lifts and starts the hero. It only appears when JavaScript runs and always clears within 8s.

## Users

- **HR and recruiters**, first 10 seconds: need to know who Aravind is, what he does, where he is, and that he can work in Ireland without sponsorship.
- **Hiring managers and technical reviewers**, first 2 minutes: look for proof of the work in Experience and Projects & Research.

## Product Purpose

The personal portfolio homepage of Aravindkumar K S ("Aravind"), an AI/ML & Software Engineer in Cork, Ireland, with two years building production RAG and LLM systems on AWS at LTIMindtree and an MSc in Mathematical Modelling and Machine Learning (First Class Honours) from UCC. Target roles: AI Engineer, Forward Deployed Engineer and Software Engineer, in Ireland. Success is a visitor looking at the work and then following Aravind on LinkedIn or checking his GitHub.

## Positioning

Practical AI engineering, told plainly: what he built, how he checked it, and what he learned. A visitor should think "this person actually tests what he builds" within 3 seconds.

## Capabilities and Constraints

- Six sections in this order: Hero (with a quiet 4-number strip), About, Experience, Projects & Research, Education & credentials, Contact.
- Primary CTA: LinkedIn (https://linkedin.com/in/aravindkumar-ks/), with GitHub (https://github.com/AkorNero) as an equal pair, in the hero and again in Contact. "View my work" scrolls to Projects. "CV (PDF)" is a quiet text link, not a button.
- No email address, phone number, contact form or booking link anywhere.
- Past the hero, a slim copy of the masthead nav slides in when a mouse pointer nears the top edge, underlining the section in view. It carries a copy of the light/dark toggle. Pointer devices only; it is inert while hidden so it never duplicates the main nav for keyboard or screen-reader users.
- On mouse and trackpad devices the cursor is themed: an ink crosshair, an accent ring over anything clickable and an ink I-beam over text, each with a paper-coloured halo.
- The work-rights badge ("Stamp 1G, eligible to work in Ireland") is visible without scrolling.
- Experience has three roles: AI/ML Engineering (Independent Projects & Professional Development, Oct 2025 – Present), Senior Consultant at LTIMindtree (Oct 2022 – Aug 2024) and Graduate Engineer Trainee at LTIMindtree (Jul 2022 – Oct 2022). Experience bullets are copied word for word from the CV and never reworded. The Senior Consultant role shows four bullets, with the other five behind "Show more".
- Projects & Research has six case studies, each Problem → Built → Hard part → Result: four featured (Agentic RAG, LLM Evaluation Harness, Optimized LLM Inference Serving, MSc Research), then Serverless Observability and Customer Churn under "More projects", collapsed behind a "Show more" button.
- No Skills section: skills appear only as tools under each role and project.
- Aravind is never described as a mechanical engineer; the mechanical degree appears only in the Education table.

## Brand Commitments

- Voice: calm, specific, precise, humble. Never hype or self-promotion. Avoid "passionate", "unglamorous", "trustworthy", "hold up", "obsessed" and similar.
- Copy source: `Portfolio Story — tightened.md` is the only source of site copy, used verbatim. Its "Build notes" and "Things to fix before launch" lists are not site copy.
- Fact source: the master CV (`cv.pdf`). The story file is written from it; if the two disagree, the CV wins and the story file is corrected first.

## Evidence on Hand

- Copy: `Portfolio Story — tightened.md`, written from the master CV `cv.pdf`.
- Photos: `images/aravind.jpg` (hero strips) and `images/aravind-casual.jpg` (About).
- Public repo: https://github.com/AkorNero/Wendland-s-CSRBF-KAN (the MSc research). The other five projects have no public repo yet; do not invent links.
- The Agentic RAG result has no measured number yet; it stands without one until a real figure is supplied. Never show a placeholder on the site.
- CV: `cv.pdf` in the repo root is the master. The site links a published copy, `aravindkumar-ks-cv.pdf`, with PDF title metadata; regenerate it whenever `cv.pdf` changes.
- Do not fabricate numbers, logos, quotes, testimonials or skills.

## Product Principles

1. Show the work and how it was checked before anything about the person.
2. Plain words over claims; every number on the page comes from the story file.
3. The two actions, LinkedIn and GitHub, are always easy to find.
4. Recruiter facts (role, location, work rights) land in the first viewport.

## Accessibility & Inclusion

WCAG 2.1 AA contrast, keyboard-reachable controls with visible focus, reduced-motion respected, readable at 390px wide with no horizontal scroll.

## Search and AI discovery

Canonical URL: https://portfolio.aravind.click/. The page head carries Open Graph/Twitter tags (preview image `images/og.jpg`, 1200×630) and JSON-LD (`ProfilePage` → `Person`), whose facts must match the page. `robots.txt` allows all crawlers, including AI assistants' crawlers; `sitemap.xml` lists the page and the CV; `llms.txt` is a plain summary written only from site copy. Each project has its own anchor (`#agentic-rag`, `#llm-evaluation-harness`, `#llm-inference-serving`, `#msc-research`, `#serverless-observability`, `#customer-churn`). When copy changes, update `llms.txt`, the JSON-LD and the meta description with it.
