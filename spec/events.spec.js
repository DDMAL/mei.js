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
        var callback = sinon.spy();

        it('should respond on the global channel', function()
        {
            mei.Events.subscribe('global', 'TestGlobalChannel', callback, []);
            mei.Events.publish('global', ['TestGlobalChannel'], [], this);

            expect(callback.called).toBe(true);
        });
    });


});