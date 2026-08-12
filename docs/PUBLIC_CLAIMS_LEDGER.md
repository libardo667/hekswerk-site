# Public claims ledger

Status: authoritative allow-list for factual public copy in the August 2026 Hekswerk relaunch.

This ledger controls factual claims on the Hekswerk site. Future public copy may use a claim only when its public decision is **Yes**, and it must use the exact approved wording shown here. Connective prose may change, but it must not add a new fact, stronger implication, number, date, credential, client, or result. Add or revise a ledger entry before publishing any new factual claim.

An entry marked **Hold** must not appear publicly until Levi supplies the named evidence and changes the entry to **Yes**. An entry marked **No** must not appear publicly. `None` in the wording column means that no wording is approved.

## Evidence rules

- **Public** means a visitor can inspect the source without private access.
- **Private** means the source was reviewed with Levi's permission but is not public. Private source text, links, personal data, account data, and financial data must not be copied into this repository.
- **Client-confidential** means the underlying material belongs to or concerns an employer, platform, customer, patient, or client and may be restricted. It must not be placed in this repository.
- A private resume, application, or business plan is a lead and a statement by Levi. It is not independent proof of a result.
- `Exact` means the number or date is presented as exact in the cited source. `Approximate` means the source uses a bound, range, rounded value, or approximation. `Unverified` means no primary record was inspected. `None` means the claim contains no number or date.
- Public repository claims must be checked against the pinned source before reuse. Claims marked as current must also be checked against the then-current public documentation.

## Source register

