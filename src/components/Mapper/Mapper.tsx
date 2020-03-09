/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsx jsx */
import * as React from 'react';
import { jsx, Flex } from 'theme-ui';
import Head from 'next/head';
import L from 'leaflet';
import * as topojson from 'topojson';
import engJson from '../../../map/topo_nuts1.json';
import { Corners } from '..';
import { MapperProps } from '.';

const Mapper: React.FC<MapperProps> = ({
  regionData,
}) => {
  React.useEffect(() => {
    const map = L.map('map-container', { dragging: !L.Browser.mobile });
    const bgLayer = L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19,
    });

    map.setView([54.505, -2.09], 6);
    bgLayer.addTo(map);

    // extend Leaflet to create a GeoJSON layer from a TopoJSON file
    (L as any).TopoJSON = L.GeoJSON.extend({
      addData: function addData(data) {
        let geojson;

        if (data.type === 'Topology') {
          Object.keys(data.objects).map((key): void => {
            // eslint-disable-next-line no-prototype-builtins
            if (data.objects.hasOwnProperty(key)) {
              geojson = topojson.feature(data, data.objects[key]);
              L.GeoJSON.prototype.addData.call(this, geojson);
            }
            return this;
          });
          return this;
        }
        L.GeoJSON.prototype.addData.call(this, data);
        return this;
      },
    });

    (L as any).topoJson = (data, options) => new (L as any).TopoJSON(data, options);

    const geojson = (L as any).topoJson(null, {
      style: (feature) => {
        const featureLabel = feature.properties.NUTS112NM;
        const featureData = regionData.find((region) => featureLabel.includes(region.label));
        const confirmedPerc = featureData?.confirmed / 100;
        return {
          color: '#000',
          opacity: 1,
          weight: 1,
          fillColor: `rgba(255, 0, 0, ${confirmedPerc }`,
          fillOpacity: 0.8,
        };
      },
      onEachFeature: (feature, layer) => {
        const featureLabel = feature.properties.NUTS112NM;
        const featureData = regionData.find((region) => featureLabel.includes(region.label));
        layer.bindPopup(`<p>${feature.properties.NUTS112NM}</p><span>${featureData?.confirmed}</span>`);
      },
    }).addTo(map);

    geojson.addData(engJson);
  }, []);

  return (
    <Flex
      sx={{
        flex: 1,
        order: [1, 2],
        display: 'flex',
        flexDirection: 'column',
        flexBasis: ['580px', 'auto'],
        position: 'relative',
        m: 10,
      }}
    >
      <Corners />
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
      </Head>
      <div
        id="map-container"
        sx={{
          width: '100%',
          flex: 1,
          '.leaflet-popup-content-wrapper': {
            bg: 'background',
            border: 0,
            borderRadius: 0,
            '.leaflet-popup-content': {
              m: 2,
              mr: 4,
              color: 'text',
              textTransform: 'uppercase',
              fontFamily: 'body',
              fontSize: 1,
              '>p': {
                m: 0,
              },
              '>span': {
                fontSize: 3,
              },
            },
          },
          '.leaflet-popup-tip': {
            bg: 'background',
          },
        }}
      />
    </Flex>
  );
};

export default Mapper;
