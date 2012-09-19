
YUI.add("imagecropper-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-imagecropper field generation test",
            testGeneration: function () {
                Y.log("testGeneration", 'debug');

                var instanceField = Y.inputEx({
                    parentEl: "demo",
                    type: "imagecropper",
                    url: "https://www.google.fr/intl/en_ALL/images/logos/images_logo_lg.gif"
                });

                Y.Assert.isObject(instanceField);
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-imagecropper"]
});