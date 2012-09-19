
YUI.add("uneditable-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-uneditable field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');
var instanceField = new Y.inputEx.UneditableField({
    name: 'date', 
    value: 'http://farm2.static.flickr.com/1052/913643741_a83000f8e4.jpg', 
    visu: {
        visuType: 'func', 
        func: function(value){ return Y.inputEx.cn('img',{src:value},{border: '2px solid black'}); } 
    },
    parentEl: 'demo'
});

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-uneditable"]
});