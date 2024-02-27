import { preprocess } from '@ctx-core/preprocess'
import { tempfile_path_ } from 'ctx-core/tempfile'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'
import { readFile, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { multi_hyop, hyop, verify_multi_hyop, verify_hyop } from './index.js'
test('hyop', ()=>{
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
	hyop(document, { fn0, fn1 })
	equal(el_a, [['fn0', div0], ['fn1', div1]])
})
test('hyop|DEBUG=1', async ()=>{
	const dir = dirname(new URL(import.meta.url).pathname)
	const tempfile = await tempfile_path_(tmpdir(), 'js')
	try {
		await build({
			entryPoints: [join(dir, 'hyop/index.js')],
			outfile: tempfile,
			format: 'esm',
			bundle: true,
			plugins: [{
				name: 'preprocess',
				setup(build) {
					build.onLoad({ filter: /.*\.js$/ }, async ({ path })=>{
						const source = await readFile(path, 'utf8')
						return {
							contents: preprocess(
								source,
								{ DEBUG: '1' },
								{ type: 'js' })
						}
					})
				}
			}
			]
		})
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
		const { hyop } = await import(tempfile)
		hyop(document, { fn0, fn1 })
		equal(el_a, [['fn0', div0], ['fn1', div1]])
		throws(()=>hyop(document, {
			'no-div': ()=>0
		}), 'missing hyop: no-fn')
		equal(el_a, [['fn0', div0], ['fn1', div1]])
	} finally {
		await unlink(tempfile)
	}
})
test('verify_hyop', ()=>{
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
	verify_hyop(document, { fn0, fn1 })
	equal(el_a, [['fn0', div0], ['fn1', div1]])
})
test('hyop|error', ()=>{
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
	throws(()=>hyop(document, { fn1 }))
})
test('verify_hyop|error', ()=>{
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
	throws(()=>verify_hyop(document, { fn1 }), 'missing hyop: no-fn')
	const warn = console.warn
	try {
		const warn_arg_aa:string[][] = []
		console.warn = (...arg_a)=>warn_arg_aa.push(arg_a)
		verify_hyop(document, {
			'no-fn': ()=>0, fn1, fn2: ()=>0
		})
		equal(warn_arg_aa, [['unused hyop: fn2']])
	} finally {
		console.warn = warn
	}
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
test('multi_hyop|DEBUG=1', async ()=>{
	const dir = dirname(new URL(import.meta.url).pathname)
	const tempfile = await tempfile_path_(tmpdir(), 'js')
	try {
		await build({
			entryPoints: [join(dir, 'multi_hyop/index.js')],
			outfile: tempfile,
			format: 'esm',
			bundle: true,
			plugins: [{
				name: 'preprocess',
				setup(build) {
					build.onLoad({ filter: /.*\.js$/ }, async ({ path })=>{
						const source = await readFile(path, 'utf8')
						return {
							contents: preprocess(
								source,
								{ DEBUG: '1' },
								{ type: 'js' })
						}
					})
				}
			}
			]
		})
		const jsdom = new JSDOM()
		const document = jsdom.window.document
		const el_a:[string, Element][] = []
		const fn0 = (el:Element)=>el_a.push(['fn0', el])
		const fn1 = (el:Element)=>el_a.push(['fn1', el])
		const div0 = document.createElement('div')
		div0.setAttribute('hyop', 'fn0 fn1')
		document.body.appendChild(div0)
		const { multi_hyop } = await import(tempfile)
		multi_hyop(document, { fn0, fn1 })
		equal(el_a, [['fn0', div0], ['fn1', div0]])
		throws(()=>multi_hyop(document, {
			'no-div': ()=>0
		}), 'missing hyop: no-fn')
		equal(el_a, [['fn0', div0], ['fn1', div0]])
	} finally {
		await unlink(tempfile)
	}
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
	const warn = console.warn
	try {
		const warn_arg_aa:string[][] = []
		console.warn = (...arg_a)=>warn_arg_aa.push(arg_a)
		verify_multi_hyop(document, {
			'no-fn': ()=>0, fn1, fn2: ()=>0
		})
		equal(warn_arg_aa, [['unused hyop: fn2']])
	} finally {
		console.warn = warn
	}
})
test.run()
