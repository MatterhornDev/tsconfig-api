"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var readline_1 = __importDefault(require("readline"));
var rl = readline_1["default"].createInterface({
    input: fs_1["default"].createReadStream(path_1["default"].join(__dirname, 'tscompileroptions.md'))
});
var data = {};
rl.on('line', function (line) {
    var d = line.split('|').map(function (s) { return s.trim().replace(/\`/g, ''); }); // split on | char, trim whitespace, and remove all ` chars
    var option, cliOption;
    var _cliOption = d[0], type = d[1], defaultValue = d[2], description = d[3];
    if (_cliOption.match(/\<br\/\>/) !== null) {
        option = d[0].split('<br/>')[0].replace(/\-/g, '').replace(/\~/g, '');
        cliOption = d[0].split('<br/>');
    }
    else {
        option = d[0].replace(/\-/g, '').replace(/\<sup\>\[[1|2]\]\<\/sup\>/, '').replace(/\~/g, '');
        cliOption = _cliOption.replace(/\<sup\>\[[1|2]\]\<\/sup\>/, '').replace(/\~/g, '');
    }
    var experimental = _cliOption.match(/\<sup\>\[1\]\<\/sup\>/) !== null;
    var configOnly = _cliOption.match(/\<sup\>\[2\]\<\/sup\>/) !== null;
    if (type === '') {
        type = "cli operation";
    }
    data[option] = {
        cliOption: configOnly ? null : cliOption,
        type: type,
        defaultValue: defaultValue,
        description: description,
        experimental: experimental,
        configOnly: configOnly
    };
});
rl.on('close', function () {
    console.log(data);
    fs_1["default"].writeFile(path_1["default"].join(__dirname, '../src/tsconfig-data.json'), JSON.stringify(data), function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Wrote File');
        }
    });
});
