```yaml @@
title: Setup your AI Agent
description: >-
  Practical patterns I've settled on for working effectively with AI agents:
  rights, context hygiene, commit discipline, skill hierarchies, and parallel
  workflows.
slug: posts/generic-setup-of-ai-agents
group: posts
type: article
date: 2026-04-15T00:00:00.000Z
image: setup-your-ai-agent
```

Working with AI agents every day has changed how I think about software
development less than I expected — and more than I thought it would in places I
didn't anticipate. The fundamentals haven't moved. But the leverage points have
shifted, and some habits that were merely good before are now essential.

These are the patterns I've settled on. Not a tutorial, not a product
comparison. Just a set of principles that emerged from running agents on real
projects — the ones I keep returning to when something goes wrong or when I'm
setting up a new context from scratch.

---

**Quick Access**

- Verify everything; write fast tests; review generated test cases carefully
- Fix small things manually rather than restarting the whole context
- Start in the coding agent — don't migrate mid-task from a chat interface
- Never use browser agent plugins — use Playwright (MCP or CLI) in incognito
  instead
- Allow read-only operations broadly; guard sensitive files explicitly
- Let the agent commit and push — but never to `main` or `staging`
- Ask about problems, not solutions; start in the right tool from the beginning
- Use 1Password CLI injection to keep env variables consistent across all tools
- Place skills globally, per-project, or privately — be intentional about where
- Parallelise across separate checkouts, not inside one; design tasks to be
  independent
- Kaizen and your agent setup. Work on it, improve it permanently.

---

## Always Verify, Fail Fast, Always Review

The things we've been preaching in software development for years matter even
more now.

Always plan before going deep. You don't want to have a junior dev spend hours
going into the wrong direction, neither do you want the AI to spend time and
tokens on things you actually don't want.

Also write tests, but write them in a way they don't take 30 minutes to run.
With a human developer, a slow test suite is annoying but it's in CI, so more or
less acceptable. With an agent, it's a productivity killer — and also a token
burner. In a CI pipeline, visual or integration tests can run anyway since
you're not waiting for them interactively. But for everything the agent does
locally as part of a task loop, fast feedback is critical for the machine
itself. So setup linting, setup strict type rules and create real unit tests.
That said, you don't have to write the tests yourself. That's kind of the point.

What you do have to do is review them. The review step is probably the biggest
differentiator between vibe coding and actually working well with an AI agent.
Read what was generated. Understand it. And specifically: read the test cases.
Does the test actually cover what you care about? Is the assertion testing the
behaviour or just that the function ran?

Code style and variable names matter less here than usual — the agent's naming
is rarely terrible. But if you'd be confused looking at the code in three weeks,
push back. Clarity is still your responsibility.

## Do Simple Fixes Yourself

Agents are surprisingly quickly applying weird and last resort strategies like
patching third party dependencies or make other dubious choices. The "correct"
move at that point is usually to start over with a clearer prompt or even a
suggested approach. In practice though, a small nudge or even a tiny manual edit
often gets things back on track faster. It's still allowed to touch code, you
know?

Especially with layout and design: agents can be genuinely good at it — I've
seen css transitions and visual details from an agent that I wouldn't have
bothered with myself. But they also tend to bend the system. Strange CSS
overrides, weird Tailwind combinations, hacks that technically work but will
bite you later. For styling tasks specifically, I've found it's worth making a
quick manual cleanup before bending my brain around explaining what I want.

## Keep Context Together, Don't Mix Agents if Possible

This one I learned the hard way. You're having a productive conversation in
Claude App, scoping out a topic in discovery. Then it tells you to try a bash
command. You copy it, fiddle with the placeholder, run it, paste the result
back. Then it happens again. And again.

The lesson: if you expect to touch a file or run a command, start in the coding
agent from the beginning. The productivity gap between a coding agent with full
context and a chat interface where you're acting as the clipboard is enormous.
Switching mid-task also loses the context gradient — the agent in a new session
doesn't know what you already tried, what constraints you found, or what dead
ends you hit.

## Security Mindset

Do not use browser agent plugins. I don't recommend them at all. These
extensions run inside your regular browser profile — the one with your active
sessions, saved passwords, banking tabs. They might be safe and behave well, but
who knows. An agent with access to that context has access to everything you do.
One confused task, one prompt injection in a page the agent visits, and the
blast radius is your entire digital life.

A security mindset in general is probably the most important skill to bring to
this work yourself. Agents are powerful precisely because they can act — which
means the consequences of acting wrongly are real. Think about what each tool
and permission actually touches before you grant it.

For browser automation specifically: set up Playwright properly instead, either
via MCP or CLI skill. It always starts in a clean incognito session with no
access to your real browser state. And you'll need it anyway for integration
tests — so the setup pays for itself twice.

## Rights

On a default setup on the other hand, agents ask permission for everything
(yeah, their developers also have a security mindset). "May I run the linter?"
"May I run the tests?" "May I check the file list?" The answer to all of these
is obviously yes — you don't want to come back from the coffee machine and find
the agent has been waiting for approval for 20 minutes.

