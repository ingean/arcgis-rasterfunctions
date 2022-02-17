let LAYER

document
  .getElementById("layer-opacity")
  .addEventListener("calciteSliderChange", updateLayerOpacity)

function updateLayerOpacity(event) {
  
  let propName = event.target.id;
  let propValue = event.target.value;

  if (propName && propValue != null) LAYER.opacity = 1 - propValue/100
  
}

export default class LayerSettings {
  constructor(layer){
    LAYER = layer
  }
}