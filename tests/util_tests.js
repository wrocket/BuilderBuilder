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

QUnit.test("Util.makeGenerics - single item", function(assert) {
	assert.equal("&lt;foobar&gt;", Util.makeGenerics(['foobar']));
});

QUnit.test("Util.makeGenerics - multi item", function(assert) {
	assert.equal("&lt;foo, bar&gt;", Util.makeGenerics(['foo', 'bar']));
});

QUnit.test("Util.makeGenerics - empty list", function(assert) {
	assert.equal("", Util.makeGenerics([]));
});

QUnit.test("Util.makeGenerics - undefined", function(assert) {
	assert.equal("", Util.makeGenerics(undefined));
});

QUnit.test("Util.capitalizeFirst - undefined", function(assert) {
	assert.equal(undefined, Util.capitalizeFirst(undefined));
});

QUnit.test("Util.capitalizeFirst - empty", function(assert) {
	assert.equal("", Util.capitalizeFirst(""));
});

QUnit.test("Util.capitalizeFirst - happy", function(assert) {
	assert.equal("Foo", Util.capitalizeFirst("foo"));
});

QUnit.test("Util.capitalizeFirst - alreadyUpper", function(assert) {
	assert.equal("Foo", Util.capitalizeFirst("Foo"));
});

QUnit.test("Util.decapitalizeFirst - undefined", function(assert) {
	assert.equal(undefined, Util.decapitalizeFirst(undefined));
});

QUnit.test("Util.decapitalizeFirst - empty", function(assert) {
	assert.equal("", Util.decapitalizeFirst(""));
});

QUnit.test("Util.decapitalizeFirst - happy", function(assert) {
	assert.equal("foo", Util.decapitalizeFirst("Foo"));
});

QUnit.test("Util.decapitalizeFirst - alreadyLower", function(assert) {
	assert.equal("foo", Util.decapitalizeFirst("foo"));
});

QUnit.test("Util.tabify - zero", function(assert) {
	assert.equal("", Util.tab(0));
});

QUnit.test("Util.tabify - negative", function(assert) {
	assert.equal("", Util.tab(-3));
});

QUnit.test("Util.tabify - one", function(assert) {
	assert.equal("&nbsp;&nbsp;&nbsp;&nbsp;", Util.tab(1));
});

QUnit.test("Util.tabify - three", function(assert) {
	assert.equal("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", Util.tab(3));
});

QUnit.test("Util.extend - happy", function(assert) {
	var base = ['a'];
	var newLines = ['b'];
	Util.extend(base, newLines, 1);
	assert.equal(2, base.length);
	assert.equal('a', base[0]);
	assert.equal('&nbsp;&nbsp;&nbsp;&nbsp;b', base[1]);
});

QUnit.test("Util.extend - noTabLevel", function(assert) {
	var base = ['a'];
	var newLines = ['b'];
	Util.extend(base, newLines, undefined);
	assert.equal(2, base.length);
	assert.equal('a', base[0]);
	assert.equal('b', base[1]);
});

QUnit.test("Util.extend - undefined input", function(assert) {
	var base = ['a'];
	var newLines = undefined;
	Util.extend(base, newLines, 0);
	assert.equal(1, base.length);
	assert.equal('a', base[0]);
});


QUnit.test("Util.map - undefined input", function(assert) {
	var input = undefined;
	var fun = function(n) {
		return n * 2;
	};

	var result = Util.map(input, fun);
	assert.equal(0, result.length);
});

QUnit.test("Util.map - happy", function(assert) {
	var input = [1, 2, 3, 4];
	var fun = function(n) {
		return n * 2;
	};

	var result = Util.map(input, fun);
	assert.equal(4, result.length);
	assert.equal(2, result[0]);
	assert.equal(4, result[1]);
	assert.equal(6, result[2]);
	assert.equal(8, result[3]);
});