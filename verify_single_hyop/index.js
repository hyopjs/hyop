/**
 * Hydrate elements with the hyop attribute using the associated value function.
 * Throws an error if there are missing or unused hyop keys. Primarily for development & debugging.
 * @param {Element}doc
 * @param {Record<string, (el:Node)=>unknown}op_R_fn
 */
export function verify_single_hyop(doc, op_R_fn) {
	let op_S = new Set
	for (let key in op_R_fn) {
		op_S.add(key)
	}
	for (let el of doc.querySelectorAll('[hyop]')) {
		doc = el.getAttribute('hyop')
		if (!op_R_fn[doc]) throw Error('missing hyop: ' + doc)
		op_R_fn[doc](el)
		op_S.delete(doc)
	}
	if (op_S.size) throw Error('unused hyop: ' + [...op_S.keys()])
}
export { verify_single_hyop as verifySingleHyop }
