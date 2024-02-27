import { hyop_fn_T } from '../index.js'
export declare function verify_hyop(
	doc:{ querySelectorAll(selectors:string):NodeList },
	op_R_fn:Record<string, hyop_fn_T<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]|SVGElementTagNameMap[keyof SVGElementTagNameMap]|MathMLElementTagNameMap[keyof MathMLElementTagNameMap]>>
):void
export {
	verify_hyop as verifyHyop,
	verify_hyop as verify_single_hyop,
	verify_hyop as verifySingleHyop,
}
