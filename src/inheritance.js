/*global require, module*/
var core = require('./core');
module.exports = function(inheritor, base) {
    var child = inheritor.prototype;
    var ParentProxy = function() {};
    var superConstructor;

    ParentProxy.prototype = base.prototype;
    inheritor.prototype = new ParentProxy();
    inheritor.prototype.constructor = inheritor;
    var hasConstructor = core.isFunction(base.prototype.constructor) && base.prototype.constructor !== Object;
    superConstructor = hasConstructor ? base.prototype.constructor : base;
    inheritor.__super__ = function(context, params) {
        return superConstructor.apply(context, params);
    };

    for (var key in child) {
        if (key === 'constructor' || key === '__super__') {
            continue;
        }

        var parentMethod = inheritor.prototype[key];
        inheritor.prototype[key] = child[key];
        if (!core.isEmpty(parentMethod)) {
            inheritor.prototype[key].__super__ = parentMethod;
        }
    }

    return inheritor;
};