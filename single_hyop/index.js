// @formatter:off
/* @if DEBUG **
import { verify_single_hyop } from '../verify_single_hyop/index.js'
/* @endif */
// @formatter:on
/**
 * Hydrate Elements with the hyop attribute using the associated value function.
 * Using @ctx-core/preprocess with the DEBUG env will call verify_single_hyop.
 * @param {Element}doc
 * @param {Record<string, (el:Node)=>unknown}op_R_fn
 */
export function single_hyop(doc, op_R_fn) {
	// @formatter:off
	/* @if DEBUG **
	verify_single_hyop(doc, op_R_fn)
	/* @endif */
	/* @if !DEBUG */
	for (let el of doc.querySelectorAll('[hyop]')) {
		doc = el.getAttribute('hyop')
		op_R_fn[doc](el)
	}
	/* @endif */
	// @formatter:on
}
export { single_hyop as singleHyop }
