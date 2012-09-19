
YUI.add("smdtester-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-smdtester field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

           
  var smdList = ['smd/test0.smd', 'smd/test.smd'];
         var instanceField = new Y.inputEx.RPC.SMDTester('demo', smdList);



        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-smdtester"]
});