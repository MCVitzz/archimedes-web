import LeafletMap from './LeafletMap'

interface MapProps {
  center?: Coordinates
  markers?: Coordinates[]
}

export default function Map({ center, markers }: MapProps) {
  return <LeafletMap center={center} markers={markers} />
}
