# hyop

## 0.3.7

### Patch Changes

- README: update rmemo & ctx-core/be sizes

## 0.3.6

### Patch Changes

- fix: size-limit

## 0.3.5

### Patch Changes

- verify_hyop,verify_multi_hyop: missing hyop error: fix: hyop in error message

## 0.3.4

### Patch Changes

- verify_hyop,verify_multi_hyop: error message: object with hyop key

## 0.3.3

### Patch Changes

- package.json: author: url,email

## 0.3.2

### Patch Changes

- esbuild: ^0.20.1 -> ^0.20.2

## 0.3.1

### Patch Changes

- size-limit: ^11.0.3 -> ^11.1.0
- @size-limit/preset-small-lib: ^11.0.3 -> ^11.1.0

## 0.3.0

### Minor Changes

- minor:

      + hyop: aliased by single_hyop,singleHyop
      + verify_hyop: aliased by verify_single_hyop,verifySingleHyop
      verify_hyop,verify_multi_hyop: unused hyop: console.warn instead of throw Error: fix: conditionally rendered elements which have a hyop

  size-limit:

      verify_hyop .: + 2 B
      verifySingleHyop .: + 2 B
      verify_hyop ./verify_hyop: + 2 B
      verify_multi_hyop .: + 5 B
      verifyMultiHyop .: + 5 B
      verify_multi_hyop ./verify_multi_hyop: + 5 B

## 0.2.6

### Patch Changes

- esbuild: ^0.20.0 -> ^0.20.1

## 0.2.5

### Patch Changes

- documentation: hypermedia instead of hypertext

  README:

  - How does hyop fit into a reactive stack?
  - How does hyop compare with other Hypermedia libraries such as HTMX?
  - Note on App Payload Size vs Standalone Library Payload Size

  package.json: keywords: + hypermedia

## 0.2.4

### Patch Changes

- multi_hyop: DEBUG=1: fix: implementation

## 0.2.3

### Patch Changes

- package.json: files: fix: include export module directories:

      + multi_hyop
      + single_hyop
      + verify_multi_hyop
      + verify_single_hyop

## 0.2.2

### Patch Changes

- README: code example: format

## 0.2.1

### Patch Changes

- README: code example: formatting

## 0.2.0

### Minor Changes

- minor: camelCase aliases:

      single_hyop: singleHyop
      multi_hyop: multiHyop
      verify_single_hyop: verifySingleHyop
      verify_multi_hyop: verifyMultiHyop
      hyop_fn_T: HyopFn

## 0.1.4

### Patch Changes

- README: example code uses spaces instead of tabs

## 0.1.3

### Patch Changes

- keywords: + htmx,datastar,intercooler,jquery

## 0.1.2

### Patch Changes

- update keywords

## 0.1.1

### Patch Changes

- .gitignore: + coverage

## 0.1.0

### Minor Changes

- minor: initial version

      + single_hyop
      + multi_hyop
      + verify_single_hyop
      + verify_multi_hyop
      + hyop_fn_T
