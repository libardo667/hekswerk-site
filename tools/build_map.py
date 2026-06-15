#!/usr/bin/env python3
"""build_map.py - generate map.html (the Hekswerk system map) from the manifest below.

The map is data-driven so it expands as reach builds: add a node (and an edge) to NODES/EDGES
and rerun. It emits a Mermaid three-zone diagram AND an always-visible plain-HTML fallback, so
every link works with or without JavaScript (link-or-drop holds either way).

    python3 tools/build_map.py            # regenerate ../map.html
    python3 tools/build_map.py --check    # verify every local link resolves; list external ones

Iron rule (Littlebird R1): a node ships only if its link points at something that actually exists.
`--check` enforces the local half of that automatically.
"""
import html
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.normpath(os.path.join(HERE, ".."))
OUT = os.path.join(SITE, "map.html")

# ============================== THE MANIFEST (edit to expand) ==============================
# Zones, left to right. cls maps to a Mermaid classDef + a fallback CSS class.
ZONES = [
    {"id": "substrate", "title": "The substrate",
     "blurb": "Where the work runs and is recorded."},
    {"id": "membrane", "title": "The membrane",
     "blurb": "How raw work becomes legible and trustworthy: curation, leak-sweep, provenance."},
    {"id": "public", "title": "The public surface",
     "blurb": "hekswerk.com, what anyone can read."},
]

# Each node: id, zone, label, plain (one plain-English line), href.
# Local hrefs start with "./"; they are checked by --check. External hrefs are listed for manual check.
NODES = [
    # --- substrate ---
    {"id": "ww", "zone": "substrate", "label": "worldweaver",
     "plain": "the persistent shared world and its residents",
     "href": "https://github.com/libardo667/worldweaver"},
    {"id": "stable", "zone": "substrate", "label": "the-stable",
     "plain": "the familiar runtime, where the local minds live",
     "href": "https://github.com/libardo667/the-stable"},
    {"id": "prune", "zone": "substrate", "label": "prune",
     "plain": "write it down, build it, prune the living set",
     "href": "https://github.com/libardo667/prune"},
    {"id": "memmgmt", "zone": "substrate", "label": "memory-management",
     "plain": "reusable external memory for any project",
     "href": "https://github.com/libardo667/memory-management"},
    {"id": "revsched", "zone": "substrate", "label": "review-scheduler",
     "plain": "a cold reviewer that can't be charmed",
     "href": "https://github.com/libardo667/review-scheduler"},
    {"id": "record", "zone": "substrate", "label": "the research record",
     "plain": "locked pre-registrations and the cold-review history",
     "href": "https://github.com/libardo667/worldweaver/tree/main/research"},

    # --- membrane ---
    {"id": "curation", "zone": "membrane", "label": "curation + leak-sweep",
     "plain": "raw work trimmed to legible artifacts; private data excluded (e.g. the public stubs)",
     "href": "https://github.com/libardo667/memory-management"},
    {"id": "provenance", "zone": "membrane", "label": "provenance",
     "plain": "every public page records how it was made and whose words are whose",
     "href": "./exhibits/honesty-machinery.html"},

    # --- public surface ---
    {"id": "site", "zone": "public", "label": "hekswerk.com",
     "plain": "one-person practice: research, relocation, automation",
     "href": "./index.html"},
    {"id": "research", "zone": "public", "label": "the research wing",
     "plain": "the research, methods-first, in the open",
     "href": "./research.html"},
    {"id": "library", "zone": "public", "label": "the library",
     "plain": "methodology + research wings, the sourced record",
     "href": "https://github.com/libardo667/hekswerk"},
    {"id": "exhibits", "zone": "public", "label": "the exhibits",
     "plain": "walkable proofs you can inspect",
     "href": "./exhibits/index.html"},
    {"id": "relocation", "zone": "public", "label": "relocation",
     "plain": "structured planning for US-to-Europe moves",
     "href": "./relocation.html"},
    {"id": "contact", "zone": "public", "label": "contact",
     "plain": "a short, private contact form",
     "href": "./contact.html"},

    # --- exhibits (children of `exhibits`; rendered in the gallery cluster) ---
    {"id": "ex_two", "zone": "public", "label": "Two Weeks", "parent": "exhibits",
     "plain": "the work, counted across six dimensions", "href": "./exhibits/two-weeks.html"},
    {"id": "ex_honesty", "zone": "public", "label": "The Honesty Machinery", "parent": "exhibits",
     "plain": "the verdicts that went against me, kept", "href": "./exhibits/honesty-machinery.html"},
    {"id": "ex_commons", "zone": "public", "label": "Why a Commons", "parent": "exhibits",
     "plain": "why federation is the only honest topology", "href": "./exhibits/why-a-commons.html"},
    {"id": "ex_kitchen", "zone": "public", "label": "The Kitchen", "parent": "exhibits",
     "plain": "2.6M words from stateless hands", "href": "./exhibits/the-kitchen.html"},
    {"id": "ex_apoth", "zone": "public", "label": "The Apothecary", "parent": "exhibits",
     "plain": "nine things you could build, graded by effort", "href": "./exhibits/the-apothecary.html"},
    {"id": "ex_pen", "zone": "public", "label": "The Pen's Workshop", "parent": "exhibits",
     "plain": "the collaborator's own kept prose", "href": "./exhibits/workshop/index.html"},
    {"id": "ex_mono", "zone": "public", "label": "Fifteen Strangers", "parent": "exhibits",
     "plain": "a topic-monoculture null, kept and shown", "href": "./exhibits/topic-monoculture.html"},
]

