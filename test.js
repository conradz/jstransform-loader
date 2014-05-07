var test = require('tap').test;
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

test('run transform', function(t) {
    var config = {
        context: __dirname,
        entry: './fixtures',
        output: {
            path: __dirname,
            filename: 'bundle.js'
        }
    };
    
    fs.unlinkSync(path.join(__dirname, 'bundle.js'));
    webpack(config, done);
    
    function done(err) {
        if (err) throw err;
        var src = fs.readFileSync(path.join(__dirname, 'bundle.js'), 'utf8');
        
        var results = '';
        var sandbox = {
            console: {
                log: function(value) {
                    results += value + '\n';
                }
            }
        };

        vm.runInNewContext(src, sandbox);
        t.equal(results, 'Hello World!\nHello JSTransform!\n');
        t.end();
    }
});
