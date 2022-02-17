import Map from 'https://js.arcgis.com/4.22/@arcgis/core/Map.js'
import MapView from 'https://js.arcgis.com/4.22/@arcgis/core/views/MapView.js'
import Extent from 'https://js.arcgis.com/4.22/@arcgis/core/geometry/Extent.js'
import Basemap from 'https://js.arcgis.com/4.22/@arcgis/core/Basemap.js'
import TileLayer from 'https://js.arcgis.com/4.22/@arcgis/core/layers/TileLayer.js'
import ImageryLayer from 'https://js.arcgis.com/4.22/@arcgis/core/layers/ImageryLayer.js'
import RasterFunction from 'https://js.arcgis.com/4.22/@arcgis/core/layers/support/RasterFunction.js'
import Slider from 'https://js.arcgis.com/4.22/@arcgis/core/widgets/Slider.js'
import esriConfig from 'https://js.arcgis.com/4.22/@arcgis/core/config.js'
import ActionBar from './ActionBar.js'
import ChangeRasterFunction from './ChangeRasterFunction.js'
import LayerSettings from './LayerSettings.js'

esriConfig.apiKey = 'AAPKf28ba4fdd1e945a1be5f8d43dbd650eaMjyiDjdFXaCPZzo5erYJ7Xc7XKvBlbJZIPvNu0O2zwfeFiGhqoBvtQwJUZ1DMXIL'


//Shared publicly from AGOL
const urlGeomapDTM = 'https://utility.arcgis.com/usrsvcs/servers/781a5b76174e40d9a1e7f6f7400611fb/rest/services/Geomap_UTM33_EUREF89/GeomapDTM/ImageServer';
const urlGeocacheGray = 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheGraatone/MapServer';

const tileLayer = new TileLayer({
  url: urlGeocacheGray
});

const basemap = new Basemap({
  baseLayers: [tileLayer],
  title: "Geodata Bakgrunnskart",
  id: "GeocacheLandskap"
});

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
  opacity: 0.7,
});
    
const map = new Map({ 
  basemap: basemap,
  layers:[layer] 
});

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
const changeRasterFunction = new ChangeRasterFunction(layer)
const imageLayerSettings = new LayerSettings(layer)

document.querySelector("#header-title").textContent = 'Demo av rasterfunksjoner i ArcGIS'
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false


