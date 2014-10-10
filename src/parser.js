var InputParser = {
    parseInputLine: function(line) {
        var simpleRe = /^(\w+)\s+(\w+)$/g;
        var simpleWithPrivate = /^private\s+(\w+)\s+(\w+)$/g;
        var generics = /^(\w+)\s*<(.+)>\s+(\w+)$/g;
        var genericsWithPrivate = /^private\s+(\w+)\s*<(.+)>\s+(\w+)$/g;

        var matches;

        matches = simpleRe.exec(line) || simpleWithPrivate.exec(line);
        if (matches) {
            return {
                type: matches[1],
                name: matches[2],
                generics: []
            }
        }

        matches = generics.exec(line) || genericsWithPrivate.exec(line);
        if (matches) {
            var rawGenerics = matches[2].split(',');
            var generics = Util.map(rawGenerics, function(g) {
                return g.replace(/^\s+|\s+$/g, '');
            })

            return {
                type: matches[1],
                name: matches[3],
                generics: generics
            }
        }

        return undefined;
    },

    // Parse the contents of the input box into a series of member definitions.
    parseTextInput: function(input) {
        var output = [];

        if (!input || !input.length) {
            return output;
        }

        var rawLines = input.split("\n");
        var trimmedLines = [];

        for (var i = 0; i < rawLines.length; i++) {
            var l = rawLines[i];

            if (!l || l.length == 0) {
                continue;
            }

            var trimmed = l.replace(/^\s+|[\W]+$/g, '');

            if (trimmed.length > 0) {
                trimmedLines.push(trimmed);
            }
        }

        for (var i = 0; i < trimmedLines.length; i++) {
            var initialResult = InputParser.parseInputLine(trimmedLines[i]);

            if (initialResult) {
                initialResult.ucName = Util.capitalizeFirst(initialResult.name);
                initialResult.lcName = Util.decapitalizeFirst(initialResult.name);

                output.push(initialResult);
            }
        }


        return output;
    }
};
