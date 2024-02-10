import { JSDOM } from 'jsdom'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { multi_hyop, single_hyop, verify_multi_hyop, verify_single_hyop } from './index.js'
test('single_hyop', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const fn0 = (el:Element)=>el_a.push(['fn0', el])
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'fn0')
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div1 = document.createElement('div')
	div1.setAttribute('hyop', 'fn1')
	document.body.appendChild(div0)
	document.body.appendChild(div1)
	single_hyop(document, { fn0, fn1 })
	equal(el_a, [['fn0', div0], ['fn1', div1]])
})
test('verify_single_hyop', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const fn0 = (el:Element)=>el_a.push(['fn0', el])
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'fn0')
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div1 = document.createElement('div')
	div1.setAttribute('hyop', 'fn1')
	document.body.appendChild(div0)
	document.body.appendChild(div1)
	verify_single_hyop(document, { fn0, fn1 })
	equal(el_a, [['fn0', div0], ['fn1', div1]])
})
test('single_hyop|error', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'no-fn')
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div1 = document.createElement('div')
	div1.setAttribute('hyop', 'fn1')
	document.body.appendChild(div0)
	document.body.appendChild(div1)
	throws(()=>single_hyop(document, { fn1 }))
})
test('verify_single_hyop|error', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'no-fn')
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div1 = document.createElement('div')
	div1.setAttribute('hyop', 'fn1')
	document.body.appendChild(div0)
	document.body.appendChild(div1)
	throws(()=>verify_single_hyop(document, { fn1 }), 'missing hyop: no-fn')
	throws(()=>verify_single_hyop(document, {
		'no-fn': ()=>{},
		fn1,
		fn2: ()=>{}
	}), 'unused hyop: fn2')
})
test('multi_hyop', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const fn0 = (el:Element)=>el_a.push(['fn0', el])
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'fn0 fn1')
	document.body.appendChild(div0)
	multi_hyop(document, { fn0, fn1 })
	equal(el_a, [['fn0', div0], ['fn1', div0]])
})
test('verify_multi_hyop', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const fn0 = (el:Element)=>el_a.push(['fn0', el])
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'fn0 fn1')
	document.body.appendChild(div0)
	verify_multi_hyop(document, { fn0, fn1 })
	equal(el_a, [['fn0', div0], ['fn1', div0]])
})
test('multi_hyop|error', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'no-fn fn1')
	document.body.appendChild(div0)
	throws(()=>multi_hyop(document, { fn1 }))
})
test('verify_multi_hyop|error', ()=>{
	const jsdom = new JSDOM()
	const document = jsdom.window.document
	const el_a:[string, Element][] = []
	const fn1 = (el:Element)=>el_a.push(['fn1', el])
	const div0 = document.createElement('div')
	div0.setAttribute('hyop', 'no-fn fn1')
	document.body.appendChild(div0)
	throws(()=>verify_multi_hyop(document, { fn1 }), 'missing hyop: no-fn')
	throws(()=>verify_multi_hyop(document, {
		'no-fn': ()=>{},
		fn1,
		fn2: ()=>{}
	}), 'unused hyop: fn2')
})
test.run()
