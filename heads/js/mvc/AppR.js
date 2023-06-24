export class AppR
{

  constructor()
  {
    this.eventRoutes =
    {
      eventTypeIsHandled: {},
      actions: []
    }
  }

  on(eventTypeStr, ...restArgs)
  {
    let queryStr = '';
    let callback = null;

    switch (restArgs.length)
    {
      case 1:
        queryStr = null;
        callback = restArgs[0];
      break;

      case 2:
        queryStr = restArgs[0];
        callback = restArgs[1];
      break;
    }

    if ((this.eventRoutes.eventTypeIsHandled[eventTypeStr] !== true))
    {
      window.addEventListener(eventTypeStr, this.doHandle.bind(this), false);
      this.eventRoutes.eventTypeIsHandled[eventTypeStr] = true;
    }

    this.eventRoutes.actions.push(
    {
      'eventTypeStr': eventTypeStr,
      'queryStr': queryStr,
      'callback': callback
    });
  }

  doHandle(ev)
  {
    for (var z = 0; z < this.eventRoutes.actions.length; z++)
    {
      if (this.eventRoutes.actions[z].eventTypeStr == ev.type)
      {
        if (this.eventRoutes.actions[z].queryStr !== null)
        {
          let nodes = document.querySelectorAll(this.eventRoutes.actions[z].queryStr);

          nodes.forEach((node) =>
          {
            if (node === ev.target)
            {
              this.eventRoutes.actions[z].callback(ev);
            }
          });
        }
        else
        {
          this.eventRoutes.actions[z].callback(ev);
        }
      }
    }
  }

}