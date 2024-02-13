# hyop

Hypermedia Operation. Tiny library (starting at 61 B) to hydrate operations in the hyop attribute. Remove bloat from hydration & JS payloads. Use standalone or with other Hypermedia libraries like HTMX...Hydration as Hypermedia

This library can be used in a build environment or imported as an ESM in a `<script>` tag. For smaller JS payloads, use a build environment.

Custom hyop functions can be used to hydrate server rendered html & isomorphic components. General purpose hyop functions can be released as npm packages. General purpose hyops will support a foundation for minimal-bloat tree-shakable Hypermedia libraries.

| use case           | size  | imports                                     |
|--------------------|:-----:|---------------------------------------------|
| single_hyop        | 61 B  | `import { single_hyop } from 'hyop'`        |
| multi_hyop         | 81 B  | `import { multi_hyop } from 'hyop'`         |
| verify_single_hyop | 146 B | `import { verify_single_hyop } from 'hyop'` |
| verify_multi_hyop  | 160 B | `import { verify_multi_hyop } from 'hyop'`  |

## Install using NPM

```
npm i hyop
```

## Browser logic in a JS/TS build environment

[//]: @formatter:off
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="content"></div>
    <input type="text" hyop="input__hyop">
  </body>
</html>
```
[//]: @formatter:on

[//]: @formatter:off
```ts
import { single_hyop } from 'hyop/single_hyop'
window.addEventListener('load', ()=>{
  single_hyop(document, {
    input__hyop: input=>{
      const content = document.querySelector('#content')
      input.addEventListener(
				'input',
        evt=>content.innerText = evt.target.value ?? '')
    }
  })
})
```
[//]: @formatter:on

## Use as a Script Tag

[//]: @formatter:off
```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { single_hyop } from 'https://esm.run/hyop/single_hyop'
      window.addEventListener('load', ()=>{
        single_hyop(document, {
          input__hyop: input=>{
            const content = document.querySelector('#content')
            input.addEventListener(
							'input',
              evt=>content.innerText = evt.target.value ?? '')
          }
        })
      })
    </script>
  </head>
  <body>
    <div id="content"></div>
    <input type="text" hyop="input__hyop">
  </body>
</html>
```
[//]: @formatter:on

## multi_hyop

Multiple hyops can be used in a single tag by using `multi_hyop` instead of `single_hyop`. The standalone size is `81 B` instead of `61 B`. For the extra bytes, you gain the ability to compose hyops.

## Development & Debugging

`single_hyop` & `multi_hyop` are implemented to have a minimal payload size. If a hyop is missing, a non-friendly error will occur. If there are unused hyops loaded, then it will run with the dead code bloat.

`verify_single_hyop` & `verify_multi_hyop` can be used to throw a friendly error message for missing hyops & for unused hyops. This facilitates debugging & removing dead code bloat.

In a build environment, you can also use `@ctx-core/preprocess` with the `DEBUG` configuration to make `single_hyop` run `verify_single_hyop` & `multi_hyop` run `verify_multi_hyop`.

## DEBUG mode as an esbuild plugin

If you don't want to switch between `single_hyop` or `multi_hyop` in production & `verify_single_hyop` or `verify_multi_hyop` in development, you can use the `@ctx-core/preprocess` or `preprocess` library.

[//]: @formatter:off
```ts
import { preprocess } from '@ctx-core/preprocess'
import { import_meta_env_ } from 'ctx-core/env'
import { type Plugin } from 'esbuild'
import { readFile } from 'node:fs/promises'
function hyop_plugin_():Plugin {
  return {
    name: 'hyop',
    setup(build) {
      if (import_meta_env_().NODE_ENV !== 'production') {
        build.onLoad({ filter: /hyop\/?.*$/ }, async ({ path })=>{
          const source = await readFile(path).then(buf=>'' + buf)
          return {
            contents: preprocess(
              source,
              { DEBUG: '1' },
              { type: 'js' })
          }
        })
      }
    }
  }
}
```

[//]: @formatter:on

## How does hyop compare with other Hypermedia libraries such as HTMX?

Hyop supports the programmer to create hypermedia operations as javascript functions. It simply maps the hyop attribute with the hyop function. The programmer is responsible for defining & implementing the hyop...having full access to the [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API). Small builds with minimal bloat are possible. Starting at `61 B` with `single_hyop`, you only need to bundle the code that you actually use.

Other hypermedia libraries are impressive, but they ultimately have to support a full api. Some of these libraries have taken steps to support tree-shaking...but there is a minimal core to support the hypermedia api. These core libraries add > 1 kb of browser bundle. HTMX adds > 13 kb. These hypermedia apis support a subset of Javascript + the Web APIs.

Hyop gives the programmer full access to Javascript & the Web APIs while providing an abstraction to bind server side rendered HTML with the hydrated hypermedia operation (hyop) at a much smaller size (~200x).

## How does hyop fit into a reactive stack?

Hyop can be used with reactive libraries such as [rmemo (reactive memo)](https://github.com/ctx-core/rmemo) & [relementjs (html builder)](https://github.com/relementjs/relementjs). rmemo by itself adds ~372 B to ~589 B<sup><a href="#note-on-app-payload-size-vs-standalone-library-payload-size">[1]</a></sup> to payload. hyop + relementjs + rmemo adds ~818 B<sup><a href="#note-on-app-payload-size-vs-standalone-library-payload-size">[1]</a></sup> to the payload.

## What about Locality of Behavior?

Carson Gross, creator of [HTMX](https://github.com/bigskysoftware/htmx), points out that [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/) influences a more maintainable codebase. LoB should be considered as a valid trade-off with [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) & [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Hyop does have 1 level of indirection compared to a powerful (& larger) Hypermedia library such as HTMX. What is the impact & can we mitigate the loss of LoB?

It turns out that the LoB can be mitigated while keeping Separation of Concerns. If you use an editor that supports multiple panes, you can load the hyop function in one pane beside the server render logic. In addition, JSDOC provides `@see`, which can be used to link the hyop attribute to the hyop function.

In this [relementjs](https://github.com/relementjs/relementjs) example:

[//]: @formatter:off
```ts
import { div_ } from 'relementjs/html'
export function my_content_() {
  return (
    div_({
      /** @see {import('my-browser-code/my_content').my_content__hyop} */
      hyop: 'my_content__hyop'
    })
  )
}
```

```ts
export function my_content__hyop(my_content:HTMLDivElement) {
  // Do some DOM manipulation on my_content
}
```
[//]: @formatter:on

Modern code editors will allow the programmer to jump to the `my_content__hyop` link. `my_content__hyop` can then be moved into another pane with a keyboard shortcut. Yes, there is an extra step with a hotkey dance, but most developers can do this in < 1s...< 200ms if the hotkey is in muscle memory.

## Name Convention

I use the [tag vector name system](https://briantakita.me/posts/tag-vector-0-introduction), a variant of snake_case, for my development. Understanding that the majority of javascript developers use camelCase, I aliased all functions & types as camelCase.

## Note on App Payload Size vs Standalone Library Payload Size

<p id="#app_payload">
The standalone library minify + brotli payload size is measured only with the library's code. When built inside an app, brotli (or gzip) will use existing artifacts to further compress the library...meaning the library will add less to the app payload than it's standalone size.
</p>
