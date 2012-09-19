
YUI.add("timerange-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-timerange field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = new Y.inputEx.TimeRange({
                    parentEl: 'demo',
                    label: 'label'

                });

var button = Y.inputEx.cn('button', null, null, 'getValue');
Y.one(button).on('click',function() {
    alert(instanceField.getValue()+" (seconds)");
});
Y.one('#demo').appendChild(button);



        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-timerange"]
});