| Source | Description | Class |
| --- | --- | --- |
| H1 | [`docs/CONTRACT_WORK_RELAUNCH.md`](./CONTRACT_WORK_RELAUNCH.md), the August 2026 relaunch authority | Public |
| H2 | Public Hekswerk Git history, especially `0fbc945:the-practice.html` and the later claim-withdrawal history | Public |
| H3 | Current Hekswerk website source, configuration, and contact-form implementation | Public |
| W1 | [WorldWeaver README at `43eae31`](https://github.com/libardo667/worldweaver/blob/43eae31093ac941bc3335d6ab95d3b38409942ea/README.md) | Public |
| W2 | [WorldWeaver manual landing page at `43eae31`](https://github.com/libardo667/worldweaver/blob/43eae31093ac941bc3335d6ab95d3b38409942ea/docs/index.md) | Public |
| W3 | WorldWeaver manifests and license at `43eae31` | Public |
| W4 | Public WorldWeaver Git history through `43eae31` | Public |
| K1 | [Kenshi Agent Environment README at `bfaa4d5`](https://github.com/libardo667/kenshi-agent-env/blob/bfaa4d55ae10a34d33e7a06ee3959fc6659eceb4/README.md) | Public |
| K2 | Kenshi Agent Environment package manifest and license at `bfaa4d5` | Public |
| K3 | Public Kenshi Agent Environment Git history through `bfaa4d5` | Public |
| E1 | [EvoGen README at `c37147b`](https://github.com/libardo667/evogen/blob/c37147b3120c38c9a979ca8671fcc11c5ab62c6c/README.md) | Public |
| E2 | [EvoGen KAE integration notes at `c37147b`](https://github.com/libardo667/evogen/blob/c37147b3120c38c9a979ca8671fcc11c5ab62c6c/docs/kenshi-integration.md) | Public |
| E3 | [EvoGen evidence cockpit content at `c37147b`](https://github.com/libardo667/evogen/blob/c37147b3120c38c9a979ca8671fcc11c5ab62c6c/docs/cockpit/content.json) | Public |
| E4 | Public EvoGen Git history through `c37147b` | Public |
| S1 | [Confidentiality-safe delivery reconciliation sample at `d0509e2`](https://github.com/libardo667/delivery-reconciliation-sample/tree/d0509e2034f53f72857fe8e3c5fb882a7e51a1af), built with synthetic fixtures and a clean public history | Public |
| L1 | Levi's current public project-priority decision, confirmed 2026-08-11 | Private |
| L2 | Levi confirms that he designed and wrote the original proof-of-delivery automation and authorizes a confidentiality-safe reconstruction, confirmed 2026-08-11 | Private |
| O1 | Oregon Secretary of State assumed business name registration for Hekswerk, e-filed January 13, 2026; Levi confirms January 2026 as Hekswerk's public founding month. Registry number and addresses omitted. | Public and private |
| P1 | Private resumes and CV drafts reviewed locally and in Google Drive on 2026-08-11. No private file, link, contact detail, or reference detail is reproduced here. | Private |
| P2 | Private invoice-file metadata and a private income-tracker title reviewed in Google Drive on 2026-08-11. No amount, invoice, row, or account detail was copied. | Private |
| P3 | Private Providence interview notes reviewed in Google Drive on 2026-08-11. No operational detail is reproduced here. | Private |
| P4 | Levi-authored proof-of-delivery automation source reviewed locally on 2026-08-11. The source contains employer-specific workflow details and is not copied or linked here. | Private and potentially client-confidential |
| C1 | Underlying AI-platform task materials, agreements, and work records. These were not copied or treated as publishable. | Client-confidential |
| R1 | Private December 2026 The Hague housing-booking correspondence reviewed in Gmail on 2026-08-11. No property, address, booking, contact, household, or financial detail is reproduced here. | Private |
| R2 | Current private business CV reviewed in Google Drive on 2026-08-11. It states Portland, Oregon. No contact detail is reproduced here. | Private |
| L3 | Levi confirms the December 2026 relocation to The Hague and approves that month and city for public use, confirmed 2026-08-11. | Private |
| F1 | Extension-only inventory produced by [`scripts/project-language-inventory.mjs`](../scripts/project-language-inventory.mjs) on 2026-08-11 across local Git project checkouts. It excludes dependency, generated, cache, build, vendored, and third-party upstream paths. Only aggregate filename-extension counts are retained; no private source content or private repository name is published. | Public method with public and private aggregate inputs |

The private `research-runway` repository was used only as a cross-check for Levi-authored statements. Its application drafts, personal details, references, finances, and unpublished research claims are not public evidence for this site.

## Paid technical work

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| PAY-01 | Levi has done paid technical AI-evaluation work. | I have done paid technical evaluation work for AI systems. | P1, P2 | Private | None | Yes, biography context only |
| PAY-02 | Levi's paid technical work includes AI evaluation, Python code review, and operations data work. | My paid technical work has included AI-output evaluation, Python code review, and operations data work. | P1 | Private | None | Yes, biography context only |
| PAY-03 | Hekswerk has delivered paid client automation projects. | None. | Private business-plan drafts, without a reviewed engagement record | Private | Unverified | Hold. Levi must provide a redacted agreement, invoice, acceptance record, or equivalent primary evidence and confirm what may be disclosed. |
| PAY-04 | Hekswerk has an established client roster or a demonstrated commercial automation track record. | None. | No adequate source found | Private | Unverified | No |
| PAY-05 | Hekswerk revenue, income, client count, or revenue concentration. | None. | Private financial and planning material | Private | Exact or approximate, depending on the source | No |

PAY-01 and PAY-02 may support a short personal background section. They must not be turned into a client case study, production-automation claim, or proof that the Operations Automation Sprint has already produced client outcomes.

## Providence automation and data analysis

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| PROV-01 | Levi used Python and Excel VBA to automate part of an internal healthcare workflow. | In a healthcare data-quality role, I used Python and Excel VBA to automate part of an internal workflow. | P1, P3, P4 | Private | None | Yes. Keep the employer unnamed. |
| PROV-02 | Levi used Power BI for healthcare operations analysis. | In that role, I also used Power BI to analyze operational data. | P1 | Private | None | Yes, only immediately after PROV-01 |
| PROV-03 | Levi held a named Providence role from August 2023 through October 2024. | None. | P1 | Private | Exact dates, unverified | Hold. Levi must provide an employment record and approve public use of the employer, title, and dates. |
| PROV-04 | Any time-savings or before-and-after duration for the automation. | None. | P1, P3 | Private and potentially client-confidential | Approximate and unverified | No. Levi evidence and permission would be required for any future reconsideration. |
| PROV-05 | Any dataset-size or record-count claim. | None. | P1 | Private and potentially client-confidential | Approximate and unverified | No. Levi evidence and permission would be required for any future reconsideration. |
| PROV-06 | Internal workflow, equipment, payer, compliance, error, or process-failure details. | None. | P3 and C1 | Client-confidential | None or unverified, depending on the detail | No |
| PROV-07 | Levi's role and safe technical summary. | I designed and wrote a Python workflow that gathered reports from separate systems, normalized them into tabular records, reconciled records by shared identifiers, and produced an operational report. | P4, L2 | Private and potentially client-confidential | None | Yes. Use only this employer-neutral summary. |
| PROV-08 | Historical result. | The working portion completed report gathering, normalization, reconciliation, and report generation. | P4 | Private and potentially client-confidential | None | Yes. Do not add an outcome metric or internal system detail. |
| PROV-09 | Public reconstruction boundary. | The public sample is a clean reconstruction with synthetic data. Its tests validate the sample, not the employer system or historical outcome. | S1 | Public | None | Yes |
| PROV-10 | Source disclosure boundary. | The underlying source is not linked because it includes employer-specific workflow details and is not confidentiality-safe. | P4 | Private and potentially client-confidential | None | Yes |
| PROV-11 | Public sample architecture. | The sample loads two CSV exports, validates their schemas, normalizes identifiers, selects the latest matching event, reconciles quantities, and writes explicit review reasons. | S1 | Public | Two exports, exact | Yes |
| PROV-12 | Historical completion boundary. | A later write-back step was not completed. | P4 | Private and potentially client-confidential | None | Yes |
| PROV-13 | Withheld result boundary. | No time saving, record count, business outcome, or production benchmark is claimed. | P1, P3, P4 | Private and potentially client-confidential | None | Yes |

The approved Providence wording is deliberately employer-neutral. It establishes relevant background without publishing internal healthcare operations or an unsupported outcome metric.

## AI-evaluation work

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| AI-01 | Levi has done paid AI-evaluation work since April 2024. | I have done paid AI-evaluation work since April 2024. | H2, P1, P2 | Public and private | Exact month, supported by repeated Levi-authored records | Yes |
| AI-02 | The work includes reviewing model responses against evaluation instructions. | That work has included reviewing model responses for correctness and following detailed evaluation guidelines. | P1 | Private | None | Yes |
| AI-03 | The work includes debugging AI-generated Python. | It has also included debugging and revising AI-generated Python. | P1 | Private | None | Yes |
| AI-04 | Names of AI-evaluation platforms or labs. | None. | P1, P2, C1 | Private and client-confidential | None | Hold. Levi must confirm that each name is accurate, relevant, and permitted for public disclosure. |
| AI-05 | The work trains major foundation models, serves frontier labs, or is high-volume RLHF safety work. | None. | Levi-authored resumes and applications, without reviewed platform evidence | Private and client-confidential | Unverified | No |
| AI-06 | The work proves expertise in bias detection, AI safety, model honesty, or enterprise compliance. | None. | P1 and C1 | Private and client-confidential | Unverified | No |

The site may call the work **AI evaluation**. It must not name a platform, model developer, end customer, dataset, task, throughput, or confidential guideline unless the ledger is amended first.

## Hekswerk

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| HEK-01 | Hekswerk's identity and ownership. | Hekswerk is Levi Banks's one-person systems practice. | H1 | Public | One person, exact | Yes |
| HEK-02 | Hekswerk's two lanes. | Hekswerk has two lanes: contract operations automation and a second lane for independent engineering and open research. | H1 | Public | Two lanes, exact | Yes |
| HEK-03 | The primary commercial offer. | The Operations Automation Sprint is Hekswerk's primary commercial offer. | H1 | Public | None | Yes |
| HEK-04 | The intended audience. | It is for small, operations-heavy professional-service teams, generally 3 to 25 people, with one recurring internal workflow that can be named, bounded, tested, and handed off. | H1 | Public | Approximate audience range | Yes |
| HEK-05 | What Levi will deliver. | For one agreed workflow, I map the current process, define the build and acceptance check, build and test the automation, deploy it into client-controlled systems, document it, train its owner, and provide a bounded defect-correction period. | H1 | Public | One workflow, exact offer boundary | Yes |
| HEK-06 | Client ownership. | The client keeps control of its accounts, credentials, data, and deployed system. Hekswerk is not a required hosting layer, subscription, or permanent operator. | H1 | Public | None | Yes |
| HEK-07 | Offer pricing. | Most Operations Automation Sprints start at $1,500. A qualifying founding-client scope is $750 and must have one clear trigger, one primary outcome, no custom service or database, no more than two client-owned systems, and permission to develop an anonymized case study. Nothing is published without the client's approval, and a positive testimonial is not required. Work needing a custom service, database, or more complex integration starts at $2,500. | H1 | Public | Exact offer prices and scope boundaries | Yes |
| HEK-08 | Defect-correction term. | The default defect-correction period is 30 calendar days after handoff and covers defects against the agreed scope. New integrations, rules, inputs, or branches are new work. | H1 | Public | Exact duration | Yes |
| HEK-09 | WorldWeaver's place in Hekswerk. | WorldWeaver is part of Hekswerk's open research lane. It is visible evidence of systems work, not the service being sold. | H1 | Public | None | Yes |
| HEK-10 | Hekswerk's founding date. | I founded Hekswerk in January 2026. | O1 | Public and private | Exact | Yes |
| HEK-11 | Privacy-first, secure, compliant, audited, production-proven, or guaranteed automation. | None. | No implementation-specific evidence exists for a general claim | Private or client-confidential | Unverified | No |
| HEK-12 | Ordinary sprint contents. | In the ordinary case, the sprint contains one primary workflow across one to three systems. It includes workflow mapping, acceptance criteria, implementation, happy-path and exception testing, basic logs or an audit trail appropriate to the scope, deployment into client-owned systems, a written runbook, one handoff or training session, and 30 calendar days of bounded defect correction. | H1 | Public | One workflow, one to three systems, one session, and 30 days, exact | Yes |
| HEK-13 | Representative project types. | Representative projects include form or email intake routed into a tracker or CRM; attachments extracted and reconciled against internal records; recurring CSV or spreadsheet exports cleaned into a report; deadline or follow-up tasks created from structured records; and an unreliable Zapier, Make, or n8n workflow rebuilt with visible failures and documentation. | H1 | Public | Five examples, exact | Yes, only as representative scopes, not completed-client claims |
| HEK-14 | Service, support, data, and ownership boundaries. | A sprint does not hide a custom SaaS product inside a fixed scope. It does not include indefinite maintenance or 24-hour support. Initial discovery must not use sensitive production data. Regulated or unusually sensitive data requires a separate assessment. The client owns the accounts, credentials, documentation, and resulting system. | H1 | Public | 24-hour support, exact exclusion | Yes |

Offer terms in HEK-04 through HEK-08 are commitments and boundaries, not historical results. They may not be rewritten as claims about completed clients.

## About and working method

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| ABOUT-01 | Professional background summary. | My professional background spans operations, data analysis, automation, AI evaluation, and software systems. | P1, P3, P4, C1, K1, E1, W1 | Public and private | None | Yes, biography context only |
| ABOUT-02 | Practical working method. | I start by understanding the real process, including its owner, dependencies, exceptions, and intended result. I define a bounded solution and acceptance check, build it, verify it against expected paths and known failures, document it, and hand it back to the client. | H1 | Public | None | Yes, describes the method and offer commitment, not a historical client result |
| ABOUT-03 | Why scope and written artifacts matter. | A clear scope states what will be built, how it will be accepted, and what counts as a later change. Written process maps, acceptance criteria, tests, logs or an audit trail, and a runbook make the work inspectable and usable after handoff. | H1 | Public | None | Yes, describes the working standard, not a historical client result |
| ABOUT-04 | Equal standing and different roles of the two lanes. | The contract lane and the independent engineering and open research lane are both real work. The contract lane solves a bounded operational problem for a client. The engineering and research lane develops and tests public systems. They require different evidence and carry different obligations. Neither exists merely to validate the other. | H1, L1 | Public and private | Two lanes, exact | Yes |

## WorldWeaver

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| WW-01 | Plain description. | WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people. | W1, W2 | Public | None | Yes |
| WW-02 | Resident continuity. | A resident keeps one continuous identity, private history, and working space while moving between a private hearth and local shared cities. | W1, W2 | Public | One identity, exact design claim | Yes |
| WW-03 | Boundary between model choice and world facts. | The engine records concrete world facts. A language model can choose what a resident tries to do, but it does not decide whether the action worked. | W1, W2 | Public | None | Yes |
| WW-04 | Current federation limit. | Travel between independently operated computers is a goal, not a completed claim. | W1, W2 | Public | None | Yes. Recheck current manual before reuse. |
| WW-05 | Development status. | None. | W2 and Levi's current status | Public and private | None | No. Development is currently paused. |
| WW-06 | License. | WorldWeaver's source code is available under the AGPL-3.0-or-later license. | W1, W3 | Public | License version, exact | Yes |
| WW-07 | Product status. | WorldWeaver is open research, not a hosted product or an Operations Automation Sprint deliverable. | H1 | Public | None | Yes |
| WW-08 | Consciousness, sentience, personhood, users, adoption, production readiness, or client outcomes. | None. | No adequate source for those public claims | Public, private, or speculative | Unverified | No |
| WW-09 | A current feature, test result, or research finding not stated above. | None. | Current manual and dated research records | Public | Depends on claim | Hold. Add a pinned, narrowly worded ledger entry first. |
| WW-10 | Levi's role. | I am the primary author of the WorldWeaver repository at the pinned commit. | W4 | Public | None | Yes |
| WW-11 | Repository validation surface. | The repository provides root-level test and check commands. The manual is current operating documentation, while dated research records what was tested at the time. | W1, W2 | Public | None | Yes. This does not claim that a current run passed. |
| WW-12 | Backend, persistence, event, and distributed-system boundary. | The world engine owns concrete facts and typed consequences. Resident identity and history persist between private and shared spaces. Travel between independently operated computers remains a goal. | W1, W2 | Public | None | Yes |

The complete and current capability list belongs in the WorldWeaver manual. Hekswerk overview pages should use the stable wording above and link to the manual rather than copying volatile feature counts or research conclusions.

## Kenshi Agent Environment

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| KEN-01 | Plain description. | Kenshi Agent Environment lets a language model play a supervised game of Kenshi. | K1 | Public | None | Yes |
| KEN-02 | Main architecture. | A native mod reads game state and performs gameplay actions. A Python runtime captures screenshots, builds the actions that are valid at that moment, checks the model's choice against fresh state, and records what happened. | K1, K2 | Public | None | Yes |
| KEN-03 | Safety and maturity boundary. | It is experimental software for supervised runs with disposable saves, not a general-purpose Kenshi bot. | K1 | Public | None | Yes |
| KEN-04 | License and relationship to the game. | Kenshi Agent Environment is an unofficial open-source project licensed under GPL-3.0-or-later. It does not include Kenshi game assets or game binaries. | K1, K2 | Public | License version, exact | Yes |
| KEN-05 | Current action coverage, live proof, protocol version, test count, run count, or autonomous-play result. | None. | Current README and public evidence bundles | Public | Depends on claim and changes frequently | Hold. Add a pinned, narrowly worded ledger entry first. |
| KEN-06 | Fully autonomous, production-ready, safe, complete, or generally capable game-playing agent. | None. | K1 expressly states narrower boundaries | Public | Unverified | No |
| KEN-07 | Levi's role. | I am the primary author of the Kenshi Agent Environment repository at the pinned commit. | K3 | Public | None | Yes |
| KEN-08 | Validation and evidence path. | Before dispatch, the runtime checks the model's choice against fresh state. The native mod reports whether Kenshi accepted the action and what happened afterward. The runtime records the observation, decision, command, and result. Mock and replay runs use the same planner and operation path. | K1 | Public | None | Yes |
| KEN-09 | Inspectable system boundary. | The public architecture keeps model choice, action validity, game execution, and later evidence separate. | K1 | Public | None | Yes |

Kenshi Agent Environment may appear as selected technical or research work. It must not become a new commercial product or dilute the Operations Automation Sprint as the public front door.

## EvoGen and current agent work

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| EVO-01 | Plain description. | EvoGen is an outer-loop capability engineering harness for autonomous agents. | E1 | Public | None | Yes |
| EVO-02 | Current repository maturity. | The repository is a runnable alpha with one deterministic end-to-end prototype. | E1 | Public | One prototype, exact | Yes |
| EVO-03 | Current proof boundary. | It does not yet prove a real game integration or model-generated diagnosis. | E1 | Public | None | Yes. Recheck current documentation before reuse. |
| EVO-04 | Current relationship to KAE. | EvoGen includes a small KAE JSONL normalization adapter. KAE is not yet registered as a complete EvoGen subject, and its production trajectory exporter is not complete. | E1, E2, E3 | Public | None | Yes. Recheck current documentation before reuse. |
| EVO-05 | Current project priority. | EvoGen and Kenshi Agent Environment are the agent-system projects I am actively working on. | L1 | Private | Two projects, exact | Yes |
| EVO-06 | Public repository and commercial boundary. | They are public repositories, not products included in the Operations Automation Sprint. | E1, K1, H1 | Public | None | Yes |
| EVO-07 | Architecture. | The repository uses strict Pydantic contracts, append-only JSONL trajectories, a content-addressed artifact store, and a SQLite ledger. | E1 | Public | None | Yes |
| EVO-08 | Validation surface. | One verification command runs Ruff, strict mypy, schema checks, the full test suite, a deterministic end-to-end proof in a disposable workspace, and a whitespace-error check. | E1 | Public | One command and one proof, exact | Yes |
| EVO-09 | Levi's role. | I am the primary author of the EvoGen repository at the pinned commit. | E4 | Public | None | Yes |
| EVO-10 | Runtime and evolution boundary. | Candidate changes are evaluated outside the runtime plane and promoted only through lineage gates. | E1 | Public | None | Yes |

EvoGen and Kenshi Agent Environment may be prominent, inspectable technical work. Neither is a product included in the Operations Automation Sprint, and the KAE integration must not be described as complete before the public evidence supports that claim.

## Technologies used

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| TECH-01 | General programming tools. | I use Python and JavaScript in my technical work. | P1, W3, K2, current Hekswerk source | Public and private | None | Yes |
| TECH-02 | n8n use. | I use n8n for self-hosted workflow automation. | P1 | Private | None | Yes. Do not turn this into a client-result claim. |
| TECH-03 | Spreadsheet work. | I use Excel and Google Sheets for operational data work. | P1 | Private | None | Yes. Do not imply a certification or client outcome. |
| TECH-04 | Providence tools. | In a healthcare data-quality role, I used Python, Excel VBA, and Power BI. | P1 | Private | None | Yes, biography context only |
| TECH-05 | WorldWeaver stack. | WorldWeaver uses a Python and FastAPI world engine with React and TypeScript browser clients. | W1, W3 | Public | None | Yes |
| TECH-06 | Kenshi stack. | Kenshi Agent Environment uses a Python runtime and a native mod. | K1, K2 | Public | None | Yes |
| TECH-07 | Zapier and Make as representative systems in the offer. | An unreliable Zapier, Make, or n8n workflow may be a representative sprint scope. | H1 | Public | None | Yes, only as an offer example, not a completed-work or experience claim |
| TECH-08 | A technology is secure, private, compliant, enterprise-ready, or production-proven merely because Levi has used it. | None. | No adequate source | Private or client-confidential | Unverified | No |
| TECH-09 | RAG systems, local language models, Selenium, or any other named tool not approved above. | None. | Levi-authored private resumes without a reviewed public artifact for the intended claim | Private | Unverified | Hold. Levi must identify a current artifact or other primary evidence and the exact public wording. |
| TECH-10 | Web and systems technologies used in public engineering work. | My public systems work includes FastAPI, React, TypeScript, Python runtimes, and native integrations. | W1, W3, K1, K2, E1, E2 | Public | None | Yes. Keep this grouped as public systems work, not commercial deployment experience. |
| TECH-11 | Current language and file-ending mix. | My current local project checkouts are Python-heavy. TypeScript and JavaScript form the next-largest source-file groups, with smaller project-specific work in HTML and CSS, GDScript, shell and PowerShell, C and C++, Rust, and SQL. | F1 | Public method with public and private aggregate inputs | Relative ordering verified on 2026-08-11 | Yes. Present only with the snapshot method and its limits. |

The automation offer may also name email, forms, documents, spreadsheets, customer relationship management systems, task systems, and recurring reports as typical workflow inputs. Those are examples defined by H1, not claims that every integration has already been delivered.

## Website privacy and data handling

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| WEB-01 | Information collected by the general contact form. | The contact form asks for your name, email address, topic, and message. | H3 | Public | None | Yes |
| WEB-02 | Additional relocation fields. | If you choose relocation planning, it also offers fields for locations, timeline, household, and urgent or sensitive context. | H3 | Public | None | Yes |
| WEB-03 | Contact-form transport and purpose. | The form sends those details over HTTPS to Hekswerk's intake endpoint so I can understand and reply to your inquiry. | H3 | Public | None | Yes |
| WEB-04 | Account and newsletter behavior. | Submitting the form does not create a user account or add you to a newsletter. | H3 | Public | None | Yes |
| WEB-05 | Website infrastructure and external resources. | The site is published with GitHub Pages. It loads typefaces from Google Fonts and links to public repositories on GitHub. | H3 | Public | None | Yes |
| WEB-06 | Features not present on the site. | The site does not include advertising trackers, a scheduling platform, or a generic chatbot. | H3 | Public | None | Yes. Recheck the implementation before reuse. |

These statements cover only the current public website and intake form. They are not a general security, compliance, confidentiality, or retention claim. The site must not promise a deletion schedule, storage location, processor list, or legal regime unless the underlying intake system is reviewed and the ledger is amended first.

## Quantitative results

No client outcome metric is currently approved. Offer parameters are allowed only through HEK-04, HEK-07, and HEK-08 and must not be presented as results.

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| NUM-01 | Time saved, error reduction, throughput, turnaround, revenue, return on investment, conversion, or other client outcome. | None. | No reviewed client evidence | Private or client-confidential | Unverified | No |
| NUM-02 | Providence time savings and dataset size. | None. | P1, P3 | Private and potentially client-confidential | Approximate and unverified | No |
| NUM-03 | Hekswerk revenue, AI-evaluation income, hourly rate, invoice totals, platform count, or client count. | None. | P2 and private planning material | Private and client-confidential | Exact or approximate | No |
| NUM-04 | Research spend, personal reserves, relocation budget, partner income, or household finances. | None. | Private research and business-planning material | Private | Exact or approximate | No |
| NUM-05 | Repository commits, tests, features, actions, live runs, stars, users, or performance measurements. | None. | Public repositories | Public | Exact but volatile | Hold. Use the relevant live source directly or add a pinned ledger claim if a site page truly needs the number. |
| NUM-06 | Dated local source-file distribution. | On August 11, 2026, the extension-only inventory counted 1,597 tracked source files across 25 included project checkouts: Python 1,197; TypeScript 129; JavaScript 96; HTML and CSS 63; GDScript 46; shell and PowerShell 37; C and C++ 21; and Rust and SQL 8. | F1 | Public method with public and private aggregate inputs | Exact for the dated snapshot | Yes. Label it as a dated repository-footprint snapshot, not a live measure of skill, effort, client use, or production experience. |

## Dates

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| DATE-01 | Start of paid AI-evaluation work. | I have done paid AI-evaluation work since April 2024. | H2, P1, P2 | Public and private | Exact month | Yes |
| DATE-02 | Providence employment dates. | None. | P1 | Private | Exact but unverified | Hold. Levi must provide an employment record and approve the exact public wording. |
| DATE-03 | Hekswerk's founding date. | I founded Hekswerk in January 2026. | O1 | Public and private | Exact | Yes |
| DATE-04 | WorldWeaver or Kenshi founding date. | None. | Git history records code dates but does not define a public founding date | Public | Unverified as a founding claim | No |
| DATE-05 | Current location and confirmed relocation. | I am currently based in Portland, Oregon, and I am relocating to The Hague in December 2026. | R1, R2, L3 | Private | Exact month | Yes, biography context only |
| DATE-06 | The Operations Automation Sprint defect-correction period. | The default defect-correction period is 30 calendar days after handoff. | H1 | Public | Exact duration | Yes |
| DATE-07 | Other relocation, launch, cohort, registration, grant, application, or future availability dates. | None. | Private plans and applications | Private | Exact or approximate, often prospective | No for the August relaunch |

## Education and certificates

| ID | Claim under review | Exact approved wording | Source | Class | Number | Public decision |
| --- | --- | --- | --- | --- | --- | --- |
| EDU-01 | Bachelor of Science in Psychology from Portland State University, completed March 2023. | None. | P1 | Private | Exact month and year, unverified | Hold. Levi must provide a diploma, official transcript, or degree-verification record and approve the wording. |
| EDU-02 | Bachelor of Science in General Studies from the University of Portland, completed May 2020. | None. | P1 | Private | Exact month and year, unverified | Hold. Levi must provide a diploma, official transcript, or degree-verification record and approve the wording. |
| EDU-03 | Computer science concentration, minor, degree, or formal specialization. | None. | Private drafts conflict between a concentration and coursework | Private | Unverified | No. Coursework may be reconsidered only with a transcript and exact wording. |
| EDU-04 | GPA, President's List, Dean's List, honors, or awards. | None. | P1 | Private | Exact but unverified | Hold. Levi must provide an official transcript or award record and decide whether the detail serves the site. |
| EDU-05 | Professional certificates or certifications. | None. | No relevant credential record found in the reviewed repositories or Drive search | Private | Unverified | No. No certificate or certification may be implied. |
| EDU-06 | Compliance, security, privacy, AI-safety, healthcare, or technical certification. | None. | No supporting credential found | Private | Unverified | No |

## Claims intentionally excluded from the public site

The following material was encountered during the evidence pass and is not an invitation to publish it:

- private financial, invoice, household, immigration, relocation, and legal-planning details;
- names or contact details for references;
- employer, client, patient, payer, equipment, dataset, or workflow details beyond the exact approved wording above;
- names of AI platforms, labs, model developers, or downstream customers;
- confidential task instructions, evaluation guidelines, work samples, or platform records;
- unpublished applications, research plans, funding requests, projected services, and future affiliations;
- language proficiency claims, personal location and household details beyond DATE-05, and family details; and
- claims withdrawn from earlier Hekswerk pages or superseded by H1.

## Update procedure

Before adding a public claim:

1. Write the smallest exact sentence the site needs.
2. Identify a source and classify it as public, private, or client-confidential.
3. Mark every number or date exact, approximate, or unverified.
4. Remove unnecessary employer, client, platform, personal, and operational detail.
5. If the source is private or client-confidential, record only a neutral evidence label here.
6. Obtain Levi's evidence or disclosure decision wherever this ledger says it is required.
7. Add the exact wording with a **Yes** decision before using it in public copy.
8. Recheck current project documentation for any claim described as current.

If a sentence cannot pass this procedure, omit it. The site should prefer a smaller true claim over invented precision.
