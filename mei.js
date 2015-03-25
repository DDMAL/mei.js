/**
*      Events. Pub/Sub system for Loosely Coupled logic.
*      Based on Peter Higgins' port from Dojo to jQuery
*      https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
*
*      Re-adapted to vanilla Javascript
*
*      Copied from https://github.com/DDMAL/diva.js/blob/develop/source/js/utils.js
*      and adapted to accept arguments on subscription
*
*/
var mei = (function() {
    var cache = {};
    var argsCache = {};
    var pub = {
        Events: {
            /**
             *      Events.publish
             *      e.g.: Events.publish('global', "PageDidLoad", [pageIndex, filename, pageSelector], this);
             *
             *      @class Events
             *      @method publish
             *      @param channel {String}
             *      @param topic {String}
             *      @param args     {Array}
             *      @param scope {Object} Optional
             */
            publish: function (channel, topic, args, scope)
            {
                if (cache[topic])
                {
                
                    
                    var func = function(topic, channel, scope) {
                        
                        var thisTopic = cache[topic];
                        var thisChannel = thisTopic[channel],
                            i = thisChannel.length;
    
                        var thisChannelArgs = argsCache[topic][channel];
    
                        while (i--)
                        {
                            thisChannel[i].apply( scope || this, args || thisChannelArgs[i] || []);
                        }
                    };
                    
                    if(channel === 'global') {
                        
                        // go through all channels
                        for(c in cache[topic]) {
                            func(topic, c, scope);
                        }
                        
                    }else {
                        func(topic, channel, scope);
                    }                    
                }
            },
            /**
             *      Events.subscribe
             *      e.g.: var handle = mei.Events.subscribe('west', "HelloEvent", createBoxWorker, [2, 'hello']);
             *
             *      @class Events
             *      @method subscribe
             *      @param channel {String}
             *      @param topic {String}
             *      @param callback {Function}
             *      @param args {Array}
             *      @return Event handler {Array}
             */
            subscribe: function (channel, topic, callback, args)
            {
                if (!cache[topic])
                {
                    cache[topic] = {};
                }

                if (!argsCache[topic])
                {
                    argsCache[topic] = {};
                }

                if (!cache[topic][channel])
                {
                    cache[topic][channel] = [];
                }

                if (!argsCache[topic][channel])
                {
                    argsCache[topic][channel] = [];
                }

                cache[topic][channel].push(callback);
                argsCache[topic][channel].push(args || []);

                return [channel, topic, callback, args];
            },
            /**
             *      Events.unsubscribe
             *      e.g.: var handle = mei.Events.subscribe('global', "HelloEvent", createBoxWorker, [2, 'hello']);
             *              mei.Events.unsubscribe(handle);
             *
             *      @class Events
             *      @method unsubscribe
             *      @param handle {Array}
             */
            unsubscribe: function (handle)
            {
                var c = handle[0],
                    t = handle[1],
                    f = handle[2],
                    a = handle[3];

                if (cache[t])
                {
                    var i = cache[t][c].length;
                    while (i--)
                    {
                        if (cache[t][c][i] === f)
                        {
                            argsCache[t][c].splice(i, 1);
                            cache[t][c].splice(i, 1);

                            return true;
                        }
                    }
                }
                return false;
            },

            /**
             *      diva.Events.unsubscribeAll
             *      e.g.: diva.Events.unsubscribeAll();
             *
             *      @class Events
             *      @method unsubscribe
             */
            unsubscribeAll: function ()
            {
                cache = {};
                argsCache = {};
            }
        }
    };
    return pub;
}());
