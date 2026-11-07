# Portfolio Story — Aravindkumar K S (tightened)

**The thread: practical AI engineering, told plainly. What I built, how I checked it, and what I learned.**

HR should get who you are in 10 seconds (Hero). Hiring managers should find proof in 2 minutes (Experience, Projects & Research). Skills are not a separate section: they show up as the tools listed under each role and project. Everything below is site copy; design guidance is in **Build notes** at the end.

| # | Section | For |
| --- | --- | --- |
| 1 | Hero (with a few numbers) | HR, first 10 seconds |
| 2 | About | Everyone |
| 3 | Experience | Hiring managers |
| 4 | Projects & Research | Technical reviewers, ML teams |
| 5 | Education & credentials | HR |
| 6 | Contact | Everyone, last stop |

## 1. Hero

**Headline:** AI engineer. Retrieval, LLM tooling, and the evaluation that keeps them honest.

**Badges:** AWS Certified ML Engineer – Associate · MSc, First Class Honours, UCC · Stamp 1G, eligible to work in Ireland

**Links:** View my work · LinkedIn · GitHub · CV (PDF)

**A few numbers from the work** (a quiet strip under the hero):

| Number | Label | Where it's from |
| --- | --- | --- |
| ~30% | less policy-document processing time | Insurance RAG assistant at LTIMindtree |
| 95%+ | extraction accuracy | 20+ vendor document formats into a Neo4j knowledge graph |
| ~3x | inference throughput | Self-hosted vLLM service vs a naive Hugging Face pipeline |
| 16% | fewer parameters | MSc research, FC-KAN accuracy matched, 21–23% faster training |

## 2. About

I'm an AI/ML engineer in Cork. Most of my work so far has been on retrieval systems and the tooling around LLMs: getting the right documents in front of the model, checking what comes out, and keeping it running.

I spent two years at LTIMindtree in Bengaluru, starting as a graduate engineer trainee. Generative AI took off just after I joined, so I learned a lot of it on the job: a production RAG assistant for insurance documents, the extraction pipeline and knowledge graph behind it, and Studio, the team's model portal, with the gateway and guardrails around it, all running on AWS.

In 2024 I moved to Ireland for an MSc in Mathematical Modelling and Machine Learning at UCC, because I wanted to understand the models better than I did. My research looked at making Kolmogorov–Arnold Networks smaller and faster to train.

Since finishing, I've built projects of my own (an agentic RAG assistant, a self-hosted vLLM inference service and an LLM evaluation harness), earned the AWS ML Engineer certification, completed LangChain and Anthropic MCP courses, and mentored first-time programmers at Django Girls Cork. I also work with coding agents such as Claude Code, including MCP servers, skills, hooks and subagents.

## 3. Experience

### AI/ML Engineering — Independent Projects & Professional Development, Cork, Ireland · Oct 2025 – Present

- Designed and built production-grade AI systems to deepen applied LLM and MLOps expertise — an agentic RAG assistant, a self-hosted vLLM inference service, and a CI-integrated LLM evaluation harness (detailed under Projects).
- Earned the AWS Certified Machine Learning Engineer – Associate certification and completed LangChain and Anthropic Model Context Protocol (MCP) courses, formalizing cloud ML and agent-tooling skills.
- Mentored first-time programmers as a Django Girls volunteer and stayed engaged with the AI engineering community while pursuing full-time AI Engineer / Forward Deployed Engineer / Software Engineer roles

**Tools:** LangChain · vLLM · RAGAS · DeepEval · Langfuse · AWS · Model Context Protocol (MCP)

### Senior Consultant – Package Implementation, Insurance R&D — LTIMindtree (now LTM), Bengaluru, India · Oct 2022 – Aug 2024

I worked on GenAI projects in insurance R&D, from first proof of concept to production.

- Led the proof-of-concept and co-built a production insurance RAG assistant (LangChain, FastAPI), cutting bulk policy-document processing time ~30% including manual extraction-quality review, at a 4–5s p95 time-to-first-token.
- Owned an event-driven extraction pipeline (Textract, S3, SQS with dead-letter queues, Lambda consumers, Step Functions) parsing 20+ vendor formats into a Neo4j knowledge-graph insurance ontology at 95%+ accuracy, auto-quarantining malformed inputs.
- Co-built Studio, the team's central model portal (React, FastAPI) providing model access, management and governance — rate limiting, PII redaction, content moderation, domain gating and application-based access control.
- Contributed to evaluation baselines using a RAGAS harness and Langfuse tracing, wiring context-relevance and faithfulness checks into CI as release gates to catch retrieval regressions.

**Show more:**

