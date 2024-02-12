# hyop

Hypertext Operation. Tiny library (starting at 61 B) to hydrate operations in the hyop attribute. Remove bloat from hydration & JS payloads. Use standalone or with other Hypertext libraries like HTMX...Hydration as Hypertext

This library can be used in a build environment or imported as an ESM in a `<script>` tag. For smaller JS payloads, use a build environment.

Custom hyop functions can be used to hydrate server rendered html & isomorphic components. General purpose hyop functions can be released as npm packages. General purpose hyops will support a foundation for minimal-bloat tree-shakable Hypermedia libraries.

| use case           | size  | imports                                   |
|--------------------|:-----:|-------------------------------------------|
| single_hyop        | 61 B  | import { single_hyop } from 'hyop'        |
| multi_hyop         | 81 B  | import { multi_hyop } from 'hyop'         |
| verify_single_hyop | 146 B | import { verify_single_hyop } from 'hyop' |
| verify_multi_hyop  | 160 B | import { verify_multi_hyop } from 'hyop'  |

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
import {
  single_hyop
} from 'hyop/single_hyop'
window.addEventListener('load', ()=>{
  single_hyop(document, {
    input__hyop: input=>{
      const content = document.querySelector('#content')
      input.addEventListener('input', evt=>content.innerText = evt.target.value ?? '')
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
            input.addEventListener('input', evt=>content.innerText = evt.target.value ?? '')
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

## Name Convention

I use the [tag vector name system](https://briantakita.me/posts/tag-vector-0-introduction), a variant of snake_case, for my development. Understanding that the majority of javascript developers use camelCase, I aliased all functions & types as camelCase.

| tag_vector_name    | camelCaseName    | camelCaseImport                         |
|--------------------|------------------|-----------------------------------------|
| single_hyop        | singleHyop       | import { singleHyop } from 'hyop'       |
| multi_hyop         | multiHyop        | import { multiHyop } from 'hyop'        |
| verify_single_hyop | verifySingleHyop | import { verifySingleHyop } from 'hyop' |
| verify_multi_hyop  | verifyMultiHyop  | import { verifyMultiHyop } from 'hyop'  |
| hyop_fn_T          | HyopFn           | import { type HyopFn } from 'hyop'      |
