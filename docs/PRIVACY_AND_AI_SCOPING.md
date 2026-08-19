# Privacy and AI scoping gate

Status: operating authority for Hekswerk automation work.

Last reviewed: 2026-08-12.

This checklist turns the public privacy and responsible-automation position into a repeatable working practice. It is
an engineering and project-control tool, not legal advice, a certification, or a substitute for a client's counsel,
data protection officer, works council, security lead, or other accountable specialist.

Use it before accepting access to non-public systems or data, and before deciding that an AI-enabled workflow fits an
Operations Automation Sprint. Keep the completed record with the private project file. Do not put client data, names,
credentials, legal analysis, or confidential screenshots in this public repository.

## How Hekswerk uses AI in delivery

Hekswerk builds with AI coding agents under Levi's direction and review. That method has a data boundary, and the boundary is part of the privacy position, not separate from it.

- Do not send client passwords, access tokens, production data, or confidential records to AI coding tools or model providers.
- Build against synthetic, generated, or irreversibly redacted examples unless the client agrees otherwise in writing, and record that agreement in the project file.
- When an AI tool must see client-adjacent material to make progress, minimize it first, name the tool and provider, and treat it as a subprocessor decision under section 2 below.
- Keep Hekswerk's own AI-assisted build separate from any AI system inside the client's workflow. The screen in section 3 is about the client's system; this boundary is about how Hekswerk produces the deliverable.
- The client owns the finished system. AI assistance during the build does not change ownership, accountability, or the acceptance standard.

This corresponds to METHOD-01 and METHOD-02 in the public claims ledger.

## Stop at the intake boundary

- Do not ask for or accept passwords, tokens, production records, medical information, legal files, identity records,
  financial identifiers, or confidential datasets through the public form or ordinary introductory email.
- Ask for a process description, system names, example field names, and synthetic or redacted samples first.
- If real data or system access appears necessary, complete the rest of this gate and agree the handling terms before
  receiving it.
- If a prospect sends unnecessary sensitive material, do not redistribute it. Record the incident without copying the
  content, restrict access, and arrange deletion or a safer transfer path.

## 1. Name the work and the accountable people

- What is the exact purpose and primary outcome?
- Who owns the current process and can accept the result?
- Which organization decides why and how personal data is used?
- Is Hekswerk acting as an independent controller, a processor on instructions, or neither for each data flow?
- Who can approve access, answer domain questions, review exceptions, and stop the system?
- Which contract, data-processing terms, confidentiality terms, or client policies must exist before work begins?

Do not proceed while the purpose, owner, instructions, or authority to provide the data remains unclear.

## 2. Minimize the data and access

- List every system, data category, affected group, recipient, and transfer.
- Mark personal data, special-category data, criminal-offence data, children's data, employee data, confidential
  business data, credentials, and regulated records separately.
- Remove fields, records, history, and access that are not needed for the agreed acceptance test.
- Prefer synthetic, generated, or irreversibly redacted examples where they can prove the workflow.
- Use client-owned accounts and client-created credentials with the narrowest practical scope and lifetime.
- Name approved storage, logs, backups, model or API providers, subprocessors, regions, and cross-border transfers.
- Set a retention and deletion event for working copies, logs, exports, credentials, and temporary test data.
- Decide how access requests, corrections, objections, restrictions, portability requests, and deletion requests reach
  the responsible organization.

Escalate before receiving data when the lawful basis, transparency notice, data-subject impact, international transfer,
retention duty, or need for a data-protection impact assessment is unresolved.

## 3. Screen any AI system separately

Do not treat a privacy review as an EU AI Act review or vice versa. Record:

- the system's intended purpose and actual use;
- whether Hekswerk or the client is acting as provider, deployer, importer, distributor, product manufacturer,
  downstream provider, or an integration contractor that does not neatly fit one role;
- the model, service, version, vendor, deployment location, and material downstream dependencies;
- who is affected and whether the system influences access to work, essential services, education, credit, insurance,
  justice, migration, law enforcement, biometric treatment, safety, or another consequential decision;
