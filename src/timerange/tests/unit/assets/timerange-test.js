YUI.add("timerange-test", function(Y) {


var suite = new Y.Test.Suite({name: "components Generation Suite"}),
    testCase;

testCase = new Y.Test.Case({

   name: "inputex-timerange field generation test",

   "test generation": function() {

      Y.log("testGeneration", 'debug');

      var value = ['01:00', '02:00'];

      this.timerange = new Y.inputEx.TimeRange({
         parentEl: 'demo',
         showMsg: true,
         label: 'My TimeRange Label',
         value: value
      });

      Y.ArrayAssert.itemsAreSame(this.timerange.getValue(), value);
   },

   "test set value": function() {
      value = ['02:00', '03:00'];
      this.timerange.setValue(value);
      Y.ArrayAssert.itemsAreSame(this.timerange.getValue(), value);
   },

   "test set incorrect value": function() {
      value = ['02:00', '00:10'];
      this.timerange.setValue(value);
      Y.ArrayAssert.itemsAreSame(this.timerange.getValue(), value);
      Y.Assert.areEqual('invalid', this.timerange.getState());
   },

   "test set correct value back": function() {
      value = ['02:00', '03:00'];
      this.timerange.setValue(value);
      Y.Assert.areEqual('valid', this.timerange.getState());
   }
});

suite.add(testCase);
Y.Test.Runner.add(suite);

}, "", {requires: ["test", "inputex-timerange"]});