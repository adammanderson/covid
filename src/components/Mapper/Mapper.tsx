/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsx jsx */
import * as React from 'react';
import { jsx, Flex } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import Head from 'next/head';
import L, { LatLngTuple} from 'leaflet';
import * as topojson from 'topojson';
import engJson from '../../../map/topo11.json';
import { Corners } from '..';
import { MapperProps } from '.';

const Mapper: React.FC<MapperProps> = ({
  data,
}) => {
  const breakpoint = useBreakpointIndex();
  const isMobile = breakpoint === 0;

  React.useEffect(() => {
    const position: LatLngTuple = [(isMobile ? 53 : 54.5), -2];
    const map = L.map('map-container', { dragging: !L.Browser.mobile });
    const bgLayer = L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19,
    });

    map.setView(position, 6);
    bgLayer.addTo(map);

    // extend Leaflet to create a GeoJSON layer from a TopoJSON file
    (L as any).TopoJSON = L.GeoJSON.extend({
      addData: function addData(tdata) {
        let geojson;

        if (tdata.type === 'Topology') {
          Object.keys(tdata.objects).map((key): void => {
            // eslint-disable-next-line no-prototype-builtins
            if (tdata.objects.hasOwnProperty(key)) {
              geojson = topojson.feature(tdata, tdata.objects[key]);
              L.GeoJSON.prototype.addData.call(this, geojson);
            }
            return this;
          });
          return this;
        }
        L.GeoJSON.prototype.addData.call(this, tdata);
        return this;
      },
    });

    (L as any).topoJson = (tdata, options) => new (L as any).TopoJSON(tdata, options);

    const geojson = (L as any).topoJson(null, {
      style: (feature) => {
        const featureLabel = feature.properties.AUTH;
        const featureData = data.find((auth) => featureLabel.includes(auth.label));
        const confirmedPerc = featureData && (featureData.confirmed / 15);
        return {
          color: 'rgba(0, 0, 0, 0.4)',
          opacity: 1,
          weight: 1,
          fillColor: confirmedPerc ? `rgba(255, 0, 0, ${confirmedPerc})` : 'transparent',
          fillOpacity: 0.8,
        };
      },
      onEachFeature: (feature, layer) => {
        const featureLabel = feature.properties.AUTH;
        const featureData = data.find((auth) => featureLabel.includes(auth.label));
        layer.bindPopup(`<p>${feature.properties.AUTH}</p><span>${featureData ? featureData.confirmed : 'No data'}</span>`);
      },
    }).addTo(map);

    geojson.addData(engJson);

    map.on('popupopen', (e) => {
      (window as any).gtag('event', 'click', {
        event_category: 'mapper',
        event_label: e.target._popup._source.feature.properties.NUTS112NM,
      });
    });

    return () => {
      if (map && map.remove) {
        map.off();
        map.remove();
      }
    };
  }, [isMobile]);

  return (
    <Flex
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        flexBasis: ['480px', 'auto'],
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
