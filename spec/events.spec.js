describe('MEI', function()
{
    describe('Event setup', function()
    {
        it('has a publish function', function()
        {
            expect(mei.Events.publish).toEqual(jasmine.any(Function));
        });

        it('has a subscribe function', function()
        {
            expect(mei.Events.subscribe).toEqual(jasmine.any(Function));
        });

        it('has an unsubscribe function', function()
        {
            expect(mei.Events.unsubscribe).toEqual(jasmine.any(Function));
        });

        it('has an unsubscribeAll function', function()
        {
            expect(mei.Events.unsubscribeAll).toEqual(jasmine.any(Function));
        });
    });

    describe('Global channel event calling', function()
    {
        var callback;

        beforeEach(function()
        {
            callback = sinon.spy();
        });

        it('should respond on the global channel', function()
        {
            mei.Events.subscribe('global', 'TestGlobalChannel', callback, []);
            mei.Events.publish('global', ['TestGlobalChannel'], [], this);

            expect(callback.called).toBe(true);
        });

        it('should unsubscribe from the global channel', function()
        {
            var sub = mei.Events.subscribe('global', 'TestGlobalChannel', callback, []);
            mei.Events.publish('global', ['TestGlobalChannel'], [], this);

            expect(callback.called).toBe(true);

            mei.Events.unsubscribe(sub);
            mei.Events.publish('global' ['TestGlobalChannel'], [], this);
            expect(callback.callCount).toBe(1);
        });

        it('should unsubscribe all listeners', function()
        {
            var sub1 = mei.Events.subscribe('global', 'TestGlobalChannel', callback, []);
            var sub2 = mei.Events.subscribe('specific', 'TestSpecificChannel', callback, []);

            mei.Events.unsubscribeAll();

            mei.Events.publish('global', ['TestGlobalChannel'], [], this);
            mei.Events.publish('specific', ['TestSpecificChannel'], [], this);

            expect(callback.called).toBe(false);
        });

        it('should not trigger a callback on a specific channel', function()
        {
            var sub = mei.Events.subscribe('global', 'TestSpecificChannel', callback, []);
            mei.Events.publish('specific', ['TestSpecificChannel'], [], this);
            expect(callback.called).toBe(false);
        });

        it('should trigger a callback on a global channel', function()
        {
            var sub = mei.Events.subscribe('specific', 'TestSpecificChannel', callback, []);
            mei.Events.publish('global', ['TestSpecificChannel'], [], this);
            expect(callback.called).toBe(true);
        });
    });

    describe('Specific Channel event calling', function()
    {
        var callback;

        beforeEach(function()
        {
            callback = sinon.spy();
        });

        it('should respond on a specific channel', function()
        {
            mei.Events.subscribe('specific', 'TestSpecificChannel', callback, []);
            mei.Events.publish('specific', ['TestSpecificChannel'], [], this);

            expect(callback.called).toBe(true);
        });
    });

    describe('Argument passing', function()
    {
        var callback;

        beforeEach(function()
        {
            callback = sinon.spy();
        });

        it('should accept arguments to a callback function', function()
        {
            mei.Events.subscribe('specific', 'TestArgumentCalling', callback, ['name', 'version']);
            mei.Events.publish('specific', ['TestArgumentCalling'], ['mei', 2013], this);

            expect(callback.called).toBe(true);
            expect(callback.calledWith('mei', 2013)).toBe(true);
            expect(callback.calledWith('foo', 123)).toBe(false);
        });
    });

    describe('Fallback messaging', function()
    {
        var callback1, callback2, callback3;

        beforeEach(function()
        {
            callback1 = sinon.spy();
            callback2 = sinon.spy();
            callback3 = sinon.spy();
        });

        it('should register callbacks with fallbacks', function()
        {
            var ret1 = mei.Events.subscribe('fallback', 'TestFallbackEvent', callback1, []);
            var ret2 = mei.Events.subscribe('specific', 'TestFallbackEvent', callback2, []);
            var ret3 = mei.Events.subscribe('specific', 'TestSpecificEvent', callback3, []);

            mei.Events.publish('global', ['TestSpecificEvent', 'TestFallbackEvent'], [[], []], this);

            expect(callback1.called).toBe(true);
            expect(callback2.called).toBe(false);
            expect(callback3.called).toBe(true);

            mei.Events.publish('global', ['TestSpecificEvent', 'TestFallbackEvent'], [[], []], this);
        });
    });


});