export class EventEmit
{
  emit(eventType, payload = null)
  {
    // set up event
    let evDetails =
    {
      detail: {
        payload: payload,
        eventOrigin: null
      },
      bubbles: true,
      cancelable: true
    }

    // setup event origin
    // this is a non visual object, so we use the window object as event origin
    let evOriginObj = window;
    evDetails.detail.eventOrigin = evOriginObj;

    // dispatch Event
    let ev = new CustomEvent(eventType, evDetails);
    evOriginObj.dispatchEvent(ev);
  }
}