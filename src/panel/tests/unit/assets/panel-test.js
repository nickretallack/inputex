
YUI.add("panel-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-panel field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                    var instanceField = new Y.inputEx.Panel({
                    parentEl: 'demo',
                    label: 'label'

                });

                instanceField.render();
                instanceField.show();

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-panel"]
});