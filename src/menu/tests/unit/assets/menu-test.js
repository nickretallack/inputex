
YUI.add("menu-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-menu field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                
var instanceField,
menuItems = [{
    text : "cat1",
    submenu : {
        itemdata : [
            {text : "int1", value : 1},
            {text : "int2", value : 2}
        ]
    }
},{
    text: "cat2",
    submenu : {
        itemdata : [
            {text : "int3", value : 3},
            {text : "int4", value : 4}
        ]
    }
}];

Y.log("test",'debug');

    instanceField = new Y.inputEx.MenuField({
            colorInvite : "#FF0000",
            parentEl : "demo",
            menuItems : menuItems,
            typeInvite :"type Invite",
            menuOrientation: "horizontal"
        });





                

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-menu"]
});