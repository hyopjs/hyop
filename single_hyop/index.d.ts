import type { hyop_fn_T } from '../index.js'
export declare function single_hyop(
	doc:{ querySelectorAll(selectors:string):NodeList },
	op_R_fn:Record<string, hyop_fn_T<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]|SVGElementTagNameMap[keyof SVGElementTagNameMap]|MathMLElementTagNameMap[keyof MathMLElementTagNameMap]>>
):void
