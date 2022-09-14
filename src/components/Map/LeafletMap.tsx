import L, { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
interface LeafletMapProps {
  center?: Coordinates
  markers?: Coordinates[]
}
const LeafletMap = ({ center, markers }: LeafletMapProps) => {
  const divider = 10
  const RegularMarker = L.icon({
    iconUrl: 'pin.svg',
    iconSize: [275 / divider, 396 / divider],
    iconAnchor: [197 / divider, 395 / divider],
    popupAnchor: [197 / divider, 0 / divider],
    className: 'regular-marker',
  })
  const SpecialMarker = L.icon({
    iconUrl: 'pin-special.svg',
    iconSize: [275 / divider, 396 / divider],
    iconAnchor: [197 / divider, 395 / divider],
    popupAnchor: [197 / -divider, 395 / -divider],
    className: 'special-marker',
  })

  return (
    <MapContainer
      center={center ? [center.latitude, center.longitude] : undefined}
      zoom={13}
      zoomControl={false}
      style={{ height: '100vh', width: '100%' }}
    >
      <MapController center={center} markers={markers} />
      <TileLayer
        url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_KEY}`}
      />
      {center && (
        <Marker
          icon={SpecialMarker}
          position={[center?.latitude ?? 0, center?.longitude ?? 0]}
        >
          <Popup>{center.latitude + ', ' + center.longitude}</Popup>
        </Marker>
      )}
      {markers &&
        markers.length !== 0 &&
        markers.map((marker, i) => (
          <Marker
            icon={RegularMarker}
            key={i}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>{marker.latitude + ', ' + marker.longitude}</Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}

const MapController = ({
  center,
  markers,
}: {
  center?: Coordinates
  markers?: Coordinates[]
}) => {
  const map = useMap()
  useEffect(() => {
    console.log({ center, markers })
    if (!center || !markers) return
    const markersLatLng = markers.map(
      (marker) => new LatLng(marker.latitude, marker.longitude),
    )
    const g = L.latLngBounds([
      ...markersLatLng,
      new LatLng(center.latitude, center.longitude),
    ])
    map.fitBounds(g)
  }, [center, markers, map])
  return null
}

export default LeafletMap
