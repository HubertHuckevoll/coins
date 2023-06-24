import { FormoBase } from '/frontschweine/formo/FormoBase.js';

export class FormoSlider extends FormoBase
{
  constructor()
  {
    super();

    this.innerHTML = '<span class="formoSliderLabel"></span>'+
                     '<div class="formoSliderWrapper">'+
                       '<button class="formoSliderDec">-</button>'+
                       '<input class="formoSliderRange" type="range" max="" min="" step="" value="">'+
                       '<input class="formoSliderMirror" type="number" max="" min="" step="" value="">'+
                       '<button class="formoSliderInc">+</button>'+
                     '</div>';
  }

  connectedCallback()
  {
    this.querySelector('.formoSliderRange').addEventListener('input', this.valueChanged.bind(this));
    this.querySelector('.formoSliderMirror').addEventListener('change', this.valueChanged.bind(this));

    this.querySelector('.formoSliderDec').addEventListener('click', this.decButtonPressed.bind(this));
    this.querySelector('.formoSliderInc').addEventListener('click', this.incButtonPressed.bind(this));

    this.updateUI();
  }

  updateUI()
  {
    this.querySelector('.formoSliderLabel').innerHTML = this.label;

    this.querySelector('.formoSliderRange').setAttribute('max', this.max);
    this.querySelector('.formoSliderRange').setAttribute('min', this.min);
    this.querySelector('.formoSliderRange').setAttribute('step', this.step);
    this.querySelector('.formoSliderRange').setAttribute('value', this.value);
    this.querySelector('.formoSliderRange').value = this.value;

    this.querySelector('.formoSliderMirror').setAttribute('max', this.max);
    this.querySelector('.formoSliderMirror').setAttribute('min', this.min);
    this.querySelector('.formoSliderMirror').setAttribute('step', this.step);
    this.querySelector('.formoSliderMirror').setAttribute('value', this.value);
    this.querySelector('.formoSliderMirror').value = this.value;
  }

  boundsCheck(val)
  {
    val = (val < this.min) ? this.min : val;
    val = (val > this.max) ? this.max : val;

    return val;
  }

  /*
    calling "this.value = val" invokes the setter,
    which calls setAttribute,
    which calls attributeChangedCallback,
    which calls updateUI,
    which distributes our changes to all UI elements,
    which is a mess...
  */
  valueChanged(ev)
  {
    let val = parseInt(ev.target.value);
    val = this.boundsCheck(val);
    this.value = val;
    this.emit('formoSliderChange', {'value': val});

    ev.preventDefault();
    ev.stopPropagation();
    return false;
  }

  decButtonPressed(ev)
  {
    let val = this.value - this.step;
    val = this.boundsCheck(val);
    this.value = val;
    this.emit('formoSliderChange', {'value': val});

    ev.preventDefault();
    return false;
  }

  incButtonPressed(ev)
  {
    var val = this.value + this.step;
    val = this.boundsCheck(val);
    this.value = val;
    this.emit('formoSliderChange', {'value': val});

    ev.preventDefault();
    return false;
  }

  static get observedAttributes()
  {
    return ['label', 'value', 'step', 'max', 'min'];
  }

  // Reflect attribute changes to UI
  attributeChangedCallback(name, oldValue, newValue)
  {
    this.updateUI();
  }

  // Reflect property changes to attributes
  get label()
  {
    return this.getAttribute('label');
  }

  get value()
  {
    return parseInt(this.getAttribute('value'));
  }

  get step()
  {
    return parseInt(this.getAttribute('step'));
  }

  get min()
  {
    return parseInt(this.getAttribute('min'));
  }

  get max()
  {
    return parseInt(this.getAttribute('max'));
  }

  set label(newValue)
  {
    this.setAttribute('label', newValue);
  }

  set value(newValue)
  {
    this.setAttribute('value', newValue);
  }

  set step(newValue)
  {
    this.setAttribute('step', newValue);
  }

  set min(newValue)
  {
    this.setAttribute('min', newValue);
  }

  set max(newValue)
  {
    this.setAttribute('max', newValue);
  }

}