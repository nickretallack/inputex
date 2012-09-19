
YUI.add("form-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-form field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField =  Y.inputEx({
        parentEl : "demo",
        type: "form",
        fields: [{
            label: 'Firstname',
            name: 'firstname',
            required: true,
            value: 'Jacques'
        }, {
            label: 'Lastname',
            name: 'lastname',
            value: 'Dupont'
        }],
        buttons: [{
            type: 'submit',
            value: 'Change'
        }]

    });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-form", "inputex-string"]
});