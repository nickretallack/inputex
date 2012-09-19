
YUI.add("visus-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-visus field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

   





   var instanceField = Y.inputEx({
    type: 'inplaceedit',
    parentEl: 'demo', 
    label: "PageRank",
    editorField:{
        type:'select', 
        name: 'pagerank',
        choices: ['0','1','2','3','4','5','6','7','8','9','10']
    },
    visu: {
        visuType: 'func', 
        func: function(val) {
            return Y.inputEx.cn('img',{src: "http://www.page-rank-lookup.com/i/style1/pagerank"+val+".png"});
        }
    },
    value: '5'
});


        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-visus"]
});