- Built ingestion, chunking and embedding pipelines feeding Chroma-based hybrid retrieval (dense vectors + BM25 via Reciprocal Rank Fusion), sustaining bulk re-index throughput through SQS-buffered Lambda workers, with versions tracked in MLflow.
- Independently built a VS Code extension on Studio bringing LLM chat, code generation, review and editing, model switching and history into the IDE for the engineering team.
- Contributed to the LLM inference gateway behind Studio (FastAPI edge, internal gRPC/protobuf), adding a Redis semantic cache that cut redundant LLM calls ~5% and helping enforce GDPR-compliant PII handling.
- Contributed to migrating infrastructure-as-code from CloudFormation to Terraform, building reusable ECS/ECR/Lambda/S3 modules with least-privilege IAM and encryption, and cutting AWS spend ~10% through ECS right-sizing and autoscaling.
- Contributed to containerized blue-green ECS releases via GitHub Actions and CodeBuild, with SonarQube and Trivy security gates enabling low-risk deployments across Dev, Test and Prod.

**Tools:** LangChain · FastAPI · RAG · Hybrid retrieval (BM25 + RRF) · Chroma · Neo4j · Knowledge graphs · Amazon Textract · AWS Lambda · S3 · SQS · Step Functions · ECS · ECR · MLflow · RAGAS · Langfuse · React · gRPC/protobuf · Redis · PII redaction · Terraform · CloudFormation · GitHub Actions · CodeBuild · SonarQube · Trivy

### Graduate Engineer Trainee — LTIMindtree (now LTM), Bengaluru, India · Jul 2022 – Oct 2022

- Built Angular tooling for configuring data-pipeline scan jobs and reviewing classification results and privacy insights, giving analysts a self-serve interface to manage scans without engineering support.
- Designed PostgreSQL data models with Spring Boot and Hibernate ORM for data sources, job-run history and classified elements, supporting reliable tracking of scan lineage across runs.
- Wrote SQL queries and aggregations powering data-discovery and coverage-monitoring dashboards, giving stakeholders visibility into classification coverage across data sources.
- Delivered maintainable features in sprint increments through Agile cycles and peer reviews, improving code quality and reducing review turnaround.

**Tools:** Java · Spring Boot · Hibernate · Angular · PostgreSQL · SQL · Agile

## 4. Projects & Research

Every case study follows one shape: **Problem → What I built → What made it hard → Result → Links.**

### Agentic RAG & Conversational Knowledge Assistant

**Card:** An assistant that decides for itself whether to search documents, query a database or look something up on the web.

- **Problem:** Most chatbots answer every question the same way, so they guess when the answer lives in a database or online.
- **Built:** A LangChain tool-calling agent that routes each query across vector search, SQL lookup and web search, returning Pydantic-validated structured outputs over multi-turn, Redis-backed conversation state.
- **Hard part:** Retrieval quality. I tuned chunking (semantic vs fixed-size, overlap) and hybrid search using OpenAI embeddings and Pinecone, and diagnosed retrieval failures like missed context through RAGAS context-recall analysis.
- **Result:** An LLM-based response classification and filtering guardrail layer catches ungrounded or irrelevant responses before they're returned, improving answer grounding and quality.
- **Tools:** Python · LangChain · Tool calling · OpenAI · Pinecone · Hybrid search · Redis · Pydantic · FastAPI · Gradio · RAGAS

### LLM Evaluation Harness

**Card:** A reusable test suite that scores models and prompts, and blocks a merge when the scores drop.

- **Problem:** A prompt or model change can make answers worse without anyone noticing until users do.
- **Built:** A reusable harness that scores models and prompts on curated datasets across accuracy, faithfulness, relevance and latency, with pluggable metrics and provider-agnostic adapters.
- **Hard part:** Trusting the judge. I implemented LLM-as-judge and reference-based scoring with RAGAS and DeepEval, and calibrated the judge prompts against human labels to improve metric–human agreement.
- **Result:** The harness runs in CI as a regression gate via GitHub Actions, blocking merges on score drops and logging per-run traces to Langfuse for diagnosis.
- **Tools:** Python · pytest · RAGAS · DeepEval · Langfuse · OpenAI/Anthropic APIs · GitHub Actions

### Optimized LLM Inference Serving

**Card:** A self-hosted LLM service tuned to serve more requests, faster, on a single GPU.

