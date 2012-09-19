
YUI.add("ddlist-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-ddlist field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');





     var data = [
        {
          id: 'book_1',
          title: 'Book 1 title'
        },
        {
          id: 'book_2',
          title: 'Book 2 title'
        },
        {
          id: 'book_3',
          title: 'Book 3 title'
        },
        {
          id: 'book_4',
          title: 'Book 4 title'
        },
        {
          id: 'book_5',
          title: 'Book 5 title'
        }
      ];

      var container = Y.one('#demo');

      // Instantiate field
      var field = new Y.inputEx.DDListField({
        name: 'books',
        valueKey: "id",
        labelKey: "title",
        parentEl: container,
        items: data
      });





        Y.Assert.isObject(field);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-ddlist"]
});