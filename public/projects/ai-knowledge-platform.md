<!-- Generated from public portfolio content. -->

# AI Knowledge Platform

By Filip Iversen

[Canonical page](https://www.filipiversen.com/projects/ai-knowledge-platform)

Turning scattered PDFs and websites into answers people can check.

Work period: 2026 · Product Design · Engineering · live

Last reviewed: 2026-10-29

**Focus:** Connecting answers to evidence and editorial control.

**My contribution:** I owned design and engineering, from staff curation to public search and the directory.

**What shipped:** A live platform for staff curation, cited answers, and a shared directory and map.

**Evidence:** The case follows a citation bug through its fix and explains how refreshes preserve editorial changes. Visuals are explanatory illustrations.

A regional innovation network asked for better search. It connected
organizations, funding programs, and startups, but much of its information
was hard to find. Resources lived in PDFs, partner websites, and program
one-pagers.

I owned the design and engineering, from the staff review workflow to the
public search and directory. The platform is live. The initial proposal was
a search-and-filter plugin for the existing website. As we worked through the
requirements, the scope grew to include importing external material, reviewing
it, answering questions with source citations, and publishing a directory
and map.

The platform connects those tasks. Staff can add a PDF or a URL,
review the extracted information, and publish it. Approved material becomes
available to the search, while organization and program records also appear
in the directory.

### Review before publishing

1. **Import.** Add a PDF or website and extract its source material.
2. **Review.** A curator checks the material and decides what becomes public.
3. **Publish.** Approved evidence supports cited answers. Connected records appear in the directory and map.
4. **Refresh.** Updated evidence waits for review; editorial titles and summaries stay intact.

_A diagram of the editorial workflow, not a production interface._

## From a document to an answer

The first part of the work was getting usable content into the system. The
ingestion pipeline accepts PDFs and URLs, extracts their contents, and removes
navigation, ads, and other boilerplate. Some partner sites render their text
with JavaScript, so those pages need a browser to load before extraction.

A curator reviews the material before publishing it. That approval determines
what the public search can retrieve. The answer process draws on this approved
library rather than searching the open web.

Retrieval combines keyword search with semantic search, using embeddings
stored in PostgreSQL. Keyword matching handles exact names and specialist
terms; semantic search helps with questions phrased differently from the
source material. We combine the results to select passages for the answer.

The answer includes citations to those passages. A reader can follow the
reference and inspect the material behind the response.

![An illustrated search answer recommends the Example Lab Program for shared lab space and specialist equipment. A line connects citation 1 to the matching highlighted passage on page 4 of its program guide.](https://www.filipiversen.com/work/ai-knowledge-platform/follow-the-evidence-1672.webp)

_Follow a citation from the answer to the passage that supports it. Illustrative question, answer, and source shown._

## Fixing the citations

An early version retrieved a relevant passage but cited the beginning of its
document. The answer could look convincing while sending the reader to the
wrong evidence.

I traced the problem and corrected the citation handling to use the passage
that matched the question, so the reader could check the answer against it.

There also needed to be a path for questions the library couldn't answer. The
system compares its strongest match against an adjustable threshold. Below
that threshold, it returns a message explaining that it doesn't have a strong
match. The threshold controls when the product declines to answer; it doesn't
establish that every answer above it is correct. The reader still needs
the citation to check the source.

## Keeping the directory connected

The same curated database holds the network's organizations and programs,
their locations, and the categories and audiences used for filtering. That
data also powers the public directory and interactive map.

Staff approve an organization once. Its published record can then appear in
the directory, on the map, and as context for the search. They maintain those
records alongside the source material the answers draw from.

## Refreshing sources without undoing editorial work

Published web sources refresh on a schedule. The ingestion pipeline retries
transient failures, so a temporary network problem doesn't immediately end
the attempt to update a resource.

Re-ingestion also has to account for the work a curator has already done.
New source passages and embeddings wait for a curator's approval before replacing
the approved evidence. Edited titles, summaries, and existing publish status stay
intact. Staff can revise a resource's public description without having to redo
that work after the next scheduled refresh.

![Updated source passages sit in front of approved evidence and are marked Awaiting review. Beside them, an editorial record preserves the curator’s title, summary, and Published status, each marked with a check.](https://www.filipiversen.com/work/ai-knowledge-platform/refresh-without-rework-1672.webp)

_New source evidence waits for review while the curator’s title, summary, and publish status stay intact._

The shipped workflow lets staff review material before it becomes public,
maintain one record for the directory and map, and approve refreshed evidence
without losing their edits.
