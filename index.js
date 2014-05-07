var async = require('async');
var jstransform = require('jstransform');
var concatMap = require('concat-map');
var sourceMap = require('convert-source-map');

var defaultVisitors = [
    'jstransform/visitors/es6-arrow-function-visitors',
    'jstransform/visitors/es6-class-visitors',
    'jstransform/visitors/es6-object-concise-method-visitors',
    'jstransform/visitors/es6-object-short-notation-visitors',
    'jstransform/visitors/es6-rest-param-visitors',
    'jstransform/visitors/es6-template-visitors'
];

module.exports = function(src) {
    this.cacheable();
    var cb = this.async();

    var visitors = this.query
        ? this.query.substr(1).split(',')
        : defaultVisitors;

    async.map(visitors, resolve.bind(this), resolved.bind(this));
    
    function resolve(path, cb) {
        this.resolve(this.context, path, cb);
    }
    
    function resolved(err, visitors) {
        visitors = concatMap(visitors, function(v) {
            return require(v).visitorList;
        });
        
        var r = jstransform.transform(visitors, src, {
            filename: this.resourcePath,
            sourceMap: true
        });
        
        var map = sourceMap.fromJSON(r.sourceMap);
        map.sourcemap.file = this.resourcePath;
        map.sourcemap.sources = [this.resourcePath];
        map.sourcemap.sourcesContent = [src];

        cb(null, r.code, r.sourceMap);
    }
};
