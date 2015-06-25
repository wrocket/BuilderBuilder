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

// Generates the file name for the main class file.
function generateClassFileName(classDef) {
    return classDef.classNameUpper + '.java';
}

// Generates the file name for the unit test file.
function generateTestClassFileName(classDef) {
    return classDef.classNameUpper + 'Tests.java';
}

// Returns the class name for a class definition.
function generateClassName(classDef) {
    return classDef.classNameUpper;
}

// Returns the test class name for a class definition.
function generateTestClassName(classDef) {
    return classDef.classNameUpper + 'Tests';
}

// Dedupe and sort a list of import statements.
function gatherImports(imports) {
    if (!imports) {
        return []
    }

    var dedupe = {};
    for (var i = 0; i < imports.length; i++) {
        dedupe[imports[i]] = true;
    }

    var result = [];
    for (var i in dedupe) {
        result.push(i);
    }

    return Util.sortPackages(result);
}

// Given a class definition, generate a list of imports required for the main class file.
function generateClassFileImports(classDef, initialImports) {
    var imports = initialImports || [];
    var members = classDef.members;
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        var type = DataTypes.getType(member.type);
        for (var j = 0; j < type.classImports.length; j++) {
            imports.push(type.classImports[j]);
        }
    }

    return gatherImports(imports);
}

// Given a class definition, generate a list of imports required for the test class file.
function generateTestFileImports(classDef) {
    var imports = [];
    imports.push('org.junit.Assert');
    imports.push('org.junit.Test');
    var members = classDef.members;
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        var type = DataTypes.getType(member.type);
        for (var j = 0; j < type.testImports.length; j++) {
            imports.push(type.testImports[j]);
        }
    }

    return gatherImports(imports);
}

// Generates the type for a class member, including generic arguments (e.g. "String", "List<Integer>", etc)
function generateType(member) {
    var code = [];
    code.push(member.type);

    if (member.generics) {
        code.push(Util.makeGenerics(member.generics))
    }

    return code.join('');
}

// Generates the declaration for a private member with an optional final modifier (e.g. "private final List<String> myList;")
function generatePrivateMember(member, isFinal) {
    var code = [];
    code.push('private ');

    if (isFinal) {
        code.push('final ');
    }

    code.push(generateType(member));

    code.push(' ');
    code.push(member.lcName);
    code.push(';');

    return code.join('');
}

// Generates the inner Builder class for the main class file.
function generateBuilderClass(classDef) {
    var j = [];

    j.push('public static class Builder {');

    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        j.push(Util.tab(1) + generatePrivateMember(member, false));
    }

    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        j.push(Util.tab(1) + 'public Builder with' + member.ucName + '(' + generateType(member) + ' ' + member.lcName + ') {');
        j.push(Util.tab(2) + 'this.' + member.lcName + ' = ' + member.lcName + ';');
        j.push(Util.tab(2) + 'return this;');
        j.push(Util.tab(1) + '}');
    }

    j.push(Util.tab(1) + 'public ' + classDef.className + ' build() {');
    j.push(Util.tab(2) + 'return new ' + classDef.className + '(this);');
    j.push(Util.tab(1) + '}');

    j.push(Util.tab(1) + 'public Builder from(' + classDef.className + ' obj) {');
    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        j.push(Util.tab(2) + 'this.' + member.lcName + ' = obj.get' + member.ucName + '();');
    }
    j.push(Util.tab(2) + 'return this;');
    j.push(Util.tab(1) + '}');

    j.push('}');

    return j;
}

