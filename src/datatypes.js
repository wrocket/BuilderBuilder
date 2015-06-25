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

var DataTypes = {
    _unknownType: {
        isPrimitive: false,
        isCollection: false,
        classImports: [],
        testImports: ['org.mockito.Mockito'],
        initializer: function(generationParms, memberName, valueName) {
            return 'this.' + memberName + ' = ' + valueName + ';';
        },
        makeTestValue: function(generationParms, n, type, generics) {
            return 'Mockito.mock(' + type + '.class)';
        },
        makeEqualityTest: function(generationParms, expected, actual) {
            return DataTypes._defaultEqualityTest(generationParms, expected, actual);
        }
    },

    _defaultEqualityTest: function(generationParms, expected, actual) {
        if ('junit' === generationParms.assertType) {
            return 'Assert.assertEquals(' + expected + ', ' + actual + ')';
        } else if('fest' === generationParms.assertType) {
            return 'assertThat(' + actual + ').isEqualTo(' + expected + ')';
        } else {
            return '';
        }
    },

    _allTypes: {
        'int': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return n.toString();
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Integer': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'Integer.valueOf(' + n.toString() + ')';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'byte': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return (n % 256).toString();
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Byte': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'Byte.valueOf(' + (n % 256).toString() + ')';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'boolean': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'true'
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Boolean': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'Boolean.TRUE';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'long': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return n.toString() + 'L';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Long': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'Long.valueOf(' + n.toString() + 'L)';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'float': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return n.toString() + '.0f';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Float': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'Float.valueOf(' + n.toString() + '.0f)';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'double': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return n.toString() + '.0d';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Double': {
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'Double.valueOf(' + n.toString() + '.0d)';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'BigDecimal': {
            isCollection: false,
            classImports: ['java.math.BigDecimal'],
            testImports: ['java.math.BigDecimal'],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'new BigDecimal("' + n.toString() + '.0")';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'String': {
            isPrimitive: false,
            isCollection: false,
            classImports: [],
            testImports: [],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return '"string' + n + '"';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'List': {
            isCollection: true,
            classImports: ['java.util.List', 'java.util.ArrayList', 'java.util.Collections'],
            testImports: ['java.util.List', 'java.util.ArrayList'],
            initializer: function(generationParms, memberName, valueName, generics) {
                var genericExp = Util.makeGenerics(generics);
                var newGenerics = generationParms.jdk7initializers ? '&lt;&gt;' : genericExp;
                var emptyCheck = valueName + ' == null || ' + valueName + '.isEmpty()';
                return 'this.' + memberName + ' = ' + emptyCheck + ' ? Collections.' + genericExp + ' emptyList() : Collections.unmodifiableList(new ArrayList' + newGenerics + '(' + valueName + '));';
            },
            makeTestValue: function(generationParms, n, type, generics) {
                return 'Arrays.asList(' + DataTypes.getType(generics[0]).makeTestValue(generationParms, n) + ')';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Set': {
            isCollection: true,
            classImports: ['java.util.Set', 'java.util.HashSet', 'java.util.Collections'],
            testImports: ['java.util.Set', 'java.util.HashSet'],
            initializer: function(generationParms, memberName, valueName, generics) {
                var genericExp = Util.makeGenerics(generics);
                var newGenerics = generationParms.jdk7initializers ? '&lt;&gt;' : genericExp;
                var emptyCheck = valueName + ' == null || ' + valueName + '.isEmpty()';
                return 'this.' + memberName + ' = ' + emptyCheck + ' ? Collections.' + genericExp + ' emptySet() : Collections.unmodifiableSet(new HashSet' + newGenerics + '(' + valueName + '));';
            },
            makeTestValue: function(generationParms, n, type, generics) {
                return 'null /* TODO: Create a constant test value. */';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Collection': {
            isCollection: true,
            classImports: ['java.util.Collection', 'java.util.ArrayList', 'java.util.Collections'],
            testImports: ['java.util.Collection', 'java.util.ArrayList'],
            initializer: function(generationParms, memberName, valueName, generics) {
                var genericExp = Util.makeGenerics(generics);
                var newGenerics = generationParms.jdk7initializers ? '&lt;&gt;' : genericExp;
                var emptyCheck = valueName + ' == null || ' + valueName + '.isEmpty()';
                return 'this.' + memberName + ' = ' + emptyCheck + ' ? Collections.' + genericExp + ' emptyList() : Collections.unmodifiableList(new ArrayList' + newGenerics + '(' + valueName + '));';
            },
            makeTestValue: function(generationParms, n, type, generics) {
                return 'Arrays.asList(' + DataTypes.getType(generics[0]).makeTestValue(generationParms, n) + ')';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'Map': {
            isCollection: true,
            isMap: true,
            classImports: ['java.util.Map', 'java.util.HashMap', 'java.util.Collections'],
            testImports: ['java.util.Map', 'java.util.HashMap'],
            initializer: function(generationParms, memberName, valueName, generics) {
                var genericExp = Util.makeGenerics(generics);
                var newGenerics = generationParms.jdk7initializers ? '&lt;&gt;' : genericExp;
                var emptyCheck = valueName + ' == null || ' + valueName + '.isEmpty()';
                return 'this.' + memberName + ' = ' + emptyCheck + ' ? Collections.' + genericExp + ' emptyMap() : Collections.unmodifiableMap(new HashMap' + newGenerics + '(' + valueName + '));';
            },
            makeTestValue: function(generationParms, n, type, generics) {
                return 'null /* TODO: Create a constant test value. */';
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        },
        'DateTime': {
            isCollection: false,
            classImports: ['org.joda.time.DateTime'],
            testImports: ['org.joda.time.DateTime', 'org.joda.time.DateTimeZone'],
            initializer: function(generationParms, memberName, valueName) {
                return 'this.' + memberName + ' = ' + valueName + ';';
            },
            makeTestValue: function(generationParms, n) {
                return 'new DateTime(2014, 1, 2, 3, 4, 5, 6, DateTimeZone.UTC).plusDays(' + n + ')'
            },
            makeEqualityTest: function(generationParms, expected, actual) {
                return DataTypes._defaultEqualityTest(generationParms, expected, actual);
            }
        }
    },

    // Given the name of a type, return the appropriate type definition.
    getType: function(typeName) {
        var t = DataTypes._allTypes[typeName];
        return t ? t : DataTypes._unknownType;
    }
};
