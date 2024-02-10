// @formatter:off
/* @if DEBUG **
import { verify_multi_hyop } from '../verify_multi_hyop/index.js'
/* @endif */
// @formatter:on
/**
 * Hydrate multiple Hypermedia Operations from elements with the hyop attribute with the associated
 * value function.
 * Using @ctx-core/preprocess with the DEBUG env will call verify_multi_hyop.
 * @param {Element}doc
 * @param {Record<string, (el:Node)=>unknown}op_R_fn
 */
export function multi_hyop(doc, op_R_fn) {
	// @formatter:off
	/* @if DEBUG **
	verify_hyops(doc, op_R_fn)
	/* @endif */
	/* @if !DEBUG */
	for (let el of doc.querySelectorAll('[hyop]')) {
		doc = el.getAttribute('hyop')
		for (let op of doc.split(/\s+/)) {
			op_R_fn[op](el)
		}
	}
	/* @endif */
	// @formatter:on
}
