import RasterFunction from 'https://js.arcgis.com/4.25/@arcgis/core/layers/support/RasterFunction.js'

export default class RasterFunctionTemplates {
  constructor(rasterLayer){
    this.rasterLayer = rasterLayer
    this.templates = [
      new RasterFunction({
        functionName: "Grayscale_Hillshade",
        variableName: "Raster"
      }),
      new RasterFunction({
        functionName: "Dynamic_Height",
        variableName: "Raster"
      }),
      new RasterFunction({
        functionName: "Slope_Degrees",
        variableName: "Raster"
      }),
      new RasterFunction({
        functionName: "Colormap",
        functionArguments: {
          colormap: [
            [1, 0, 128, 0, 0.1], //Green
            [2, 255, 0, 0] //Red
          ],
          raster: new RasterFunction({
            functionName: "Remap",
            functionArguments: {
              inputRanges: [0, 25, 25, 60, 60, 90],
              outputValues: [1, 2, 1],
              raster: new RasterFunction({
                functionName: "Slope_Degrees",
                variableName: "Raster"
              })
            }
          })
        },
        outputPixelType: "f32"
      })
    ]
    document
    .querySelectorAll('#function-list')
    .forEach(e => e.addEventListener('calciteListChange', this.handleFunctionChange))
  }

  handleFunctionChange = async (event) => {
    let selectedItems = await event.target.getSelectedItems()
    selectedItems = [...selectedItems]
    let functionIndex = parseInt(selectedItems[0][0])
    
    if (functionIndex >= this.templates.length) return
    this.rasterLayer.renderingRule = this.templates[functionIndex]
    let progressBar = document.getElementById('function-progress')
    progressBar.style.display = ''
  }
}