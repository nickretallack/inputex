
YUI.add("jsonschema-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-jsonschema field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

// Create a schemaIdentifierMap 
var schemaIdentifierMap = {
 // Person definition
 "Person": {
    "id": "Person",
    "description":"A person",
    "type":"object",
    "properties": {
        "name": { "type":"string"},
        "born" : { "type":"string", "format":"date", "optional":true},
        "gender" : { "type":"string", "choices": [ {"value":"male","label":"Guy"}, {"value":"female","label":"Girl"} ]},
        "grownup": { "type": "boolean" },
        "favoritecolors": { "type": "array" },
        "address": { 
            "type":"object",
            "properties":{
                "street":{"type":"string"},
                "city":{"type":"string"},
                "state":{"type":"string"}
            }
        }
    }
 }
};
 
// Create the JsonSchema builder object
var builder = new Y.inputEx.JsonSchema.Builder({
    'schemaIdentifierMap': schemaIdentifierMap
});
 
// Get the inputEx field definition from the "Person" object
var inputExDefinition = builder.schemaToInputEx(schemaIdentifierMap["Person"]);
 
// Add 'container1' as parent element
inputExDefinition.parentEl = 'demo';
 
// Create the form
var f = Y.inputEx(inputExDefinition);








        Y.Assert.isObject(f);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-jsonschema"]
});