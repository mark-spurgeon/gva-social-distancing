import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';

export default {
  routes: {
    base: new Style({ fill: new Fill({ color: '#f0f0f0' })})
  },
  routesInterventions: {
    base: new Style({ fill: new Fill({ color: '#f0f0f0' })}),
    velo: new Style({ 
      fill: new Fill({ color: '#ffeda0' }),
      stroke: new Stroke({ color: '#feb24c', width: 1}),
    }),
    parking: new Style({ 
      fill: new Fill({ color: '#A2D0FF'}),
      stroke: new Stroke({ color: 'white', width: 1}),
    }),
    pieton: new Style({ 
      fill: new Fill({ color: '#B9E89B'}),
    }),
  },
  lac: new Style({
    fill: new Fill({color: 'rgb(180, 210, 255)'}),
  }),
  batiment: new Style({
    fill: new Fill({color: 'rgba(255, 255, 255, 0.9)'}),
    stroke: new Stroke({color: '#969696', width: 1})
  }),
  commerce: {
    nourriture: [
      new Style({
        image: new CircleStyle({
          radius: 6, 
          fill: new Fill({color: 'white'})
        })
      }),
      new Style({
        image: new CircleStyle({
          radius: 3, 
          fill: new Fill({color: '#74a9cf'}),
          stroke: new Stroke({color: '#5C87A5', width: 1})
        })
      }),
    ],
    pharmacie: [ 
      new Style({
        image: new CircleStyle({
          radius: 6, 
          fill: new Fill({color: 'white'}),
        }),
      }),
      new Style({
        image: new CircleStyle({
          radius: 3, 
          fill: new Fill({color: '#addd8e'}),
          stroke: new Stroke({color: '#8AB071', width: 1}),
        }),
      })
    ]
  },
  ppb: {
    nodata: new Style({ fill: new Fill({ color: 'white'})}),
    verylittle: new Style({ fill: new Fill({ color: '#a50f15'})}),
    little: new Style({ fill: new Fill({ color: '#CB181D'})}),
    more: new Style({ fill: new Fill({ color: '#FC9272'})}),
    enough: new Style({ fill: new Fill({ color: '#fcae91'})}),
    morethanenough: new Style({fill: new Fill({ color: '#fee5d9'})}),
    waymorethanenough: new Style({fill: new Fill({ color: 'white'})}),
    background: new Style({zIndex: -1, stroke: new Stroke({color: 'white', width: 2})}),
  }
}