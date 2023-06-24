export class FormoBase extends HTMLElement
{
  constructor()
  {
    super();
  }

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
    // this is a custom element, it has dispatchEvent and can be set as event origin
    let evOriginObj = this;
    evDetails.detail.eventOrigin = evOriginObj;

    // dispatch Event
    let ev = new CustomEvent(eventType, evDetails);
    evOriginObj.dispatchEvent(ev);
  }
}