- **Problem:** A naive Hugging Face pipeline makes poor use of the GPU: throughput is low and larger models don't fit.
- **Built:** A self-hosted inference service with vLLM behind a FastAPI gateway, using continuous batching and PagedAttention.
- **Hard part:** GPU memory and latency. I applied INT8/AWQ quantization and KV-cache tuning, then benchmarked throughput, latency percentiles and tokens/sec under concurrent load.
- **Result:** ~3x throughput over a naive Hugging Face pipeline, ~50% less GPU memory and ~40% lower p95 latency, enough to fit larger models on a single GPU. Prometheus metrics drive autoscaling and catch performance regressions.
- **Tools:** Python · vLLM · FastAPI · PyTorch · Hugging Face Transformers · Docker · Prometheus

### MSc Research: Wendland's CSRBF in Kolmogorov–Arnold Networks (KAN)

**Card:** A smaller, faster version of a newer neural network architecture. Research project at UCC, under Dr. Andreas Amann.

- **Problem (plain English):** Kolmogorov–Arnold Networks learn their own activation functions, but they're expensive to train.
- **Built:** KAN alternatives in PyTorch that replace B-spline and Gaussian edge activations with compactly supported Wendland radial basis functions (a lighter building block that only switches on locally), with trainable centers and support radii.
- **Hard part:** Keeping trainable radii stable, which I did with inverse-L2 regularization, and quantifying the sparsity–accuracy trade-off.
- **Result:** Compared across six baselines.

| Benchmark | Result |
| --- | --- |
| MNIST vs FC-KAN | 97.6% vs 97.7% accuracy, 16% fewer parameters, 21–23% faster training |
| Fashion-MNIST | 86.7% → 88.7% accuracy |
| Activation density vs Fast-KAN (fixed radii) | ~25% vs 88% |