My approach: allow a lot upfront, especially read-only operations like `ls`,
`cat`, `jq`, and of course test runners. Then add guards for the things that
actually matter. I never let the agent read `.env*` files or my shell config.
The allow list is generous, but it's an allow list, not a deny list; the guard
list is short and strict. This gives the agent the autonomy to actually do its
job while keeping the sensitive parts locked down.

## Allow to Commit, Allow to Push. But Never on `main`

Agents write excellent commit messages. They've seen the full diff, they know
what changed and why — better framing than most humans bother to write under
time pressure. So I let them commit. I also let them create branches and push.

The guard is simple: no direct commits to `main` or `staging`. The agent knows
this and respects it. The practical workflow ends up clean: feature branch,
commits with good messages, push, pull request. All the discipline of a proper
workflow without the overhead of doing the mechanical parts yourself.

## Describe the Problem, Not the Solution

Early on, I would ask the agent things like "what's the cheapest way to add
caching to X?" — open-ended questions to build up my own knowledge. The problem
is that these conversations tend to get concrete, and by the time you know what
you actually want to do, you're deep in a session in the wrong tool. You've
accumulated context in Claude App with Opus when you should be in a coding agent
with the files open.

One workaround is asking the AI to write a handover prompt. It works, but it's
friction. The better habit: if there's any chance you'll be touching code, start
in the coding agent from the beginning. They are the same person :-). Ask the
exploratory question there. You can always pivot to implementation (or to issue
generation) without a context switch.

## ENV Variable Consistency

As your setup becomes more sophisticated — multiple tools, multiple editor
integrations, scripts and hooks — env variable consistency becomes a real
problem. CLI tools inherit shell env variables naturally. IDE plugins often
don't. API keys configured in one place are missing in another. You end up with
a patchwork of `.env` files, shell exports, and workarounds.

The only clean solution I've found is 1Password with its CLI tooling. The
injection syntax works directly in `.env` files:

```bash
GEMINI_API_KEY="op://vault/item/section/label"
```

The reference resolves at runtime. Every tool, every context, same value —
without ever storing the actual key in a file that might get committed or
leaked. And on top you gain a little bit of security again.

## Skill and Command Hierarchy

Skills (custom slash commands) accumulate quickly once you get into them. The
temptation is to install everything globally, but that gets messy and might lead
to strange behaviours in projects that are not your normal standard setup. The
right structure mirrors how you'd think about configuration generally:

**Global** — things in your home directory. At minimum: a "find skills" skill so
you can discover what's available. Beyond that: your writing style preferences,
general coding conventions, things that apply regardless of project.

**Project, shared** — committed to the repo. Everyone on the team benefits,
agents across all tools can use it (most understand natural language equally
well). This is the right place for project-specific workflows, deployment
patterns, domain context.

**Project, private** — in `CLAUDE.local.md`, added to `.gitignore`. Use
sparingly. If you're adding something here, ask yourself whether other
contributors wouldn't also benefit from it. Usually they would.

The discipline of placing skills correctly pays off when you're switching
projects — you get the global habits automatically, and the project-specific
stuff is waiting for you.

## Work on Tasks in Parallel

> **Addendum, August 2026:** the original version of this section recommended
> git worktrees. I've since taken the opposite position and my setups now
> forbid agents from creating worktrees entirely. What follows is what I
> actually do instead.

Parallelism is worth having. Letting an agent create its own worktree inside the
project tree to get it is not. Every worktree is a second working directory with
its own state, its own half-installed dependencies and its own detached branch,
and the failure mode is always the same: you look at a file, the agent looks at
a different copy of that file, and one of you is wrong for twenty minutes before
anybody notices. The isolation an agent gets from a worktree is not worth the
ambiguity it costs you.

What replaced it is duller and works better. One checkout per repository, one
agent per checkout, the agent works on the branch that is checked out and puts
it back the way it found it. If I want two things running at once, I run them in
two repositories, or in two clearly separate areas of the same one, sequenced so
they never touch the same files. Before an agent starts I check the tree is
clean; if it isn't, that's my problem to resolve, not something the agent should
route around.

In practice two concurrent agents is about my sweet spot given token
constraints, but the setup scales further. The key constraint is unchanged and
it was always the real one: independence. Tasks that depend on each other can't
run in parallel, so it's worth designing them to be as independent as possible —
or idempotent, so to say :-). Separate areas of the codebase. Separate services
if you have them. Separate concerns entirely. You'll see that it also helps your
architecture. The worktree was never what made parallel work possible; task
design was.

The other thing parallel work changes is how you use waiting time. When an agent
is running a long task, that's not dead time. Coffee is still needed, but that's
also the time to write or refine the next task, review a different branch, or
context-switch to another project. Watching Claude Code combombulating (or
whatever) is rarely the right move.

## Final Notes

This text is also for myself to rehearse and remember to actually spend time on
the setup.

That directly leads to my main tip. **Do spend time on optimising your agent.**
It improves the quality and reduces the fail rate drastically. I know that
working on concrete problems is most of the time more urgent. But "nothing comes
from nothing" is a famous German saying. So invest a little bit of activation
energy and apply Kaizen to your agent processes.
