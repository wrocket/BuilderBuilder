QUnit.test("DataTypes - int - initializer", function(assert) {
	var t = DataTypes.getType('int');
	var genParams = {};

	var result = t.initializer(genParams, 'myInt', 'someValue');

	assert.equal(result, 'this.myInt = someValue;');
});

QUnit.test("DataTypes - int - testValue", function(assert) {
	var t = DataTypes.getType('int');

	var result = t.makeTestValue(3);

	assert.equal(result, '3');
});

QUnit.test("DataTypes - int - makeEqualityTest", function(assert) {
	var t = DataTypes.getType('int');

	var result = t.makeEqualityTest(3, 4);

	assert.equal(result, 'Assert.assertEquals(3, 4)');
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

	var result = t.makeTestValue(3);

	assert.equal(result, '"string3"');
});

QUnit.test("DataTypes - String - makeEqualityTest", function(assert) {
	var t = DataTypes.getType('String');

	var result = t.makeEqualityTest('"3"', '"4"');

	assert.equal(result, 'Assert.assertEquals("3", "4")');
});

QUnit.test("DataTypes - String - properties", function(assert) {
	var t = DataTypes.getType('String');

	assert.equal(t.isCollection, false);
	assert.equal(t.classImports.length, 0);
	assert.equal(t.testImports.length, 0);
});

