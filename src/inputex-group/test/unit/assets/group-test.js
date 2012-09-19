
YUI.add("group-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-group field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
        parentEl : "demo",
        type: "group",
        fields: [{
            label: 'Firstname',
            name: 'firstname',
            required: true,
            value: 'Jacques'
        }, {
            label: 'Lastname',
            name: 'lastname',
            value: 'Dupont'
        }]
    });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-group", "inputex-string"]
});