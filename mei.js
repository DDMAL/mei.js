/**
*      Events. Pub/Sub system for Loosely Coupled logic.
*      Based on Peter Higgins' port from Dojo to jQuery
*      https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
*
*      Re-adapted to vanilla Javascript
*
*      Copied from https://github.com/DDMAL/diva.js/blob/develop/source/js/utils.js
*
*/
var mei = (function() {
    var cache = {};
    var pub = {
        Events: {
            /**
             *      Events.publish
             *      e.g.: Events.publish("PageDidLoad", [pageIndex, filename, pageSelector], this);
             *
             *      @class Events
             *      @method publish
             *      @param topic {String}
             *      @param args     {Array}
             *      @param scope {Object} Optional
             */
            publish: function (topic, args, scope)
            {
                if (cache[topic])
                {
                    var thisTopic = cache[topic],
                        i = thisTopic.length;

                    while (i--)
                        thisTopic[i].apply( scope || this, args || []);
                }
            },
            /**
             *      Events.subscribe
             *      e.g.: Events.subscribe("PageDidLoad", highlight)
             *
             *      @class Events
             *      @method subscribe
             *      @param topic {String}
             *      @param callback {Function}
             *      @return Event handler {Array}
             */
            subscribe: function (topic, callback)
            {
                if (!cache[topic])
                    cache[topic] = [];

                cache[topic].push(callback);
                return [topic, callback];
            },
            /**
             *      Events.unsubscribe
             *      e.g.: var handle = Events.subscribe("PageDidLoad", highlight);
             *              Events.unsubscribe(handle);
             *
             *      @class Events
             *      @method unsubscribe
             *      @param handle {Array}
             *      @param completely {Boolean}
             */
            unsubscribe: function (handle, completely)
            {
                var t = handle[0],
                    i = cache[t].length;

                if (cache[t])
                {
                    while (i--)
                    {
                        if (cache[t][i] === handle[1])
                        {
                            cache[t].splice(cache[t][i], 1);
                            if (completely)
                                delete cache[t];
                        }
                    }
                }
            }
        }
    };
    return pub;
}());
