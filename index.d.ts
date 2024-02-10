export * from './multi_hyop/index.js'
export * from './verify_multi_hyop/index.js'
export * from './single_hyop/index.js'
export * from './verify_single_hyop/index.js'
export type hyop_fn_T<E> = E extends unknown ? (el:E)=>unknown : never
