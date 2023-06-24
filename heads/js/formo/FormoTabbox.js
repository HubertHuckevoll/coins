import { FormoBase } from '/frontschweine/formo/FormoBase.js';

export class FormoTabbox extends FormoBase
{

  constructor()
  {
    super();
  }

  connectedCallback()
  {
    this.addEventListener('click', this.tabstripeClicked.bind(this));
  }

  static get observedAttributes()
  {
    return ['active'];
  }

  // switch the tab when the "active" attribut changes
  attributeChangedCallback(name, oldValue, newValue)
  {
    this.setActiveTab();
  }

  // we don't keep a list of internal properties, we just use the attributes
  get active()
  {
    return this.getAttribute('active');
  }

  set active(newVal)
  {
    this.setAttribute('active', newVal);
  }

  get tabbox()
  {
    return this.getAttribute('tabbox');
  }

  set tabbox(newVal)
  {
    this.setAttribute('tabbox', newVal);
  }

  tabstripeClicked(ev)
  {
    const tab = ev.target.closest('li');
    const tabId = tab.getAttribute('tab');
    this.active = tabId; // calls the setter, calls attributeChangedCallback, calls setActiveTab...
  }

  setActiveTab()
  {
    let tabbox = document.querySelector('.'+this.tabbox);
    let nodes = null;
    let oldTab = null;
    let newTab = null;

    // Tabstripe: Unset old "active tab"
    nodes = this.querySelectorAll("li");
    nodes.forEach((node) =>
    {
      if (node.classList.contains('formoTabStripeActive') === true)
      {
        oldTab = node;
        oldTab.classList.remove("formoTabStripeActive");
      }
    });

    // Tabbox: temporarily hide all tab cards
    nodes = tabbox.querySelectorAll(".formoTab");
    nodes.forEach((node) =>
    {
      node.style.display = 'none';
    });

    // Tabstripe: set new active tab; Tabbox: set tab card
    newTab = this.querySelector('[tab="'+this.active+'"]');
    newTab.classList.add('formoTabStripeActive');
    document.querySelector('.'+this.active).style.display = 'block';

    this.emit('formoTabChange', {'oldTab': oldTab, 'newTab': newTab});
  }

}