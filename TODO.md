## Done

✅ - persistent logged-in state<br />
✅ - Design system<br />
✅ - SSL certificate man, this is embarassing!<br />
✅ - Home page<br />
✅ - Comments on posts<br />
✅ - Refreshing cookie on each login + something to prevent expired cookie failed requests<br />
✅ - Include clickable links in comments too<br />
✅ - Capitalize comment input<br />
✅ - Remove capitalization on register page<br />
✅ - Infinite dynamic post loading in scroll near bottom


## In Progress

🔶 - Trim usernames and passwords<br />
🔶 - Add validation to disallow spaces at start or end of passwords<br />
🔶 - Add eye toggle on register page, password inputs<br />
🔶 - Escape and sanitize post and comment content, even before it's sent to the backend<br />
🔶 - "See more" on longer posts and comments<br />

## Backlog
🕙 - End-to-end post size on mobile phones<br />
🕙 - Infinite scroll for Feed page<br />
🕙 - Eslint<br />
🕙 - Comment submit btn<br />
🕙 - Profile images<br />
🕙 - Post images<br />
🕙 - Adding friends and restricting non-friend access to profile<br />
🕙 - Exploding, well-defined design system, free from libraries<br />
🕙 - Largest contentful paint skeleton + loading indicators for every single thing<br />
🕙 - Protobuf!<br />
🕙 - Cache any posts younger than one month and only fetch newer ones during session<br /><br />

🕙 - Clicking on a username sends a /registry request before loading the appropriate profile page<br />
      - This is due to needint to load the page user and it being inside an effect<br />
      - Loading the posts is glitchy man. Sometimes clicking a user from a post author in the feed, loads the wrong stuff. But only sometimes. Makes you question reality. This needs a cleaner, simpler, tidier logic.
