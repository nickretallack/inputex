
YUI.add("rpc-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-rpc field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');





var service = new Y.inputEx.RPC.Service("flickr.smd",{ 
    success: function() {
 
        // Creates the form from service.getPublicPhotos method
        Y.inputEx.RPC.generateServiceForm(service.getPublicPhotos, { parentEl: 'demo' },{
                success: function(results) {
                   
                    // Get the result and display the images
                    var treeContainer = Y.one('#demo');
                    treeContainer.innerHTML = "";
                    var list = results.photos.photo;
                    for(var i = 0 ; i != list.length-1 ; i++) {
                        var photo = list[i];
                        var url = "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
                        treeContainer.appendChild( Y.inputEx.cn('div', {className: 'photo'}, null, String.fromCharCode(60)+"img src='"+url+"' /"+String.fromCharCode(62) ) );
                    }   
 
                }
            });
 
    }
});









        Y.Assert.isObject(service);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-rpc"]
});