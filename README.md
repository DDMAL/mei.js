mei.js
======

Event System
============

The mei.js event system is a channel-based publish/subscribe events system. It was built to allow different components to co-ordinate task execution based on a message.

At the core of this component are two functions: `publish` and `subscribe`.

`subscribe` allows a component to register itself as being 'interested' in receiving specific messages. This has the syntax:

    mei.Events.subscribe('channel', 'topic', callback(), [args])

For example, a notation editor might be interested in receiving notifications of a `note` object being changed in order to update the appearance of that note. So, the notation editor might subscribe to the `NoteChanged` message:

Example:

    var subscribe = mei.Events.subscribe('notationeditor', "NoteDidChange", callbackFunction, [noteId]);

When another component changes a 'note' object, it would then publish an event with the topic "NoteDidChange". This follows this syntax:

    mei.Events.publish('channel', 'topic', [args], scope{});

Example:

    mei.Events.publish('global', 'NoteDidChange', [noteId], this);

This will trigger the 'callbackFunction' defined previously.

The most important thing to remember is that multiple callback functions can be triggered by a single `publish` event. So multiple components register themselves to listen to the 'NoteDidChange' event, then when this event is published, it will trigger a function call in all listeners.

Finally, the `unsubscribe` method will unsubscribe a listener from a certain event. If a component is no longer interested in receiving events, it can unsubscribe by passing in the "handle" it received when subscribing. 

    mei.Events.unsubscribe([handle]);

where `handle` is a simple array containing:

    [channel, topic, callback, args]

Example:

    # when subscribing
    var myHandle = mei.Events.subscribe('mycomponent', 'NoteDidChange', callbackFunction, [noteId]);

    # to unsubscribe
    mei.Events.unsubscribe(myHandle);

This will stop `mycomponent` from responding to any further `NoteDidChange` messages.






