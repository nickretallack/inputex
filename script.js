var fs = require("fs");


var files = fs.readdirSync("./src/");

files.forEach(function(file){

   console.log(file);

   console.log("./src/"+file+"/test");

   try{
      fs.renameSync("./src/"+file+"/test", "./src/"+file+"/tests");
   }catch(ex){}
   


});