/**
 * Hydrate multiple Hypermedia Operations from elements with the hyop attribute with the associated
 * value function.
 * Throws an error if there are missing or unused hyop keys. Primarily for development & debugging.
 * @param {Element}doc
 * @param {Record<string, (el:Node)=>unknown}op_R_fn
 */
export function verify_multi_hyop(doc, op_R_fn) {
	let op_S = new Set
	for (let key in op_R_fn) {
		op_S.add(key)
	}
	for (let el of doc.querySelectorAll('[hyop]')) {
		doc = el.getAttribute('hyop')
		for (let hyop of doc.split(/\s+/)) {
			if (!op_R_fn[hyop]) throw Error('missing hyop', { hyop })
			op_R_fn[hyop](el)
			op_S.delete(hyop)
		}
	}
	if (op_S.size) console.warn('unused hyop: ' + [...op_S.keys()])
}
export { verify_multi_hyop as verifyMultiHyop }
