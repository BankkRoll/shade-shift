# ShadeShift: Theme Transitions for Next.js Pages

[![npm version](https://img.shields.io/npm/v/shade-shift.svg?style=flat-square)](https://www.npmjs.com/package/shade-shift)
[![Build Status](https://img.shields.io/travis/BankkRoll/shade-shift/main.svg?style=flat-square)](https://travis-ci.org/BankkRoll/shade-shift)
[![Coverage Status](https://img.shields.io/codecov/c/github/BankkRoll/shade-shift/main.svg?style=flat-square)](https://codecov.io/gh/BankkRoll/shade-shift)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-12.0+-black.svg?style=flat-square)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

ShadeShift is a powerful, flexible, and performant theme transition library designed specifically for Next.js pages router applications. It provides seamless, animated transitions between themes, enhancing user experience and adding a layer of polish to your web applications.

## 🌟 Key Features

- 🎨 Smooth, customizable theme transitions
- 🚀 Optimized for performance with requestAnimationFrame
- 🔄 Seamless integration with Next.js and next-themes
- 🧩 Modular architecture for easy extensibility
- 📱 Responsive design support
- 🔧 Fine-grained control over transition parameters
- 🔌 Plugin system for custom transition effects
- 📊 Built-in analytics for transition performance monitoring
- 💡 TypeScript support for enhanced developer experience
- 🛠️ Easy to use API with hooks and components

## Table of Contents

- [ShadeShift: Theme Transitions for Next.js Pages](#shadeshift-theme-transitions-for-nextjs-pages)
  - [🌟 Key Features](#-key-features)
  - [Table of Contents](#table-of-contents)
  - [🚀 Quick Start](#-quick-start)
  - [🛠️ Installation](#️-installation)
  - [🔧 Usage](#-usage)
    - [Setting up ShadeShiftProvider](#setting-up-shadeshiftprovider)
    - [Implementing Theme Toggle](#implementing-theme-toggle)
    - [Route-based Theme Switching](#route-based-theme-switching)
  - [🧠 Core Concepts](#-core-concepts)
  - [📚 API Reference](#-api-reference)
    - [ShadeShiftProvider](#shadeshiftprovider)
    - [useThemeTransition](#usethemetransition)
    - [useRouteThemeSync](#useroutethemesync)
    - [TransitionConfig](#transitionconfig)
  - [🔬 Advanced Usage](#-advanced-usage)
    - [Custom Transition Effects](#custom-transition-effects)
    - [Transition Chaining](#transition-chaining)
    - [Dynamic Transition Parameters](#dynamic-transition-parameters)
  - [⚡ Performance Optimization](#-performance-optimization)
  - [🎨 Styling and Theming](#-styling-and-theming)
    - [CSS Variables](#css-variables)
    - [Tailwind CSS](#tailwind-css)
    - [Styled Components](#styled-components)
  - [🌐 Browser Compatibility](#-browser-compatibility)
  - [🔍 Troubleshooting](#-troubleshooting)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [📈 Star History](#-star-history)

## 🚀 Quick Start

Get started with ShadeShift in your Next.js project by following these steps:

1. **Installation**

   Install ShadeShift and its peer dependency:

   ```bash
   npm install shade-shift next-themes
   # or
   yarn add shade-shift next-themes
   # or
   pnpm add shade-shift next-themes
   ```

2. **Setup ShadeShiftProvider**

   You have two options to set up the `ShadeShiftProvider`:

   <details>
   <summary>Option A: Wrap your custom ThemeProvider (Recommended)</summary>

   ```tsx
   // context/theme-provider.tsx
   "use client";
   import * as React from "react";
   import { ThemeProvider as NextThemesProvider } from "next-themes";
   import { type ThemeProviderProps } from "next-themes/dist/types";
   import { ShadeShiftProvider } from "shade-shift";

   export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
     return (
       <ShadeShiftProvider>
         <NextThemesProvider {...props}>{children}</NextThemesProvider>
       </ShadeShiftProvider>
     );
   }
   ```

   Then, use this `ThemeProvider` in your `_app.tsx` or `layout.tsx`:

   ```tsx
   // pages/_app.tsx or app/layout.tsx
   import { ThemeProvider } from "../context/theme-provider";

   export default function App({ Component, pageProps }) {
     return (
       <ThemeProvider attribute="class" defaultTheme="dark">
         <Component {...pageProps} />
       </ThemeProvider>
     );
   }
   ```

   </details>

   <details>
   <summary>Option B: Wrap your entire app</summary>

   ```tsx
   // pages/_app.tsx
   import { ShadeShiftProvider } from "shade-shift";
   import { ThemeProvider } from "next-themes";

   function MyApp({ Component, pageProps }) {
     return (
       <ShadeShiftProvider>
         <ThemeProvider attribute="class" defaultTheme="dark">
           <Component {...pageProps} />
         </ThemeProvider>
       </ShadeShiftProvider>
     );
   }

   export default MyApp;
   ```

   </details>

3. **Implement Theme Toggle**

   You can now use ShadeShift's hooks to implement theme toggling. Here are two approaches:

   <details>
   <summary>Option A: Use ShadeShift's pre-built ThemeToggle component</summary>

   ```tsx
   import { ThemeToggle } from "shade-shift/components";

   function MyComponent() {
     return (
       <div>
         <h1>My App</h1>
         <ThemeToggle />
       </div>
     );
   }
   ```

   </details>

   <details>
   <summary>Option B: Create a custom theme toggle using ShadeShift hooks</summary>

   ```tsx
   "use client";
   import * as React from "react";
   import { AnimatePresence, motion } from "framer-motion";
   import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
   import {
     Tooltip,
     TooltipArrow,
     TooltipContent,
     TooltipProvider,
     TooltipTrigger,
   } from "@/components/ui/tooltip";
   import { useEffect, useState } from "react";
   import { Button } from "@/components/ui/button";
   import { useTheme } from "next-themes";
   import { shade_shift } from "shade-shift";

   export function ThemeToggle() {
     const { theme, setTheme } = useTheme();
     const [currentTheme, setCurrentTheme] = useState<string | undefined>(
       undefined
     );
     const { transition_theme } = shade_shift.use_theme_transition();

     useEffect(() => {
       setCurrentTheme(theme);
     }, [theme]);

     const handleToggle = () => {
       setCurrentTheme((prevTheme) => {
         let newTheme;
         if (prevTheme === "light") {
           newTheme = "dark";
         } else if (prevTheme === "dark") {
           newTheme = "system";
         } else {
           newTheme = "light";
         }
         transition_theme(newTheme, {
           type: "vortex",
           duration: 1000,
           intensity: 5,
         });
         return newTheme;
       });
     };

     if (currentTheme === undefined) {
       return null;
     }

     return (
       <TooltipProvider>
         <Tooltip>
           <TooltipTrigger asChild>
             <Button
               variant="ringHoverOutline"
               size="icon"
               onClick={handleToggle}
               className="relative flex items-center justify-center"
             >
               <AnimatePresence initial={false} mode="wait">
                 {currentTheme === "light" && (
                   <motion.div
                     key="light"
                     initial={{ opacity: 0, rotate: -90, scale: 0 }}
                     animate={{ opacity: 1, rotate: 0, scale: 1 }}
                     exit={{ opacity: 0, rotate: 90, scale: 0 }}
                     transition={{ duration: 0.15 }}
                     className="absolute"
                   >
                     <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                   </motion.div>
                 )}
                 {currentTheme === "dark" && (
                   <motion.div
                     key="dark"
                     initial={{ opacity: 0, rotate: -90, scale: 0 }}
                     animate={{ opacity: 1, rotate: 0, scale: 1 }}
                     exit={{ opacity: 0, rotate: 90, scale: 0 }}
                     transition={{ duration: 0.15 }}
                     className="absolute"
                   >
                     <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                   </motion.div>
                 )}
                 {currentTheme === "system" && (
                   <motion.div
                     key="system"
                     initial={{ opacity: 0, rotate: -90, scale: 0 }}
                     animate={{ opacity: 1, rotate: 0, scale: 1 }}
                     exit={{ opacity: 0, rotate: 90, scale: 0 }}
                     transition={{ duration: 0.15 }}
                     className="absolute"
                   >
                     <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
                   </motion.div>
                 )}
               </AnimatePresence>
               <span className="sr-only">Toggle theme</span>
             </Button>
           </TooltipTrigger>
           <TooltipContent sideOffset={10}>
             {currentTheme === "light" && <p>Light Mode</p>}
             {currentTheme === "dark" && <p>Dark Mode</p>}
             {currentTheme === "system" && <p>System Mode</p>}
             <TooltipArrow className="fill-primary" />
           </TooltipContent>
         </Tooltip>
       </TooltipProvider>
     );
   }
   ```

   </details>

4. **Optional: Set up Route-based Theme Switching**

   If you want to change themes based on routes, you can use the `useRouteThemeSync` hook:

   ```tsx
   import { shadeShift } from "shade-shift";

   function MyApp({ Component, pageProps }) {
     shadeShift.useRouteThemeSync({
       "/": { theme: "light", transition: { type: "fade", duration: 500 } },
       "/dark-mode": {
         theme: "dark",
         transition: { type: "vortex", duration: 1000 },
       },
     });

     return <Component {...pageProps} />;
   }
   ```

That's it! You now have ShadeShift set up in your Next.js project with smooth theme transitions.

## 🛠️ Installation

To install ShadeShift, run one of the following commands in your project directory:

```bash
npm install shade-shift next-themes
# or
yarn add shade-shift next-themes
# or
pnpm add shade-shift next-themes
```

## 🔧 Usage

### Setting up ShadeShiftProvider

The `ShadeShiftProvider` component is the core of ShadeShift. It manages the theme transition state and provides the necessary context for all ShadeShift hooks and components.

```tsx
import { ShadeShiftProvider } from "shade-shift";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ShadeShiftProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </ShadeShiftProvider>
  );
}

export default MyApp;
```

### Implementing Theme Toggle

You can implement theme toggling using either the pre-built `ThemeToggle` component or by creating a custom component using ShadeShift hooks.

<details>
<summary>Using pre-built example ThemeToggle component</summary>

```tsx
import { ThemeToggle } from "shade-shift/components";

function MyComponent() {
  return (
    <div>
      <h1>My App</h1>
      <ThemeToggle />
    </div>
  );
}
```

</details>

<details>
<summary>Creating a custom theme toggle</summary>

```tsx
import { shadeShift } from "shade-shift";
import { useTheme } from "next-themes";

function CustomThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { transitionTheme } = shadeShift.useThemeTransition();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    transitionTheme(newTheme, {
      type: "vortex",
      duration: 1000,
      intensity: 5,
    });
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

</details>

### Route-based Theme Switching

ShadeShift allows you to change themes based on routes using the `useRouteThemeSync` hook:

```tsx
import { shadeShift } from "shade-shift";

function MyApp({ Component, pageProps }) {
  shadeShift.useRouteThemeSync({
    "/": { theme: "light", transition: { type: "fade", duration: 500 } },
    "/dark-mode": {
      theme: "dark",
      transition: { type: "vortex", duration: 1000 },
    },
  });

  return <Component {...pageProps} />;
}
```

## 🧠 Core Concepts

ShadeShift is built around several core concepts:

1. **Transition Engine**: Manages the queue and execution of theme transitions.
2. **Transition Effects**: Implements various visual effects for theme transitions.
3. **Theme Provider**: Integrates with next-themes for seamless theme management.
4. **Route Sync**: Allows for automatic theme changes based on routes.

---

## 📚 API Reference

### ShadeShiftProvider

The main provider component that wraps your application.

```tsx
<ShadeShiftProvider>{/* Your app components */}</ShadeShiftProvider>
```

### useThemeTransition

A hook that provides theme transition functionality.

```tsx
const { theme, transitionTheme, transitionState } =
  shadeShift.useThemeTransition();
```

- `theme`: The current theme
- `transitionTheme(newTheme: string, config: TransitionConfig)`: Function to trigger a theme transition
- `transitionState`: Current state of the transition

### useRouteThemeSync

A hook that synchronizes themes with routes.

```tsx
const routeThemeMap = {
  "/": { theme: "light", transition: { type: "fade", duration: 500 } },
  "/dark-mode": {
    theme: "dark",
    transition: { type: "vortex", duration: 1000 },
  },
};

shadeShift.useRouteThemeSync(routeThemeMap);
```

### TransitionConfig

Configuration object for transitions.

```typescript
interface TransitionConfig {
  type: "splitScreen" | "diagonalWipe" | "morphology" | "pixelate" | "vortex";
  duration: number;
  easing: string;
  direction?:
    | "horizontal"
    | "vertical"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  intensity?: number;
}
```

## 🔬 Advanced Usage

### Custom Transition Effects

You can create custom transition effects by implementing the `TransitionFunction` type:

<details>
<summary>View Custom Transition Example</summary>

```typescript
import { TransitionFunction } from "shade-shift";

const myCustomTransition: TransitionFunction = async (
  element,
  fromTheme,
  toTheme,
  config,
  onProgress
) => {
  const { duration } = config;
  const start = performance.now();

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    onProgress(progress);

    // Implement your custom animation logic here
    element.style.backgroundColor = progress < 0.5 ? fromTheme : toTheme;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);

  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
};

// Usage
transitionTheme("dark", {
  type: "custom",
  duration: 1000,
  customTransition: myCustomTransition,
});
```

</details>

### Transition Chaining

Chain multiple transitions for complex effects:

<details>
<summary>View Transition Chaining Example</summary>

```typescript
const complexTransition = async () => {
  await transitionTheme("intermediateTheme", { type: "fade", duration: 500 });
  await transitionTheme("finalTheme", { type: "vortex", duration: 1000 });
};

// Usage
<button onClick={complexTransition}>Complex Transition</button>;
```

</details>

### Dynamic Transition Parameters

Adjust transition parameters based on device capabilities or user preferences:

<details>
<summary>View Dynamic Parameters Example</summary>

```typescript
const adaptiveTransition = () => {
  const { performanceScore } = getDeviceCapabilities();
  const duration = performanceScore > 80 ? 1000 : 500;
  transitionTheme("newTheme", { type: "morphology", duration });
};

// Usage
<button onClick={adaptiveTransition}>Adaptive Transition</button>;
```

</details>

## ⚡ Performance Optimization

ShadeShift is designed with performance in mind, but here are some tips to ensure smooth transitions:

1. Use the `throttle` and `debounce` utilities for event handlers.
2. Implement progressive enhancement for low-end devices.
3. Optimize your theme stylesheets to minimize CSSOM operations.
4. Use the built-in performance monitoring tools to identify bottlenecks.
5. Consider using the `will-change` CSS property to optimize animations.

<details>
<summary>View Performance Optimization Examples</summary>

```typescript
import { shadeShift } from "shade-shift";

// Throttle theme transitions
const throttledTransition = shadeShift.throttle((newTheme, config) => {
  shadeShift.transitionTheme(newTheme, config);
}, 200);

// Debounce theme changes based on user input
const debouncedThemeChange = shadeShift.debounce((newTheme) => {
  shadeShift.transitionTheme(newTheme, { type: "fade", duration: 300 });
}, 300);

// Progressive enhancement
const performTransition = (newTheme, config) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Simplified transition for users who prefer reduced motion
    shadeShift.transitionTheme(newTheme, { type: "fade", duration: 100 });
  } else {
    shadeShift.transitionTheme(newTheme, config);
  }
};

// Optimize CSS animations
const optimizeForAnimation = (element) => {
  element.style.willChange = "transform, opacity";
  // Perform animation
  element.addEventListener("transitionend", () => {
    element.style.willChange = "auto";
  });
};
```

</details>

## 🎨 Styling and Theming

ShadeShift is designed to work seamlessly with your existing styling solutions. Here are some tips for integrating ShadeShift with popular styling approaches:

### CSS Variables

Use CSS variables to define your theme colors and easily switch between them:

```css
:root {
  --background: white;
  --text: black;
}

[data-theme="dark"] {
  --background: black;
  --text: white;
}

body {
  background-color: var(--background);
  color: var(--text);
}
```

### Tailwind CSS

If you're using Tailwind CSS, you can leverage its built-in dark mode support. Here's how to set it up in your `globals.css` or main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: white;
    --text: black;
  }
  .dark {
    --background: black;
    --text: white;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Then, in your Tailwind config file (`tailwind.config.js`), ensure you have the dark mode set up:

```javascript
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--text)",
      },
    },
  },
  // ... other configurations
};
```

Now you can use these variables in your components:

```jsx
function MyComponent() {
  return (
    <div className="bg-background text-foreground">
      {/* Your component content */}
    </div>
  );
}
```

### Styled Components

For Styled Components users, you can access the current theme in your styles:

```jsx
import styled from "styled-components";

const StyledComponent = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;
```

## 🌐 Browser Compatibility

ShadeShift is compatible with all modern browsers. For older browsers, we provide fallback options that gracefully degrade the transition effects.

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 60              |
| Firefox | 55              |
| Safari  | 11              |
| Edge    | 79              |
| IE      | Not supported   |

## 🔍 Troubleshooting

Here are some common issues and their solutions:

1. **Transitions not working**

   - Ensure `ShadeShiftProvider` is at the root of your app.
   - Check if `next-themes` is properly configured.

2. **Flickering during transitions**

   - Check for conflicting CSS animations.
   - Ensure your CSS is properly scoped to avoid overrides.

3. **Performance issues**

   - Use the performance optimization tips mentioned above.
   - Consider simplifying complex transitions on low-end devices.

4. **TypeScript errors**
   - Make sure you're using the latest version of ShadeShift.
   - Check if your `tsconfig.json` includes all necessary compiler options.

If you encounter any other issues, please check our [GitHub issues](https://github.com/BankkRoll/shade-shift/issues) page or open a new issue.

## 🤝 Contributing

We welcome contributions to ShadeShift! Here's how you can help:

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Issue that pull request!

Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

ShadeShift is MIT licensed. See the [LICENSE](LICENSE) file for details.

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=BankkRoll/shade-shift&type=Date)](https://star-history.com/#BankkRoll/shade-shift&Date)