- **Tools:** PyTorch · Kolmogorov–Arnold Networks · Radial basis functions · Regularization · [Repo](https://github.com/AkorNero/Wendland-s-CSRBF-KAN)

### Serverless Observability on AWS

**Card:** A small serverless service where I break things on purpose to check the monitoring catches it.

- **Problem:** Serverless apps are easy to deploy and hard to debug when they fail at 3 a.m.
- **Built:** A modular Terraform stack for a serverless order service with a sync path (API Gateway → Lambda → DynamoDB) and an async path (SQS → worker Lambda + DLQ), on an S3-locked remote backend.
- **Hard part:** Making failures visible, through structured JSON logging, metric filters and EMF custom metrics, with saved Logs Insights queries for latency percentiles, cold starts and request tracing.
- **Result:** Fault injection (error rate, latency, poison messages) reproduces failures and validates metrics and alerting end to end. Least-privilege IAM, PII masking via CloudWatch Logs data protection, and KMS-encrypted SNS alerting with scoped key and topic policies keep it secure.
- **Tools:** Terraform · AWS Lambda · API Gateway · SQS · DynamoDB · CloudWatch · SNS · KMS · IAM · Python

### Predictive Modeling for Customer Churn

**Card:** A churn model that also explains why customers leave.

- **Problem:** Knowing who might churn isn't enough; a retention team also needs to know why.
- **Built:** An end-to-end churn-prediction pipeline on 50k+ customer records, with behavioral and temporal features. I trained and compared logistic regression, random forest and XGBoost, tuned hyperparameters with Optuna and tracked experiments in MLflow.
- **Hard part:** Class imbalance, handled with SMOTE and stratified cross-validation.
- **Result:** 0.89 ROC-AUC. SHAP surfaced the top churn drivers, which I turned into retention recommendations for non-technical stakeholders.
- **Tools:** Python · pandas · scikit-learn · XGBoost · Optuna · SHAP · MLflow

## 5. Education & credentials

**Education**

| Degree | Institution | Dates | Highlight |
| --- | --- | --- | --- |
| MSc Mathematical Modelling & Machine Learning | University College Cork, Cork, Ireland | Sep 2024 – Sep 2025 | First Class Honours (1.1). Coursework: Deep Learning (ANN, RNN, VAE, Transformers, RL), Statistical Methods (Data Analysis, EDA, Regression, Classification, Unsupervised Models) |
| BE Mechanical Engineering | Kumaraguru College of Technology, Coimbatore, India | Jul 2018 – Jun 2022 | First Class with Distinction (8.8/10.0 CGPA). Publication: "Design Optimization of Grids in Grid Fins for Spacecrafts", International Journal of Vehicle Structures and Systems (IJVSS), 2022 |

**Certifications**

| Certification | Issuer | Date |
| --- | --- | --- |
| AWS Certified Machine Learning Engineer – Associate | Amazon Web Services | Sep 2026 |
| Foundation: Introduction to LangChain – Python | LangChain | May 2026 |
| Model Context Protocol: Advanced Topics | Anthropic | Apr 2026 |
| Introduction to Model Context Protocol | Anthropic | Mar 2026 |

**Awards**

- **Shooting Star Award**, LTIMindtree, Bengaluru (Apr – Jun 2024): recognised as a top team contributor for consistently delivering high-impact features on the Studio platform during Q1.
- **Rising Star Award**, LTIMindtree, Bengaluru (Sep 2023): Young Achiever award for exemplary contribution in my first year at the company.

**Community:** Volunteer Mentor, Django Girls Cork (Sep 2026). Coached a group of 3 first-time programmers through building and deploying a full Django blog application to PythonAnywhere in a single-day workshop.

## 6. Contact

I'm based in Cork and open to AI Engineer, Forward Deployed Engineer and Software Engineer roles in Ireland. LinkedIn is the best place to reach me, and my code is on GitHub.

Cork, Ireland · Stamp 1G, eligible to work in Ireland · Hybrid, onsite or remote within Ireland · English, Tamil

[LinkedIn](https://linkedin.com/in/aravindkumar-ks/) · [GitHub](https://github.com/AkorNero) · CV (PDF)

**Footer:** Aravindkumar K S · Cork, Ireland · Built with HTML, CSS & JavaScript (no framework) · GSAP · Lenis · Archivo & Courier Prime · 2018 → 2026

---

## Build notes (not site copy)

- **Calls to action:** LinkedIn and GitHub only. No email, phone, contact form or booking link anywhere on the site. The CV link is a quiet text link, not a button.
- **Photo:** Aravind will supply one portrait. Use it in the hero (or in About where the hero is not a portrait). Keep the face recognisable even when it's processed.
- **Tone:** plain and specific. Say what was built and what happened; avoid "passionate", "unglamorous", "trustworthy", "hold up", "obsessed" and similar.
- **Alternative headlines to A/B test:** "Mostly RAG, guardrails and evaluation. Based in Cork." · "I build retrieval systems and LLM tooling, and I measure whether they work."
- **Numbers strip:** four small figures under the hero, one line of context each. Not a big "impact" section. Spare figures if you want to swap one in: ~10% lower AWS spend (ECS right-sizing), 0.89 ROC-AUC (churn model), ~50% less GPU memory (vLLM service).
- **About:** one section, four short paragraphs, no chapters or timeline.
- **Experience:** bullets are copied word for word from the CV; don't reword them on the site. For the Senior Consultant role, four headline bullets are always visible and the other five sit behind "Show more". The other two roles show all their bullets. Tools as small chips at the end of each role.
- **Projects:** six case studies. The homepage shows four cards (Agentic RAG, LLM Evaluation Harness, Optimized LLM Inference Serving, MSc Research); Serverless Observability and Customer Churn sit under "More projects". Each card opens a case-study page. Link the thesis PDF or a 2-page summary from the research card. Tools as chips on each card.
- **Skills:** no skills section. Each skill appears under the role or project where it was used. CV skills not used anywhere above are left off: Grafana, EFS, CIS Benchmarks, SOLID, Spec-Driven and Test-Driven Development, Flask, JavaScript/TypeScript, and the named coding-agent tools (OpenClaw, Hermes, Herdr). Deep-learning topics (ANN, RNN, VAE, Transformers, RL) appear only as MSc coursework. Add any of them to a project or role if one used them.
- **Credentials:** show the AWS badge image; add a Django Girls photo if you have one.

## Things to fix before launch

- [ ] **Send the portrait photo** for the hero.
- [ ] **GitHub has only one public repo** (the KAN research). The other five projects need public repos with a README, architecture diagram and demo GIF, or the case-study links are dead ends. This matters more now that GitHub is one of the two main calls to action.
- [ ] **LinkedIn URL differs:** CV says /in/aravindkumar-ks/, the LinkedIn export says /in/aravindkumarks. Confirm and use one everywhere.
- [ ] **Stamp 1G is time-limited.** State the valid-until date, or be ready with it.
- [ ] **Add a measured result to Agentic RAG** (e.g. RAGAS context recall before vs after chunking changes).
- [ ] **Small CV punctuation fix:** the third Independent Projects bullet and the first Churn bullet have no closing full stop. Fix in the CV, then copy across.
- [ ] **LinkedIn "Top skills"** lists Data Engineering, which isn't on your CV. Swap for RAG, LangChain or PyTorch.
- [ ] **Small CV fix:** LinkedIn calls the MSc work a thesis, the CV a research project. Pick one.
- [ ] **Linear Algebra certificate** is on LinkedIn but not the CV. Add issuer and date to the certifications table, or drop it.
- [ ] **Work preference and languages** (hybrid/onsite/remote, English, Tamil) are in the Contact section but not on the CV. Confirm they're still right.
