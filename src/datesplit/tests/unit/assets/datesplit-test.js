
YUI.add("datesplit-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-datesplit field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
                    type: "datesplit",
                    parentEl: 'demo',
                    label: 'label'

                });

            Y.Assert.isObject(instanceField);
        
            },
            testInputDate: function() {
               var instanceField = Y.inputEx({
                  type: "datesplit",
                  parentEl: 'demo',
                  label: 'label'

               }), old_date = new Date(1980,2,3), old_date2 = new Date(45,7,15), new_date = new Date(2012,11,12);

               // Simulate User Input in each fields
               instanceField.inputs[0].setValue(3); //Month
               instanceField.inputs[1].setValue(3); //Day
               instanceField.inputs[2].setValue(80); //Year

               Y.Assert.areEqual(old_date.getFullYear(), instanceField.getValue().getFullYear());
               Y.Assert.areEqual(old_date.getMonth(), instanceField.getValue().getMonth());
               Y.Assert.areEqual(old_date.getDay(), instanceField.getValue().getDay());

               // Simulate User Input in each fields
               instanceField.inputs[0].setValue(8); //Month
               instanceField.inputs[1].setValue(15); //Day
               instanceField.inputs[2].setValue(45); //Year

               Y.Assert.areEqual(old_date2.getFullYear(), instanceField.getValue().getFullYear());

               // Simulate User Input in each fields
               instanceField.inputs[0].setValue(12); //Month
               instanceField.inputs[1].setValue(12); //Day
               instanceField.inputs[2].setValue(12); //Year

               Y.Assert.areEqual(new_date.getFullYear(), instanceField.getValue().getFullYear());
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-datesplit"]
});