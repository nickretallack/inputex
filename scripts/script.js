var fs = require("fs"),
    _path = require("path"),

    args = (process.argv).slice(2),
    all = false,
    test = false,
    lang = false,
    inModule;

if (args[0] === "all") {
    all = true;
} else if (args[0] === "test") {
    test = true;
} else if (args[0] === "lang") {
    lang = true;
}



if (all || test) {

    var files = fs.readdirSync("./src/");

    files.forEach(function (file) {

        console.log(file);

        console.log("./src/" + file + "/test");

        try {
            fs.renameSync("./src/" + file + "/test", "./src/" + file + "/tests");
        } catch (ex) {}

    });

} else if (all || lang) {


var files = fs.readdirSync("./src/");
files.forEach(function (file) {
    console.log(file);

    if (file.match(/^\./)) return;

    inModule = _path.join("./src/",file);
    fs.mkdirSync(_path.join(inModule,"lang"));
    fs.mkdirSync(_path.join(inModule,"meta"));






});

}else {
    throw new Error("error choose test or lang");
}