# reneepang.com

Landing page and interactive demo for the [Renee PUA Skill](https://github.com/shuaige121/renee-pua-skill) -- a Claude Code skill that fights LLM laziness with workplace PUA rhetoric.

**Live site:** https://reneepangcom.pages.dev/

## About

This repo contains the **website** source code only. The actual Claude Code skill files (command, phrases, detection patterns) live in the [renee-pua-skill](https://github.com/shuaige121/renee-pua-skill) repo.

The site showcases how the skill works with interactive demos: contract generation, laziness detection, PUA phrase showcase, and performance scoring.

## Tech Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/) (project: `reneepangcom`)
- i18n support (zh / en)

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build (output: dist/)
npm run preview  # Preview production build locally
```

## Deployment

Pushes to `master` are automatically deployed to Cloudflare Pages.

## License

MIT
