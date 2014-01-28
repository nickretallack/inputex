YUI.add("inputex-phone-test", function(Y) {

    var suite, testCase;

    suite = new Y.Test.Suite({
        name: "inputex-phone Test Suite"
    });

    testCase = new Y.Test.Case({

        name: "inputex-phone test case",
        testGeneration: function () {
            var instance = window.instance = new Y.inputEx.PhoneField({
                parentEl : "demo"
            });
            Y.Assert.isObject(instance);
        },
        testGenerationWithFontAwesome: function () {
            var instance = window.instance2 = new Y.inputEx.PhoneField({
                parentEl : "demo2",
                button : {
                    className : "inputEx-phoneField-button pure-button",
                    label : '<i class="fa fa-phone"></i>'
                }
            });
            Y.Assert.isObject(instance);
        }


    });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-phone"]
});