// Generates the class file for the main class.
function generateClassFile(classDef, parms) {
    var j = [];

    j.push('<h2>' + generateClassFileName(classDef) + '</h2>');

    var imports = generateClassFileImports(classDef);

    var importCode = Util.map(imports, function(i) {
        return 'import ' + i + ';';
    });

    Util.extend(j, importCode);

    j.push('public class ' + generateClassName(classDef) + ' {');

    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        j.push(Util.tab(1) + generatePrivateMember(member, true));
    }

    var builderClass = generateBuilderClass(classDef);

    Util.extend(j, builderClass, 1);

    j.push(Util.tab(1) + 'private ' + classDef.className + '(Builder b) {');
    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        j.push(Util.tab(2) + DataTypes.getType(member.type).initializer(parms, member.name, 'b.' + member.lcName, member.generics));
    }
    j.push(Util.tab(1) + '}');

    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        j.push(Util.tab(1) + 'public ' + generateType(member) + ' get' + member.ucName + '() {');
        j.push(Util.tab(2) + 'return ' + member.lcName + ';');
        j.push(Util.tab(1) + '}');
    }

    j.push('}');

    return j.join('<br/>');
};

// Determines if a string is completely upper-case or not.
function isUpper(c) {
    return c.toUpperCase() == c;
}

// Picks the name for a test constant corresponding for a particular member.
// e.g. the "MY_INT" in "private static final int MY_INT = 42;"
function getTestConstantName(member) {
    var result = [];
    var name = member.lcName;
    var prev;
    for (var i = 0; i < name.length; i++) {
        var c = name.charAt(i);

        if (i > 0 && isUpper(c) && !isUpper(prev)) {
            result.push('_');
        }

        result.push(c.toUpperCase());
        prev = c;
    }

    return result.join('');
};

// Generates a series of 'withFoo' statements to build and instance of a class.
// e.g. MyClass x = new MyClass.Builder().withSomeMember(SOME_MEMBER).build();
function buildWithStatements(classDef, varName) {
    var builderStmt = [];

    builderStmt.push(classDef.className + ' ' + varName + ' = new ' + classDef.className + '.Builder()');

    for (var i = 0; i < classDef.members.length; i++) {
        var m = classDef.members[i];
        builderStmt.push('.with' + m.ucName + '(');
        builderStmt.push(getTestConstantName(m));
        builderStmt.push(')');
    }

    builderStmt.push('.build();');
    return builderStmt.join('');
};

// Generates a test method that tests the basic functionality of building an object.
function generateSimpleBuilderTest(classDef, parms) {
    var j = [];

    j.push(Util.tab(1) + '@Test');
    j.push(Util.tab(1) + 'public void basicBuilderTest() {');

    j.push(Util.tab(2) + buildWithStatements(classDef, 'x'));

    for (var i = 0; i < classDef.members.length; i++) {
        var m = classDef.members[i];
        var type = DataTypes.getType(m.type);
        j.push(Util.tab(2) + type.makeEqualityTest(parms, getTestConstantName(m), 'x.get' + m.ucName + '()') + ';');
    }

    j.push(Util.tab(1) + '}');

    return j;
};

// Generates a test method that tests with from() copy method on the build.
function generateFromValuesTest(classDef, parms) {
    var j = [];

    j.push(Util.tab(1) + '@Test');
    j.push(Util.tab(1) + 'public void fromTest() {');

    j.push(Util.tab(2) + buildWithStatements(classDef, 'x'));

    j.push(Util.tab(2) + classDef.className + ' y = new ' + classDef.className + '.Builder().from(x).build();');

    for (var i = 0; i < classDef.members.length; i++) {
        var m = classDef.members[i];
        var type = DataTypes.getType(m.type);
        j.push(Util.tab(2) + type.makeEqualityTest(parms, 'x.get' + m.ucName + '()', 'y.get' + m.ucName + '()') + ';');
    }

    j.push(Util.tab(1) + '}');

    return j;
};

// Generates a method that checks equivalency of two Collection<T> objects.
function generateCollectionEqualsMethod(parms) {
    var j = [];

    j.push(Util.tab(1) + 'private &lt;T&gt; void assertCollectionEquals(Collection&lt;T&gt; expected, Collection&lt;T&gt; actual) {');
    j.push(Util.tab(2) + 'Assert.assertNotSame(expected, actual);')
    j.push(Util.tab(2) + 'Assert.assertEquals(expected == null, actual == null);');
    j.push(Util.tab(2) + 'Assert.assertEquals(expected.size(), actual.size());');
    j.push(Util.tab(2) + 'for (T item : expected) {');
    j.push(Util.tab(3) + 'Assert.assertTrue(actual.contains(item));');
    j.push(Util.tab(2) + '}');
    j.push(Util.tab(1) + '}');

    return j;
}

