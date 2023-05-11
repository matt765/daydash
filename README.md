# DayDash
Dashboard application designed to be an alternative to default starting page in browser
 
## Tech stack
React, NextJS, TypeScript, ChakraUI, Zustand, React Query, Framer Motion

## Live link
[https://daydash.app/](https://daydash.app/)

##  Project Structure
```
├── src
│   ├── assets
│   │   ├── icons
│   │   └── images
│   ├── components
│   │   ├── notepad
│   │   ├── loader
│   │   ├── planner
│   │   ├── settings
│   │   ├── sideButtons
│   │   ├── weather
│   │   └── welcome
│   ├── hooks
│   ├── pages
│   │   └── api
│   ├── store
│   ├── theme
│   │   └── components
│   ├── utils
│   ├── views
│   │   ├── dashboard
│   │   ├── intro
│   │   ├── notepad
│   │   └── snake
└── package.json
```

##  Features
- Current day and date
- Weather forecast
- "Did you know?" facts
- Quotes
- Task list
- Notepad
- Snake game (desktop only)
- Themes
- Customization through settings panel

##  How to run
All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site           |

## Disclaimer
The Firefox browser may occasionally exhibit a visual bug causing a flickering effect with the blur filter.  Issue seems to be browser-specific as it does not occur in Google Chrome. I am aware of this issue and am working towards a resolution. Blurred section background is visible in two out of the four themes.