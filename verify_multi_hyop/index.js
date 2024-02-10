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
		for (let op of doc.split(/\s+/)) {
			if (!op_R_fn[op]) throw Error('missing hyop: ' + op)
			op_R_fn[op](el)
			op_S.delete(op)
		}
	}
	if (op_S.size) throw Error('unused hyop: ' + [...op_S.keys()])
}
