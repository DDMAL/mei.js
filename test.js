(function ()

{
    function assert(condition, message) {
        if (!condition) {
            message = message || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }

    ////

    var globalChannelCalled = false;
    var testGlobalChannel = function()
    {
        globalChannelCalled = true;
        console.log('Test Global Channel');
    }
    var ret = mei.Events.subscribe('global', 'TestGlobalChannel', testGlobalChannel);
    assert(globalChannelCalled === false, 'global channel should be false');
    mei.Events.publish('global', 'TestGlobalChannel');
    assert(globalChannelCalled === true, 'global channel should be true');

    ///

    var componentChannelCalled = false;
    var testComponentChannel = function()
    {
        componentChannelCalled = true;
        console.log('Test Component Channel');
    }
    var sub = mei.Events.subscribe('verovio', 'TestComponentChannel', testComponentChannel);
    assert(componentChannelCalled === false, 'component channel should be false');
    mei.Events.publish('verovio', 'TestComponentChannel');
    assert(componentChannelCalled === true, 'component channel should be true');

    componentChannelCalled = false;
    mei.Events.unsubscribe(sub);
    mei.Events.publish('verovio', 'TestComponentChannel');
    assert(componentChannelCalled === false, 'component channel should be false after unsubscribe');

})();