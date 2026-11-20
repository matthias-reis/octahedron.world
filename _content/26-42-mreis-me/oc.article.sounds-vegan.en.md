```yaml @@
type: page
title: Sounds Vegan
format: article
publishedAs: sounds-vegan
language: en
description: A music and lifestyle blog with band interviews and a focus on sustainability and veganism. Worth a read and a subscription.
image: 26-005-sounds-vegan
imageShape: square
time: 2026-08-27T00:00:00.000Z
tags: []
relations:
  - rel: parent
    to: 26-42-mreis-me/work
```

[Sounds Vegan](https://soundsvegan.com) is, as its name says, about music and
veganism. This is the awesome blog of Anne, who is also my wife. I just helped
her navigate the technicalities.

## What the Blog Is

Band interviews, festival coverage and editorial pieces, with sustainability
running through all of it. Years and years of content, over 2000 articles and
counting.

Especially the interviews with some of my own favourite bands like Mono or
Crippled Black Phoenix were awesome. And I don't want to forget Moby, who unites
both of the topics perfectly and tops the artist roster.

The blog is heavily optimized for shareability and especially SEO. The share of
users coming from organic search is over 70%. Proof of content quality, but also
a lot of tweaking to get the tech there.

## What I Built

For me personally, this project was somehow my very own playground. I started my
own blogs decades ago with the goal to build a blog and understand the
technology, not to write - at least not in the beginning. So every iteration was
fun to build but then I didn't have the stamina to fill it with life.

Then Anne's project came along and I had both. Meaningful content and the
ability to improve its technology.

Here's the gist for a TL;DR: WordPress → Gatsby + Netlify CMS → Next.js → custom
Firebase CMS → Payload + Lexical on Hetzner

I remember the first iteration. I took over from wordpress.com and hosted our
own WordPress server and a significant set of plugins and theme optimisations.

But speed was its bottleneck. The database was slow and pages took almost a
second to load. Way too slow for good Web Vitals (which by the way didn't even
exist at that time). So the next iteration had to come and with it a gigantic
migration. Thousands of articles had to be transformed from the WordPress format
and metadata to Markdown and YAML.

In the end, everything ran on Gatsby and I used a CMS called Netlify CMS, which
follows a GitHub flow and edits files rather than database entries. The pages
were blazingly fast. I also hosted on Netlify. The complexity of a database was
gone, but every change demanded a build and therefore the interactivity while
creating - editing / reviewing / editing - was lost.

So I tweaked it. I experimented with incremental builds. Later I even exchanged
Gatsby with Next.js, Netlify CMS with the similar Tina CMS. The code was modular
enough to do that and Gatsby's star was about to sink anyway. This helped to
shave off another bit of time. But one minute is not real-time so the actual
problem stayed.

I decided to level up my own game and created my own bespoke CMS integrated into
the app. The core data format, Markdown, stayed, so I didn't have to touch the
rendering frontend. But yet another migration was needed - in the meantime the
articles had doubled. So I read in the Markdown and stored it in Firebase.
Firebase is incredibly easy to host and does not need any thoughts on scaling.
Additionally I did not have to change the data format.

I added a lot of features such as media management, versioning, two-pane live
preview. But there were a lot of edge cases to manage and maintain and we slowly
grew out of cost efficiency at Firebase. So after about three years, I also
dumped that solution.

Thankfully there is a generation of new open source CMS systems on the market
now, that have really cool features. So I switched to Payload CMS.

We arrived in the age of coding agents. With their help, I did yet another
migration. This time bigger than the ones before. From Markdown to Lexical
(something like a JSON abstract syntax tree for markup). We hosted on Hetzner
and therefore also didn't rely on big tech anymore.

## What Else Was in There?

This project had so many more aspects:

- Full text search - first through Algolia, later with JavaScript-based fuzzy
  search (Fuse.js), including index handling.
- Analytics evolution from Google over Piwik Pro (until they asked for more
  money than we spent on hosting as a whole) to Matomo and probably Umami up
  next.
- URL consistency. The Google index is in the lead, so no URL format and no old
  slug must get lost. A rich redirect engine does that job.
- Custom components such as integrated iTunes and Spotify playlists
- A newsletter generated from the RSS feed of the blog

## Final Words

This blog was a big opportunity for me. I learned many frameworks and
technologies that you rarely touch as an employee on a fixed stack, and I found
out where each of them shines and where it breaks. Along the way I learned a lot
about on-page SEO, cost optimisation and page speed.

But the tech was only ever there to carry the content. Behind every one of those
migrations are Anne's 2000+ articles: interviews with bands we love, festival
reports and stories about living a bit more consciously. If you like music and
care about animals and the planet, have a look at
[soundsvegan.com](https://soundsvegan.com), and subscribe to the newsletter
while you're there.
