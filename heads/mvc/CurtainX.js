export class CurtainX
{
  hide(elem)
  {
    let nodes = this.normalizeTarget(elem);
    var promises = [];

    nodes.forEach((node) =>
    {
      let elemP = new Promise(function(resolve, reject)
      {
        let showClass = node.getAttribute('data-show');
        let hideClass = node.getAttribute('data-hide');

        //console.log('Hiding:' + node.tagName);
        node.ontransitionend = () =>
        {
          //console.log('Resolved Hide:' + node.tagName);
          resolve();
        }
        node.classList.remove(showClass);
        node.classList.add(hideClass);
      });

      promises.push(elemP);
    });

    return Promise.all(promises);
  }

  show(elem)
  {
    let nodes = this.normalizeTarget(elem);
    var promises = [];

    nodes.forEach((node) =>
    {
      let elemP = new Promise(function(resolve, reject)
      {
        let showClass = node.getAttribute('data-show');
        let hideClass = node.getAttribute('data-hide');

        //console.log('Showing:' + node.tagName);
        node.ontransitionend = () =>
        {
          //console.log('Resolved Show:' + node.tagName);
          resolve();
        }
        node.classList.remove(hideClass);
        node.classList.add(showClass);
      });

      promises.push(elemP);
    });

    return Promise.all(promises);
  }

  normalizeTarget(target)
  {
    // target should be a NodeList/Array
    // if target != string and != object we assume a NodeList/Array
    // and don't need to do anything
    let nodes = null;

    if (typeof(target) == 'string')
    {
      nodes = document.querySelectorAll(target);
    }
    else if (typeof(target) == 'object')
    {
      nodes = [target];
    }

    return nodes;
  }

  async wait(ms)
  {
    return new Promise((resolve, reject) =>
    {
      let timerID = setTimeout(resolve, ms);
    });
  }

}