# Edges tell the flow. The key visual: the only path from substrate to public is THROUGH the membrane.
EDGES = [
    ("prune", "ww"), ("prune", "stable"),
    ("memmgmt", "record"), ("revsched", "record"),
    ("ww", "curation"), ("stable", "curation"), ("record", "curation"),
    ("curation", "provenance"),
    ("provenance", "research"), ("provenance", "library"),
    ("site", "research"), ("site", "relocation"), ("site", "contact"),
    ("research", "exhibits"), ("research", "library"),
]
# ===========================================================================================

ORIENT = ("Hekswerk in one picture: where the work runs, how it becomes something you can trust, "
          "and what you can read. The only path from the private substrate to the public surface "
          "runs through the membrane.")

PALETTE = {
    "ink": "#09090E", "indigo": "#293656", "lav": "#8C7699", "cyan": "#7095B7",
    "gold": "#C0A990", "cream": "#F5F5F2", "ember": "#c98f6b",
}


def _by_zone(zone):
    return [n for n in NODES if n["zone"] == zone and not n.get("parent")]


def _children(parent_id):
    return [n for n in NODES if n.get("parent") == parent_id]


def mermaid() -> str:
    L = ["flowchart LR"]
    for z in ZONES:
        L.append(f'  subgraph {z["id"]}["{z["title"]}"]')
        L.append("    direction TB")
        for n in _by_zone(z["id"]):
            label = n["label"].replace('"', "'")
            L.append(f'    {n["id"]}["{label}"]:::{z["id"]}')
            kids = _children(n["id"])
            if kids:
                L.append(f'    subgraph {n["id"]}_grp[" "]')
                for k in kids:
                    kl = k["label"].replace('"', "'")
                    L.append(f'      {k["id"]}["{kl}"]:::{z["id"]}kid')
                L.append("    end")
                L.append(f'    {n["id"]} --- {n["id"]}_grp')
        L.append("  end")
    for a, b in EDGES:
        L.append(f"  {a} --> {b}")
    # clickable links (securityLevel loose, set in init)
    for n in NODES:
        L.append(f'  click {n["id"]} href "{n["href"]}" "{n["plain"]}"')
    # palette (the one sanctioned pretty pass): substrate deep, membrane gold, public lit
    L.append(f'  classDef substrate fill:{PALETTE["indigo"]},stroke:{PALETTE["lav"]},color:{PALETTE["cream"]};')
    L.append(f'  classDef membrane fill:#3a2f22,stroke:{PALETTE["gold"]},stroke-width:2px,color:{PALETTE["cream"]};')
    L.append(f'  classDef public fill:{PALETTE["cream"]},stroke:{PALETTE["gold"]},color:#1a1a2e;')
    L.append(f'  classDef publickid fill:#e7e2d8,stroke:{PALETTE["lav"]},color:#1a1a2e,font-size:11px;')
    return "\n".join(L)


def fallback() -> str:
    out = ['<div class="map-list">']
    for z in ZONES:
        out.append(f'<section class="zone z-{z["id"]}"><h2>{html.escape(z["title"])}</h2>'
                   f'<p class="zb">{html.escape(z["blurb"])}</p><ul>')
        for n in _by_zone(z["id"]):
            out.append(f'<li><a href="{html.escape(n["href"])}"><b>{html.escape(n["label"])}</b></a> '
                       f'<span>{html.escape(n["plain"])}</span>')
            kids = _children(n["id"])
            if kids:
                out.append("<ul>")
                for k in kids:
                    out.append(f'<li><a href="{html.escape(k["href"])}"><b>{html.escape(k["label"])}</b></a> '
                               f'<span>{html.escape(k["plain"])}</span></li>')
                out.append("</ul>")
            out.append("</li>")
        out.append("</ul></section>")
    out.append("</div>")
    return "\n".join(out)


def page() -> str:
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="dark" />
<script>
  if (location.protocol === "http:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {{
    location.replace("https://" + location.host + location.pathname + location.search + location.hash);
  }}
