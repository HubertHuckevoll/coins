import { FormoBase } from '/frontschweine/formo/FormoBase.js';

export class FormoDualButton extends FormoBase
{
  constructor()
  {
    super();
    this.innerHTML = '<button value=""></button>';
  }

  connectedCallback()
  {
    this.querySelector('button').addEventListener('click', this.buttonPressed.bind(this));
    this.updateUI();
  }

  updateUI()
  {
    this.querySelector('button').innerHTML = this.caption;
    this.querySelector('button').value = this.value;
  }

  buttonPressed(ev)
  {
    this.value = (this.value == "1") ? "2" : "1";
    this.emit('formoDualButtonClick', {'caption': this.caption, 'value': this.value});

    ev.preventDefault();
    return false;
  }

  static get observedAttributes()
  {
    return ['value'];
  }

  // Reflect attribute changes to properties and UI
  attributeChangedCallback(name, oldValue, newValue)
  {
    this.updateUI();
  }

  // Reflect property changes to attributes
  get caption()
  {
    if (this.value == "1")
    {
      return this.getAttribute('caption1');
    }
    else
    {
      return this.getAttribute('caption2');
    }
  }

  get value()
  {
    return this.getAttribute('value');
  }

  set caption(newValue)
  {
    if (this.value == "1")
    {
      this.setAttribute('caption1', newValue);
    }
    else
    {
      this.setAttribute('caption2', newValue);
    }
  }

  set value(newValue)
  {
    this.setAttribute('value', newValue);
  }

}