// Generates a method that checks equivalency of two Map<S, T> objects.
function generateMapEqualsMethod(parms) {
    var j = [];

    j.push(Util.tab(1) + 'private &lt;K, V&gt; void assertMapEquals(Map&lt;K, V&gt; expected, Map&lt;K, V&gt; actual) {');
    j.push(Util.tab(2) + 'Assert.assertNotSame(expected, actual);')
    j.push(Util.tab(2) + 'Assert.assertEquals(expected == null, actual == null);');
    j.push(Util.tab(2) + 'Assert.assertEquals(expected.size(), actual.size());');
    j.push(Util.tab(2) + 'for (K key : expected.keySet()) {');
    j.push(Util.tab(3) + 'Assert.assertTrue(actual.containsKey(key));');
    j.push(Util.tab(3) + 'Assert.assertEquals(expected.get(key), actual.get(key));');
    j.push(Util.tab(2) + '}');
    j.push(Util.tab(1) + '}');

    return j;
}

// Generates the unit test file.
function generateTestFile(classDef, parms) {
    var j = [];

    j.push('<h2>' + generateTestClassFileName(classDef) + '</h2>');

    var imports = generateTestFileImports(classDef);

    var importCode = Util.map(imports, function(i) {
        return 'import ' + i + ';';
    });

    Util.extend(j, importCode);

    j.push('');

    j.push('public class ' + generateTestClassName(classDef) + ' {');

    // Generate test constants.
    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        var typeObj = DataTypes.getType(member.type);
        var constantName = getTestConstantName(member);
        var initialValue = typeObj.makeTestValue(parms, i, member.type, member.generics);

        j.push(Util.tab(1) + 'private static final ' + generateType(member) + ' ' + constantName + ' = ' + initialValue + ';');
    }

    j.push('');

    var simpleBuilderTest = generateSimpleBuilderTest(classDef, parms);
    Util.extend(j, simpleBuilderTest);

    var fromTest = generateFromValuesTest(classDef, parms);
    Util.extend(j, fromTest);

    var needCollectionEqualsMethod = false;
    var needMapEqualsMethod = false;
    for (var i = 0; i < classDef.members.length; i++) {
        var member = classDef.members[i];
        var typeObj = DataTypes.getType(member.type);
        if (typeObj.isCollection) {
            if (member.generics && member.generics.length == 1) {
                needCollectionEqualsMethod = true;
                needNullCollectionsMethod = true;
            } else if (typeObj.isMap) {
                needMapEqualsMethod = true;
            }
        }
    }

    if (needCollectionEqualsMethod) {
        j.push('');
        Util.extend(j, generateCollectionEqualsMethod(parms));
    }

    if (needMapEqualsMethod) {
        j.push('');
        Util.extend(j, generateMapEqualsMethod(parms));
    }

    j.push('}');

    return j.join('<br/>');
}

// Main entry point.
function generateButtonClick() {
    var className = document.getElementById("className").value;

    if (className) {
        className = className.replace(/\W*/g, '');
    }

    if (!className || !className.length) {
        className = 'UnnamedClass';
    }

    var input = document.getElementById("inputText").value;
    var fields = InputParser.parseTextInput(input);

    var input = {
        className: className,
        classNameLower: Util.decapitalizeFirst(className),
        classNameUpper: Util.capitalizeFirst(className),
        members: fields
    }

    var output = document.getElementById("outputCode");

    if (!fields || !fields.length) {
        output.innerHTML = '<p>No fields defined.</p>';
    } else {
        var generationParms = {
            jdk7initializers: true
        };

        var classFile = generateClassFile(input, generationParms);
        var testFile = generateTestFile(input, generationParms);

        output.innerHTML = classFile + '<hr/>' + testFile;
    }

    document.getElementById("outputCode").innerHTML = classFile + testFile;
}
