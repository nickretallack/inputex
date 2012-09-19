
YUI.add("timeinterval-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-timeinterval field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

var field = new Y.inputEx.TimeIntervalField({parentEl: 'demo', label: 'Length',value:82800});
var button = Y.inputEx.cn('button', null, null, 'getValue');
Y.one(button).on('click',function() {
    alert(field.getValue()+" (seconds)");
});
Y.one('#demo').appendChild(button);







        Y.Assert.isObject(field);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-timeinterval"]
});