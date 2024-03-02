# hyop

Hypermedia Operation or Hydration Operation. Tiny library (starting at 61 B) to hydrate operations in the hyop attribute. Remove bloat from hydration & JS payloads. Use standalone or with other Hypermedia libraries like HTMX...Hydration as Hypermedia.

hyop supports usage in a build environment or in a `<script>` tag as an ESM. For smaller JS payloads, use a build environment.

Custom hyop functions hydrate server rendered html & isomorphic components. Release general purpose hyop functions as npm packages. General purpose hyops support a foundation for minimal-bloat tree-shakable Hypermedia libraries.

| use case          | size  | imports                                    |
|-------------------|:-----:|--------------------------------------------|
| hyop              | 61 B  | `import { hyop } from 'hyop'`              |
| multi_hyop        | 81 B  | `import { multi_hyop } from 'hyop'`        |
| verify_hyop       | 148 B | `import { verify_hyop } from 'hyop'`       |
| verify_multi_hyop | 165 B | `import { verify_multi_hyop } from 'hyop'` |

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
import { hyop } from 'hyop'
window.addEventListener('load', ()=>{
  hyop(document, {
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
      import { hyop } from 'https://esm.run/hyop/hyop'
      window.addEventListener('load', ()=>{
        hyop(document, {
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

Using `multi_hyop`  instead of `hyop` allows calling many hyops in a hyop attribute. The standalone size is `81 B` instead of `61 B`. For the extra bytes, you gain the ability to compose hyops.

## Development & Debugging

By themselves, `hyop` & `multi_hyop` have a minimal payload size impact. If a hyop is missing, a non-obvious error will occur. Unused hyops will be dead code bloat.

`verify_hyop` & `verify_multi_hyop` throw a friendly error message for missing hyops. These functions warn about unused hyops. This facilitates debugging & removing dead code bloat.

When building the javascript payload. You can use `@ctx-core/preprocess` with the `DEBUG` env. This preprocesses `hyop` to run `verify_hyop` & `multi_hyop` run `verify_multi_hyop`. Useful for development enivornments.

## @ctx-core/preprosess with DEBUG env as an esbuild plugin

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
              { type: 'js' }),
            loader: 'ts'
          }
        })
      }
    }
  }
}
```

[//]: @formatter:on

## How does hyop compare with other Hypermedia libraries such as HTMX?

Hyop supports the programmer to create hypermedia operations as javascript functions. The hyop attribute maps to the hyop function. The programmer defines & implements the hyop. With full access to the [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API). Small builds with minimal bloat are possible. Starting at `61 B` with `hyop`, you only need to bundle the code that you actually use.

Other hypermedia libraries are impressive. Yet they have to support a full api. Some of these libraries have taken steps to support tree-shaking. Yet even with treeshaking, a minimal core has to support the hypermedia api. These core libraries add > 1 kb of browser bundle. HTMX adds > 13 kb. These hypermedia apis support a subset of Javascript + the Web APIs.

Hyop gives the programmer full access to Javascript & the Web APIs. And binds SSR HTML with the hydrated hypermedia operation (hyop) at a much smaller size (~200x).

## How does hyop fit into a reactive stack?

Hyop is useful with reactive libraries. Including [rmemo (reactive memo)](https://github.com/ctx-core/rmemo) & [relementjs (html builder)](https://github.com/relementjs/relementjs). rmemo by itself adds ~372 B to ~589 B<sup><a href="#note-on-app-payload-size-vs-standalone-library-payload-size">[1]</a></sup> to payload. hyop + relementjs + rmemo adds ~818 B<sup><a href="#note-on-app-payload-size-vs-standalone-library-payload-size">[1]</a></sup> to the payload.

## What about Locality of Behavior?

Carson Gross, creator of [HTMX](https://github.com/bigskysoftware/htmx), points out that [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/) makes a codebase more maintainable. LoB is a valid trade-off with [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) & [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Hyop has 1 level of indirection. To the hyop implementation function. Compared to embedding the hypermedia steps in HTMX. What is the impact & can we mitigate the loss of LoB?

It turns out that keeping LoB with Separation of Concerns is possible! A multi-pane editor can load the hyop function a separate pane beside the server render logic. JSDOC's `@see`, can link the SSR hyop attribute to the hyop browser function.

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

Modern code editors will allow the programmer to jump to the `my_content__hyop` link. A keyboard shortcut moves `my_content__hyop` into another pane. There is an extra step with the hotkey. Yet most developers can do this in < 1s...< 200ms if the hotkey is in muscle memory.

## Pro Tip

Create a hyop for each dynamic element in the browser. One hyop assigns an HTMLElement to a variable for another HTMLElement's hyop to use.

[//]: @formatter:off
```ts
let text_content:HTMLElement
export function text_content__hyop(_text_content:HTMLElement) {
  text_content = _text_content
}
export function input__hyop(input:HTMLInputElement) {
  input.addEventListener('input', evt=>
    text_content.innerText = evt.target.value)
}
```
[//]: @formatter:on

A module dedicated to hyop exports allows `import * as some_hyops`. Allowing passing all the hyop exports to the hyop function.

index.browser.ts
```ts
import { hyop } from 'hyop'
import * as some_hyops from './some_hyops'
window.addEventListener('load', ()=>{
  hyop(document, {
    ...some_hyops
  })
})
```

## Real World Examples

Hyop assigns behavior to complex browser side interactions from a MPA. I'll show a couple of examples pages with code from a recent project. Both examples are from the same project. These examples use following tech:

- [rmemo](https://github.com/ctx-core/rmemo)
- [relementjs](https://github.com/relementjs/relementjs)
- [ctx-core/be](https://github.com/ctx-core/be)
- [YT Player](https://developers.google.com/youtube/iframe_api_reference)
- [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

The project uses the following tech for it's build:

- [rappstack](https://github.com/rappstack)
- [drizzle orm](https://github.com/drizzle-team/drizzle-orm/)
- [relysjs](https://github.com/relysjs/relysjs) which extends [rebuildjs](https://github.com/rebuildjs/rebuildjs)

Point being, hyop can fit in a custom stack or within a more established framework stack.

### YouTube Video Player, minor web animations

https://brookebrodack.net/content

This page shows videos from Brooke Brodack's YouTube channel. The embebbed YouTube video player with the play/pause video state being in sync with the feed link.

- [server render logic](https://github.com/btakita/ui--server--brookebrodack/blob/main/content/content__doc_html.ts)
- [browser logic](https://github.com/btakita/ui--browser--brookebrodack/blob/main/content/content__hyop.ts)

### Timeline with Animations, YouTube Video Player + Internet Archive Video Player

https://brookebrodack.net/brookers

This page is a partial timeline of the deleted Brookers YouTube channel. It integrates some web animations, YouTube player, & the Internet Archive video player.

- [server render logic](https://github.com/btakita/ui--server--brookebrodack/blob/main/brookers/brookers__doc_html.ts)
- [browser logic](https://github.com/btakita/ui--browser--brookebrodack/blob/main/brookers/brookers__hyop.ts)

## Name Convention

I use the [tag vector name system](https://briantakita.me/posts/tag-vector-0-introduction), a variant of snake_case, for my development. The majority of javascript developers use camelCase. So I aliased all functions & types as camelCase.

## Note on App Payload Size vs Standalone Library Payload Size

<p id="#app_payload">
Measuring the standalone library minify + brotli payload size. Building this library inside an app causes brotli (or gzip) to use existing artifacts. Compressing the library even more. Meaning the library will add less to the app payload than it's standalone size.
</p>
