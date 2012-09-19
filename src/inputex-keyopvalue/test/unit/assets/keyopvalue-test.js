
YUI.add("keyopvalue-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-keyopvalue field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
                    type: "keyopvalue",
                    parentEl: 'demo',
                    label: 'label',
                    availableFields: [
        {type: 'string', name: 'lastname', label: 'Lastname' },
        {type: 'string', name: 'firstname', label: 'Firstname' },
        {type: 'select', name: 'gender', label: 'Gender',  choices: ["Mr","Mrs","Ms"] }
    ]

                });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-keyopvalue"]
});