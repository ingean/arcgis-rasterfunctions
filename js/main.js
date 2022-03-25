import Map from 'https://js.arcgis.com/4.22/@arcgis/core/Map.js'
import MapView from 'https://js.arcgis.com/4.22/@arcgis/core/views/MapView.js'
import Basemap from 'https://js.arcgis.com/4.22/@arcgis/core/Basemap.js'
import VectorTileLayer from 'https://js.arcgis.com/4.22/@arcgis/core/layers/VectorTileLayer.js'
import Extent from 'https://js.arcgis.com/4.22/@arcgis/core/geometry/Extent.js'
import ImageryLayer from 'https://js.arcgis.com/4.22/@arcgis/core/layers/ImageryLayer.js'
import RasterFunction from 'https://js.arcgis.com/4.22/@arcgis/core/layers/support/RasterFunction.js'
import esriConfig from 'https://js.arcgis.com/4.22/@arcgis/core/config.js'
import ActionBar from './ActionBar.js'
import RasterFunctionTemplates from './RasterFunctionTemplates.js'
import LayerSettings from './LayerSettings.js'

//esriConfig.apiKey = 'AAPKa9498736c8d64cfdb88cd0abbde4efcb-bZOw_j3NJA_zxvWbyNiCSB0NSwvP58ngMuXuhLHDU5YX_W9LrGy3fRhR01lMXbg' // DevInge account

//Shared publicly from AGOL
const urlGeomapDTM = 'https://utility.arcgis.com/usrsvcs/servers/781a5b76174e40d9a1e7f6f7400611fb/rest/services/Geomap_UTM33_EUREF89/GeomapDTM/ImageServer';
//const urlGeomapDTM = 'https://utility.arcgis.com/usrsvcs/servers/09c9d7894d014485b92ad494eeec991b/rest/services/Geomap_UTM33_EUREF89/GeomapDTM/ImageServer' // DevInge account

const lightMap = new Basemap({
  baseLayers: [
    new VectorTileLayer({
      url: 'https://services.geodataonline.no/arcgis/rest/services/GeocacheVector/GeocacheGraatone/VectorTileServer/resources/styles/root.json'
    })
  ],
  title: 'Bakgrunnskart (Lys)'
})

const imagePopupTemplate = {
  title: "Terrengmodell over Norge",
  content:
    "Visning: <b>{Raster.ServicePixelValue} </b>" +
    "<br>Høyde over havet: <b>{Raster.ItemPixelValue}m </b>"
};

const layer = new ImageryLayer({
  url: urlGeomapDTM,
  renderingRule:  new RasterFunction({
    functionName: "Grayscale_Hillshade",
    variableName: "Raster"
  }),
  popupTemplate: imagePopupTemplate,
  opacity: 0.5,
  blendMode: 'multiply'
})
    
const map = new Map({ 
  basemap: lightMap,
  layers: [layer]
})

const view = new MapView({
  map: map,
  extent: new Extent({
    xmin: 120000,
    ymin: 6820000,
    xmax: 150000,
    ymax: 6860000,
    spatialReference: {
      wkid: 25833
    }
  }),
  container: "viewDiv",
  padding: {
    left: 49
  }
})

const actionBar = new ActionBar(view, 'functions')
const changeRasterFunction = new RasterFunctionTemplates(layer)
const imageLayerSettings = new LayerSettings(layer)

document.querySelector("#header-title").textContent = 'Demo av rasterfunksjoner i ArcGIS'
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false

document
.querySelector('#blendmode-picklist')
.addEventListener('calciteListChange', async event => {
  let selectedItems = await event.target.getSelectedItems()
  selectedItems = [...selectedItems]
  layer.blendMode = selectedItems[0][0]
})


