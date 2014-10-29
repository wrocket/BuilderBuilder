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

var Util = {
    // Given a list of generic types, generate a HTML string with Diamond brackets.
    // e. g. makeGenerics(['Foo', 'Bar']) -> &ltFoo, Bar;&gt
    makeGenerics: function(generics) {
        if (!generics || !generics.length) {
            return '';
        } else {
            return '&lt;' + generics.join(', ') + '&gt;';
        }
    },

    // Make the first character in a string upper-case, should one exist. E.g.: foobar -> Foobar
    capitalizeFirst: function(str) {
        if (!str || !str.length) {
            return str;
        }

        return str.charAt(0).toUpperCase() + str.substring(1, str.length);
    },

    // Make the first character in a string lower-case, should one exist. E.g.: FOOBAR -> fOOBAR
    decapitalizeFirst: function(str) {
        if (!str || !str.length) {
            return str;
        }

        return str.charAt(0).toLowerCase() + str.substring(1, str.length);
    },

    // Return a specified number of tabs.
    tab: function(n) {
        var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';

        if (!n || n < 1) {
            return '';
        } else if (n == 1) {
            return tab;
        } else {
            return new Array(n + 1).join(tab);
        }
    },

    // Given an existing list of lines, append a new list of lines, each with a given tab level.
    extend: function(existingLines, newLines, tabLevel) {
        if (!tabLevel) {
            tabLevel = 0;
        }

        if (existingLines && newLines) {
            for (var i = 0; i < newLines.length; i++) {
                existingLines.push(Util.tab(tabLevel) + newLines[i]);
            }
        }
    },

    // For all items in input, apply a given transform function f, and return the transformed values.
    map: function(input, f) {
        var results = [];

        if(input) {
            for (var i = 0; i < input.length; i++) {
                results.push(f(input[i]));
            }
        }

        return results;
    }
};