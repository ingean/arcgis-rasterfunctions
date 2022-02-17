import RasterFunction from 'https://js.arcgis.com/4.22/@arcgis/core/layers/support/RasterFunction.js'

let layer
const slopeRFT = new RasterFunction({
  functionName: "Slope_Degrees",
  variableName: "Raster"
})
const heightRFT = new RasterFunction({
  functionName: "Dynamic_Height",
  variableName: "Raster"
})
const hillshadeRFT = new RasterFunction({
  functionName: "Grayscale_Hillshade",
  variableName: "Raster"
})

const steepRFT = new RasterFunction({
  functionName: "Remap",
  functionArguments: {
    inputRanges: [0, 25, 25, 60, 60, 90],
    outputValues: [1, 2, 1],
    raster: slopeRFT
  }
})

const steepColorRFT = new RasterFunction({
  functionName: "Colormap",
  functionArguments: {
    colormap: [
      [1, 0, 128, 0, 0.1], //Green
      [2, 255, 0, 0] //Red
    ],
    raster: steepRFT
  },
  outputPixelType: "f32"
})

let functionTemplates = [
  hillshadeRFT,
  heightRFT,
  slopeRFT,
  steepColorRFT
]

document
  .querySelectorAll('#function-list')
  .forEach(e => e.addEventListener('calciteListChange', changeFunction))

async function changeFunction(event) {
  let selectedItems = await event.target.getSelectedItems()
  selectedItems = [...selectedItems]
  let functionIndex = parseInt(selectedItems[0][0])
  
  if (functionIndex >= functionTemplates.length) return
  layer.renderingRule = functionTemplates[functionIndex]; 
}

export default class ChangeRasterFunction {
  constructor(rasterLayer){
    this.layer = rasterLayer
    layer = rasterLayer
  }
}