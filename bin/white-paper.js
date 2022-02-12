// White paper for the util object

/**
 * EXECUTION FLOW THROUGH UTIL SUBSCRIPTION
 * 
 * subscription()
 *    init()
 * init()
 *    setup properties of intance root
 *    setup intance properties
 * 
 * override()
 *    set root override to true;
 * 
 * subscribe()
 *    set root.subscribers.nodes
 *    generateName()
 * generateName()
 *    generates a name for the subscription
 * 
 * handle()
 *    set handled to true
 *    set addEventListener of the EventTarget to a custom listener
 *    root addHandle()
 *    root setContextualTypes()
 *    root addHandlers()
 *    root handle()
 *    restore addEventListener of the EventTarget
 * addHandle()
 *    adds the subscription name data-handles attribute of subscribing nodes
 * setContextualTypes()
 *    set root types to reflect contextual behaviours
 * addHandlers()
 *    add handler functions to root handlers under each type
 * handle()
 *    retrieve and invoke suitable gh for the instance
 *    getGenericHandler()
 *    gh()
 * getGenericHandler()
 *    
 * gh()
 *    delegationHandler()
*     mixedHandler()
*     extrasHandler()
*     customEventsHandler()
*     defaultHandler()
 */

/**
 * MODAL DISMISSAL EXECUTION FLOW
 * @example
 * var s = util.subscription("click");
 * s.override();
 * s.subscribe("modal-footer");
 * s.handle(util.modalDialogResponse);
 * 
 * modalDialogResponse()
 *    modalDialogReject()
 *    modalDialogAccept()
 *    modalHide()
 * modalDialogAccept()
 *    switch()
 *    launchRowEdit()
 * modalDialogReject()
 */