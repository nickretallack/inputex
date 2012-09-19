
YUI.add("datatable-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-datatable field generation test",
            testGeneration: function () {

                Y.log("testGeneration", 'debug');


                // normal YUI config for DataTable
                var cols = [{
                    key: "id",
                    sortable: true
                }, {
                    key: "date",
                    sortable: true,
                    formatter: function (o) {
                        return Y.DataType.Date.format(o.data.date, {
                            format: "%m/%d/%Y"
                        });
                    }
                }, {
                    key: "quantity",
                    sortable: true
                }, {
                    key: "price",
                    sortable: true
                }, {
                    key: "title",
                    sortable: true
                }, {
                    key: "category",
                    sortable: true
                }, {
                    key: "color",
                    sortable: false,
                    allowHTML: true,
                    formatter: '<div style="width:15px;height:15px;background-color:{value};"></div>'
                }];

                var data = [{
                    id: "po-0167",
                    date: new Date(1980, 2, 24),
                    quantity: 1,
                    price: 4,
                    title: "A Book About Nothing",
                    category: "SF",
                    color: '#ffff00'
                }, {
                    id: "po-0783",
                    date: new Date("January 3, 1983"),
                    quantity: null,
                    price: 12.12345,
                    title: "The Meaning of Life",
                    category: "Novel",
                    color: '#ffff00'
                }, {
                    id: "po-0297",
                    date: new Date(1978, 11, 12),
                    quantity: 12,
                    price: 1.25,
                    title: "This Book Was Meant to Be Read Aloud",
                    category: "SF",
                    color: '#ffff00'
                }, {
                    id: "po-1482",
                    date: new Date("March 11, 1985"),
                    quantity: 6,
                    price: 3.5,
                    title: "Read Me Twice",
                    category: "Philosophy",
                    color: '#ffff00'
                }];

                // inputEx config
                var inputEx = {
                    type: "group",
                    fields: [{
                        type: 'uneditable',
                        label: 'Id',
                        name: 'id'
                    }, {
                        type: 'datepicker',
                        label: 'Date',
                        name: 'date'
                    }, {
                        type: 'integer',
                        label: 'Quantity',
                        name: 'quantity'
                    }, {
                        type: 'number',
                        label: 'Amount',
                        name: 'price'
                    }, {
                        type: 'string',
                        label: 'Title',
                        name: 'title',
                        required: true,
                        showMsg: true
                    }, {
                        type: 'select',
                        label: 'Category',
                        name: 'category',
                        choices: ['SF', 'Novel', 'Philosophy']
                    }, {
                        type: 'color',
                        label: 'Color',
                        name: 'color'
                    }]
                };


                var table = new Y.DataTable({
                    columns: cols,
                    data: data
                });
                table.render("#demo");

                var pluginConfig = {
                    inputEx: inputEx
                };
                table.plug(Y.inputEx.Plugin.InputExDataTable, pluginConfig);

                Y.Assert.isObject(table);

            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", 'datatype', 'inputex-datatable', 'inputex-uneditable', 'inputex-datepicker', 'inputex-integer', 'inputex-number', 'inputex-select', 'inputex-color', "inputex-examples"]
});