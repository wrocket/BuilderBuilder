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

QUnit.test("Util.makeGenerics - single item", function( assert ) {
	assert.equal("&lt;foobar&gt;", Util.makeGenerics(['foobar']));
});

QUnit.test("Util.makeGenerics - multi item", function( assert ) {
	assert.equal("&lt;foo, bar&gt;", Util.makeGenerics(['foo', 'bar']));
});

QUnit.test("Util.makeGenerics - empty list", function( assert ) {
	assert.equal("", Util.makeGenerics([]));
});

QUnit.test("Util.makeGenerics - undefined", function( assert ) {
	assert.equal("", Util.makeGenerics(undefined));
});

QUnit.test("Util.capitalizeFirst - undefined", function( assert ) {
	assert.equal(undefined, Util.capitalizeFirst(undefined));
});

QUnit.test("Util.capitalizeFirst - empty", function( assert ) {
	assert.equal("", Util.capitalizeFirst(""));
});

QUnit.test("Util.capitalizeFirst - happy", function( assert ) {
	assert.equal("Foo", Util.capitalizeFirst("foo"));
});

QUnit.test("Util.capitalizeFirst - alreadyUpper", function( assert ) {
	assert.equal("Foo", Util.capitalizeFirst("Foo"));
});

QUnit.test("Util.decapitalizeFirst - undefined", function( assert ) {
	assert.equal(undefined, Util.decapitalizeFirst(undefined));
});

QUnit.test("Util.decapitalizeFirst - empty", function( assert ) {
	assert.equal("", Util.decapitalizeFirst(""));
});

QUnit.test("Util.decapitalizeFirst - happy", function( assert ) {
	assert.equal("foo", Util.decapitalizeFirst("Foo"));
});

QUnit.test("Util.decapitalizeFirst - alreadyLower", function( assert ) {
	assert.equal("foo", Util.decapitalizeFirst("foo"));
});
