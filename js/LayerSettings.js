
export default class LayerSettings {
  constructor(layer){
    this.layer = layer
    document
    .getElementById("layer-opacity")
    .addEventListener("calciteSliderChange", this.handleOpacityChange)
  }

  handleOpacityChange = (event) => {
    let propName = event.target.id;
    let propValue = event.target.value;

  if (propName && propValue != null) this.layer.opacity = 1 - propValue/100
  }
}