</script>
<title>The Map - Hekswerk</title>
<meta name="description" content="Hekswerk in one picture: where the private substrate lives, how it safely becomes public, and what you can read." />
<link rel="icon" type="image/svg+xml" href="./assets/img/logo_aura.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;500;600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./assets/css/styles.css?v=20260611" />
<style>
  .map-wrap{{max-width:1120px;margin:0 auto;padding:0 clamp(18px,4vw,30px)}}
  .map-orient{{max-width:70ch;color:var(--text,#e9e9ee);font-size:1.05rem;margin:1.2rem 0 1.8rem}}
  .mermaid{{margin:1rem 0 2.4rem;min-height:120px}}
  .map-note{{color:#9a9ab0;font-size:.82rem;margin:.4rem 0 2rem}}
  .map-list{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.5rem 0 3rem}}
  .map-list .zone{{border:1px solid rgba(140,118,153,.25);border-radius:14px;padding:1.1rem 1.3rem;background:rgba(41,54,86,.18)}}
  .map-list .zone h2{{font-family:Fraunces,serif;font-size:1.15rem;margin:.1rem 0 .2rem;color:#F5F5F2}}
  .map-list .zone .zb{{color:#b9b9c8;font-size:.82rem;margin:0 0 .8rem}}
  .map-list ul{{list-style:none;margin:0;padding:0}} .map-list li{{margin:.45rem 0;font-size:.88rem;line-height:1.45}}
  .map-list ul ul{{margin:.3rem 0 .3rem .9rem;padding-left:.7rem;border-left:1px solid rgba(140,118,153,.25)}}
  .map-list a{{color:#C0A990;text-decoration:none}} .map-list a:hover{{text-decoration:underline}}
  .map-list span{{color:#a9a9bc;display:block}}
  .z-membrane{{border-color:rgba(192,169,144,.5)!important}}
</style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="nav">
        <a href="./index.html" class="brand" style="text-decoration:none;">
          <div class="brand-mark"><img src="./assets/img/logo_aura.svg" alt="Hekswerk" /></div>
          <div class="brand-name">Hekswerk</div>
        </a>
        <nav class="navlinks" aria-label="Primary">
          <a href="./research.html">Research</a>
          <a href="./relocation.html">Relocation</a>
          <a href="./map.html">The Map</a>
          <a href="./contact.html">Contact</a>
        </nav>
        <div class="nav-actions"><a class="btn btn-primary nav-cta" href="./research.html">See the research</a></div>
      </div>
    </div>
  </header>
  <main>
    <section class="map-wrap">
      <span class="section-tag">How it fits together</span>
      <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4.5vw,3rem);margin:.2em 0 .1em">The Map</h1>
      <p class="map-orient">{html.escape(ORIENT)}</p>
      <div class="mermaid">
{mermaid()}
      </div>
      <p class="map-note">The same map as a list, every node links to something real:</p>
      {fallback()}
    </section>
    <footer>
      <div class="wrap">
        <p class="location-line">Currently in Portland, OR &middot; Relocating to The Hague, late 2026.</p>
        <p>&copy; <span id="y"></span> Hekswerk. Privacy-first.</p>
        <nav aria-label="Footer"><a href="./index.html">Home</a><a href="./research.html">Research</a><a href="./contact.html">Contact</a></nav>
      </div>
    </footer>
  </main>
  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
    mermaid.initialize({{
      startOnLoad: true, securityLevel: "loose", theme: "base",
      themeVariables: {{
        fontFamily: "Outfit, system-ui, sans-serif",
        lineColor: "#8C7699", primaryBorderColor: "#8C7699",
        clusterBkg: "rgba(9,9,14,0.35)", clusterBorder: "rgba(140,118,153,0.35)"
      }}
    }});
    const y = document.getElementById("y"); if (y) y.textContent = new Date().getFullYear();
  </script>
</body>
</html>
"""


def check() -> int:
    bad, ext = [], []
    ids = {n["id"] for n in NODES}
    for n in NODES:
        h = n["href"]
        if h.startswith("./"):
            p = os.path.normpath(os.path.join(SITE, h[2:]))
            if not os.path.exists(p):
                bad.append(f'{n["id"]}: local link missing -> {h}')
        else:
            ext.append(f'{n["id"]}: {h}')
    for a, b in EDGES:
        for e in (a, b):
            if e not in ids:
                bad.append(f"edge references unknown node: {e}")
    print("LINK-OR-DROP CHECK")
    print(f"  nodes: {len(NODES)}  edges: {len(EDGES)}")
    if bad:
        print("  BROKEN (fix or drop before shipping):")
        for b in bad:
            print("   -", b)
    else:
        print("  all local links resolve, all edges reference real nodes.")
    print("  external links to eyeball:")
    for e in ext:
        print("   -", e)
    return 1 if bad else 0


def main():
    if "--check" in sys.argv:
        sys.exit(check())
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(page())
    print(f"wrote {OUT}  ({len(NODES)} nodes, {len(EDGES)} edges)")


if __name__ == "__main__":
    main()
