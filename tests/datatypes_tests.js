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

QUnit.test("DataTypes - int - initializer", function(assert) {
	var t = DataTypes.getType('int');
	var genParams = {};

	var result = t.initializer(genParams, 'myInt', 'someValue');

	assert.equal(result, 'this.myInt = someValue;');
});

QUnit.test("DataTypes - int - testValue", function(assert) {
	var t = DataTypes.getType('int');

	var result = t.makeTestValue({}, 3);

	assert.equal(result, '3');
});

QUnit.test("DataTypes - int - makeEqualityTest - junit", function(assert) {
	var t = DataTypes.getType('int');

	var result = t.makeEqualityTest({assertType: 'junit'}, 3, 4);

	assert.equal(result, 'Assert.assertEquals(3, 4)');
});

QUnit.test("DataTypes - int - makeEqualityTest - fest", function(assert) {
	var t = DataTypes.getType('int');

	var result = t.makeEqualityTest({assertType: 'fest'}, 3, 4);

	assert.equal(result, 'assertThat(4).isEqualTo(3)');
});

QUnit.test("DataTypes - int - properties", function(assert) {
	var t = DataTypes.getType('int');

	assert.equal(t.isCollection, false);
	assert.equal(t.classImports.length, 0);
	assert.equal(t.testImports.length, 0);
});

QUnit.test("DataTypes - String - initializer", function(assert) {
	var t = DataTypes.getType('String');
	var genParams = {};

	var result = t.initializer(genParams, 'myString', 'someValue');

	assert.equal(result, 'this.myString = someValue;');
});

QUnit.test("DataTypes - String - testValue", function(assert) {
	var t = DataTypes.getType('String');

	var result = t.makeTestValue({}, 3);

	assert.equal(result, '"string3"');
});

QUnit.test("DataTypes - String - makeEqualityTest - junit", function(assert) {
	var t = DataTypes.getType('String');

	var result = t.makeEqualityTest({assertType: 'junit'}, '"3"', '"4"');

	assert.equal(result, 'Assert.assertEquals("3", "4")');
});

QUnit.test("DataTypes - String - makeEqualityTest - fest", function(assert) {
	var t = DataTypes.getType('String');

	var result = t.makeEqualityTest({assertType: 'fest'}, '"3"', '"4"');

	assert.equal(result, 'assertThat("4").isEqualTo("3")');
});

QUnit.test("DataTypes - String - properties", function(assert) {
	var t = DataTypes.getType('String');

	assert.equal(t.isCollection, false);
	assert.equal(t.classImports.length, 0);
	assert.equal(t.testImports.length, 0);
});