- whether a prohibited-practice question exists;
- whether a high-risk category or product-safety regime may apply;
- whether people must be told they are interacting with AI or that content was artificially generated or manipulated;
- whether general-purpose AI obligations or provider documentation affect the integration; and
- what AI literacy the people operating or overseeing the system need for their role.

If prohibited-practice, high-risk, biometric, employment, essential-service, vulnerable-person, or material
transparency questions are plausible, pause implementation until the client obtains qualified classification advice
and names the accountable person. A small sprint is not a shortcut around that decision.

## 4. Design human authority and failure behavior

- Name what the system may draft, recommend, classify, or execute.
- Name decisions it must not make on its own.
- Identify the person who can understand the output, intervene, override it, and stop the workflow.
- Provide that person with the context, limits, and time needed for meaningful review.
- Define low-confidence, out-of-distribution, unavailable-provider, malformed-input, and unsafe-output behavior.
- Prevent silent success. Make failed, skipped, duplicated, and partially completed work visible to the owner.
- Provide a route for an affected person to reach a human where the use requires it.

## 5. Define evidence before implementation

- Write acceptance cases for normal inputs, known exceptions, harmful or disallowed outputs, retries, duplicates,
  access denial, provider failure, and human override.
- Use representative but minimized test data. Do not copy production data merely because it is convenient.
- Record relevant code, prompt, rule, model, service, and schema versions.
- Record which controls are source-verified, test-verified, observed in the deployed system, or still unverified.
- Decide which logs are necessary, who can read them, what they contain, how long they remain, and how they are
  removed. Do not log raw prompts, records, or model outputs by default.
- Document known limits, expected drift, monitoring signals, required disclosures, and the event that triggers review.
- Do not convert a successful API response into a claim that a real-world outcome occurred.

## 6. Hand off and close

- Deploy into client-owned accounts when practical.
- Give the client a runbook covering ownership, dependencies, versions, failure states, human review, access, logs,
  retention, disclosures, and rollback.
- Transfer or revoke Hekswerk access and record the final disposition.
- Remove Hekswerk working copies and temporary credentials on the agreed event, except records that must be retained for
  a documented legal or contractual reason.
- Name who monitors future changes to purpose, model, provider, law, data, affected people, or operating context.
- Treat a material change as a new scope and repeat this gate.

## Website inquiry operations

For the public Hekswerk inquiry system:

- review unanswered and unconverted inquiries at least once each calendar year;
- delete active-mailbox copies that are no longer needed;
- respond to a rights request using the least additional identity information reasonably needed;
- record what Hekswerk deleted and identify provider-controlled copies that could not be directly verified or erased;
- recheck Cloudflare, Resend, and Proton processing terms when the implementation or provider changes; and
- update `docs/PRIVACY_DATA_FLOW.md`, the public privacy page, tests, and the claims ledger in the same change.

## Project record template

```text
Project and date:
Purpose and acceptance owner:
Controller / processor roles:
AI Act roles, if any:
People affected:
Systems and providers:
Minimum data and access:
Lawful basis and notice owner:
Transfer and retention decisions:
AI risk and transparency screen:
Human authority and stop conditions:
Test and evidence plan:
Open legal, privacy, security, or domain questions:
Escalation decision and accountable approver:
Handoff and access-revocation event:
Final data and credential disposition:
Next review trigger:
```

## Authoritative starting points

These sources were checked on 2026-08-12. Applicability and implementation timelines can change, so recheck them for
each real scope.

- EU AI Act, Regulation (EU) 2024/1689: <https://eur-lex.europa.eu/eli/reg/2024/1689/oj>
- European Commission, navigating the AI Act: <https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act>
- European Commission, Article 50 transparency obligations:
  <https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act>
- European Commission, AI literacy questions and answers:
  <https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers>
- GDPR, Regulation (EU) 2016/679: <https://eur-lex.europa.eu/eli/reg/2016/679/oj>
- European Commission, information for individuals and rights:
  <https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en>
- European Commission, legal grounds for processing:
  <https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en>
- European Data Protection Board guidance: <https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en>
- Dutch Data Protection Authority: <https://autoriteitpersoonsgegevens.nl/en>
