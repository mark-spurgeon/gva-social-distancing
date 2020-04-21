import 'ol/ol.css';
import { Map, View } from 'ol';
import { Vector as VectorLayer} from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import fixUtf8 from 'fix-utf8';

import styles from './styles'

const map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat([6.15, 46.206]),
    zoom: 16,
    minZoom: 13.6,
  })
});

fetch('data/lac-rivieres-simple.json').then(resp => resp.json()).then(data => {
  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
      }),
      zIndex: 10,
      style: styles.lac
    })
  )
});

fetch('data/batiments-simple.json').then(resp => resp.json()).then(data => {
  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
      }),
      zIndex: 100,
      minZoom: 15,
      style: styles.batiment
    })
  )
});


let routesLayer;
fetch('data/routes-web-simple.json').then(resp => resp.json()).then(data => {
  routesLayer = new VectorLayer({
    source: new VectorSource({
      features: (new GeoJSON()).readFeatures(data)
    }),
    zIndex: 80,
    style: styles.routes.base
  })
  map.addLayer(routesLayer)
});

let dataLayer;
fetch('data/ppb-web-simple.json').then(resp => resp.json()).then(data => {
  dataLayer = new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
      }),
      zIndex: 90,
      style: function(feature) {
        const ppb = feature.get('P_REL');
        var espacesStyle = styles.ppb.nodata;
        if (ppb < -5) {
          espacesStyle = styles.ppb.verylittle;
        }
        if (ppb >= -5 && ppb < 0) {
          espacesStyle = styles.ppb.little;
        }
        if (ppb >= 0 && ppb < 5) {
          espacesStyle = styles.ppb.more;
        }
        if (ppb >= 5 && ppb < 10) {
          espacesStyle = styles.ppb.enough;
        }
        if (ppb >= 10 && ppb < 15) {
          espacesStyle = styles.ppb.morethanenough;
        }
        if (ppb >= 15) {
          espacesStyle = styles.ppb.waymorethanenough;
        }
        return [ styles.ppb.background, espacesStyle ];
      }
    })

  map.addLayer(dataLayer);
});


fetch('data/commerces-simple.json').then(resp => resp.json()).then(data => {
  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
      }),
      minZoom: 15,
      zIndex: 110,
      style: function(feature) {
        var type = feature.get('COMMERCE');
        if (type === 'nourriture') {
          return styles.commerce.nourriture     
        } else if (type === 'pharmacie') {
          return styles.commerce.pharmacie     
        } else {
          return null
        }
      }
    })
  )
});


/**
 * ZOOM Interactions
 */
var zoom = map.getView().getZoom();
map.on('moveend', function(e) {
  var newZoom = map.getView().getZoom();
  if (zoom != newZoom) {
    zoom = newZoom;
    
    if (zoom >= 16 && zoom < 18.5) {
      fetch('data/routes-web.json').then(resp => resp.json()).then(data => {
        if (routesLayer.featuresType !== 'complete-zoomed') {
          let routesSource = routesLayer.getSource()
          routesSource.clear()
          routesSource.addFeatures((new GeoJSON()).readFeatures(data))
          routesLayer.featuresType = 'complete-zoomed'
        }
      })

      fetch('data/ppb-web.json').then(resp => resp.json()).then(data => {
        if (dataLayer.featuresType !== 'complete-zoomed') {
          let dataSource = dataLayer.getSource()
          dataSource.clear()
          dataSource.addFeatures((new GeoJSON()).readFeatures(data))
          dataLayer.featuresType = 'complete-zoomed'
        }
      })
    } else if (zoom >= 18.5) {
      fetch('data/routes.json').then(resp => resp.json()).then(data => {
        if (routesLayer.featuresType !== 'complete-veryzoomed') {
          let routesSource = routesLayer.getSource()
          routesSource.clear()
          routesSource.addFeatures((new GeoJSON()).readFeatures(data))
          routesLayer.featuresType = 'complete-veryzoomed'
        }
      })

      fetch('data/ppb.json').then(resp => resp.json()).then(data => {
        if (dataLayer.featuresType !== 'complete-veryzoomed') {
          let dataSource = dataLayer.getSource()
          dataSource.clear()
          dataSource.addFeatures((new GeoJSON()).readFeatures(data))
          dataLayer.featuresType = 'complete-veryzoomed'
        }
      })
    } else {
      fetch('data/routes-web-simple.json').then(resp => resp.json()).then(data => {
        if (routesLayer.featuresType !== 'complete-dezoomed') {
          let routesSource = routesLayer.getSource()
          routesSource.clear()
          routesSource.addFeatures((new GeoJSON()).readFeatures(data))
          routesLayer.featuresType = 'complete-dezoomed'
        }
      })

      fetch('data/ppb-web-simple.json').then(resp => resp.json()).then(data => {
        if (dataLayer.featuresType !== 'complete-dezoomed') {
          let dataSource = dataLayer.getSource()
          dataSource.clear()
          dataSource.addFeatures((new GeoJSON()).readFeatures(data))
          dataLayer.featuresType = 'complete-dezoomed'
        }
      })
    }


    if (zoom >= 16) {
      document.getElementById('legend-details').classList.add('open');
      document.getElementById('legend-interventions').classList.add('open')
    } if (zoom >= 15 && zoom < 16) {
      document.getElementById('legend-details').classList.add('open');
      document.getElementById('legend-interventions').classList.remove('open')
    } else if (zoom < 15) {
      document.getElementById('legend-details').classList.remove('open');
      document.getElementById('legend-interventions').classList.remove('open')
    }


    if (zoom > 16) {
      routesLayer.setStyle(function(feature) { 
        var intervention = feature.get('INTERVENTI');
        var iStyle = styles.routesInterventions.base
        
        if (intervention === 'parking') {
          iStyle = styles.routesInterventions.parking
        } else if (intervention === 'velo') {
          iStyle = styles.routesInterventions.velo
        } else if (intervention === 'pieton') {
          iStyle = styles.routesInterventions.pieton
        } else if (intervention === 'demi-pieton') {
          iStyle = styles.routesInterventions.pieton
        } 

        return iStyle
      })
    } else {
      routesLayer.setStyle(styles.routes.base)
    }

  }
});

/**
 * HOVER Interactions
 * 
 */

map.on('pointermove', function(e) {
  var selected = null;
  if (selected !== null) {
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function(f) {
    selected = f
    return true;
  });

  if (selected) {
    var selection;
    var details;
    if (selected.get('INTERVENTI')) {
      selection = selected.get('INTERVENTI')

      details = selected.get('PK_INTER') || '';
      if (selection === 'no') {
        document.getElementById('legend-message').innerHTML = '🚗';
      } else if (selection === 'parking') {
        document.getElementById('legend-message').innerHTML = '🅿️';
      } else {
        document.getElementById('legend-message').innerHTML = '🚧 ' + fixUtf8(details);
      }
    } else if (selected.get('P_REL')) {
      document.getElementById('legend-message').innerHTML = '🚶🏿 Queuing places : available (<b>' + (selected.get('PLACES') / 2)  + '</b>) - need (<b>' + selected.get('P_BESOIN_s') + '</b>) = <b>' + selected.get('P_REL') + '</b>';
    } else if (selected.get('NOM')) {
      document.getElementById('legend-message').innerHTML = '<b>' + fixUtf8(selected.get('NOM')) + '</b>';
    } else if (selected.get('EGID')) {
      document.getElementById('legend-message').innerHTML = '🏢';
    }
  } else {
    document.getElementById('legend-message').innerHTML = 'Hover for more info';
  }
});