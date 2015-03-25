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

    //// Test global channel

    var globalChannelCalled1 = false;
    var globalChannelCalled2 = false;
    var testGlobalChannel1 = function()
    {
        globalChannelCalled1 = true;
        console.log('Test Global Channel 1');
    }
    var testGlobalChannel2 = function()
    {
        globalChannelCalled2 = true;
        console.log('Test Global Channel 2');
    }
    var ret1 = mei.Events.subscribe('west1', 'TestGlobalChannel', testGlobalChannel1);
    var ret2 = mei.Events.subscribe('west2', 'TestGlobalChannel', testGlobalChannel2);
    assert(globalChannelCalled1 === false, 'global channel 1 should be false');
    assert(globalChannelCalled2 === false, 'global channel 2 should be false');
    mei.Events.publish('global', 'TestGlobalChannel');
    assert(globalChannelCalled1 === true, 'global channel 1 should be true');
    assert(globalChannelCalled2 === true, 'global channel 2 should be true');

    //// Test component channel

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
    
    //// Test fallback event
    
    var fallbackEventCalled1 = false;
    var fallbackEventCalled2 = false;
    var specificEventCalled = false;
    var testFallbackEvent1 = function()
    {
        fallbackEventCalled1 = true;
        console.log('Test Fallback Event 1');
    }
    var testFallbackEvent2 = function()
    {
        fallbackEventCalled2 = true;
        console.log('Test Fallback Event 2');
    }
    var testSpecificEvent = function()
    {
        specificEventCalled = true;
        console.log('Test Specific Event');
    }
    var ret1 = mei.Events.subscribe('fallback', 'TestFallbackEvent', testFallbackEvent1);
    var ret2 = mei.Events.subscribe('specific', 'TestFallbackEvent', testFallbackEvent2);
    var ret3 = mei.Events.subscribe('specific', 'TestSpecificEvent', testSpecificEvent);
    assert(fallbackEventCalled1 === false, 'fallback event 1 should be false');
    assert(fallbackEventCalled2 === false, 'fallback event 2 should be false');
    assert(specificEventCalled === false, 'specific event should be false');
    mei.Events.publish('global', ['TestSpecificEvent', 'TestFallbackEvent'], [[], []]);
    assert(fallbackEventCalled1 === true, 'fallback event 1 should be true');
    assert(fallbackEventCalled2 === false, 'fallback event 2 should still be false');
    assert(specificEventCalled === true, 'specific event should be true');
    
    
})();
