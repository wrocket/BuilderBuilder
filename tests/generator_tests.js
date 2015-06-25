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
	assert.equal(result[0], 'aaa.bbb');
	assert.equal(result[1], 'foo.bar.baz');
	assert.equal(result[2], 'java.lang');
	assert.equal(result[3], 'java.util');
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

	assert.equal(result[0], 'java.util.ArrayList');
	assert.equal(result[1], 'java.util.Collections');
	assert.equal(result[2], 'java.util.List');
	assert.equal(result[3], 'org.joda.time.DateTime');

	assert.equal(4, result.length);
});

QUnit.test("Generator - generateTestFileImports - happy - junit", function(assert) {
	var classDef = {
		'members': [{
			'type': 'DateTime'
		}, {
			'type': 'List'
		}, {
			'type': 'List'
		}]
	};

	var result = generateTestFileImports({assertType: 'junit'}, classDef);

	assert.equal(result[0], 'java.util.ArrayList');
	assert.equal(result[1], 'java.util.List');
	assert.equal(result[2], 'org.joda.time.DateTime');
	assert.equal(result[3], 'org.joda.time.DateTimeZone');
	assert.equal(result[4], 'org.junit.Assert');
	assert.equal(result[5], 'org.junit.Test');

	assert.equal(6, result.length);
});

QUnit.test("Generator - generateTestFileImports - happy - fest", function(assert) {
	var classDef = {
		'members': [{
			'type': 'DateTime'
		}, {
			'type': 'List'
		}, {
			'type': 'List'
		}]
	};

	var result = generateTestFileImports({assertType: 'fest'}, classDef);

	assert.equal(result[0], 'java.util.ArrayList');
	assert.equal(result[1], 'java.util.List');
	assert.equal(result[2], 'org.joda.time.DateTime');
	assert.equal(result[3], 'org.joda.time.DateTimeZone');
	assert.equal(result[4], 'org.junit.Test');
	assert.equal(result[5], 'static org.fest.assertions.api.Assertions.*')

	assert.equal(6, result.length);
});