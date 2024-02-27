// @formatter:off
/* @if DEBUG **
import { verify_hyop } from '../verify_hyop/index.js'
/* @endif */
// @formatter:on
/**
 * Hydrate Elements with the hyop attribute using the associated value function.
 * Using @ctx-core/preprocess with the DEBUG env will call verify_hyop.
 * @param {Element}doc
 * @param {Record<string, (el:Node)=>unknown}op_R_fn
 */
export function hyop(doc, op_R_fn) {
	// @formatter:off
	/* @if DEBUG **
	verify_hyop(doc, op_R_fn)
	/* @endif */
	/* @if !DEBUG */
	for (let el of doc.querySelectorAll('[hyop]')) {
		doc = el.getAttribute('hyop')
		op_R_fn[doc](el)
	}
	/* @endif */
	// @formatter:on
}
export {
	hyop as single_hyop,
	hyop as singleHyop,
}
