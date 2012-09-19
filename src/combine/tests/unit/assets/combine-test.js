
YUI.add("combine-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-combine field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
                    type: "combine",
                    parentEl: 'demo',
                    label:'Select Colors :',
      fields: [
         {
                    type: "color",
                    parentEl: 'demo',
                    label: 'label'

                },
         {
                    type: "color",
                    parentEl: 'demo',
                    label: 'label'

                }
     ],
    separators: [false," ",false]

                });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-combine","inputex-color"]
});