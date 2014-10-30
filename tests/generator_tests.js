/*
Copyright 2014 Brian Wray (brian@wrocket.org)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

QUnit.test("Generator - gatherImports - happy", function(assert) {
	var input = ['java.lang', 'aaa.bbb', 'java.util', 'java.util', 'foo.bar.baz'];

	var result = gatherImports(input);

	assert.equal(result.length, 4);
	assert.equal('aaa.bbb', result[0]);
	assert.equal('foo.bar.baz', result[1]);
	assert.equal('java.lang', result[2]);
	assert.equal('java.util', result[3]);
});

QUnit.test("Generator - gatherImports - empty", function(assert) {
	var result = gatherImports([]);

	assert.equal(result.length, 0);
});


QUnit.test("Generator - gatherImports - undef", function(assert) {
	var result = gatherImports(undefined);

	assert.equal(result.length, 0);
});

QUnit.test("Generator - generateClassFileImports - happy", function(assert) {
	var classDef = {
		'members': [{
			'type': 'DateTime'
		}, {
			'type': 'List'
		}, {
			'type': 'List'
		}]
	};

	var result = generateClassFileImports(classDef);

	assert.equal('java.util.ArrayList', result[0]);
	assert.equal('java.util.Collections', result[1]);
	assert.equal('java.util.List', result[2]);
	assert.equal('org.joda.time.DateTime', result[3]);

	assert.equal(4, result.length);
});