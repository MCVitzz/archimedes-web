import { useState, useEffect } from 'react'

export default function useGeolocation(options?: PositionOptions) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<GeolocationPositionError>()
  const [data, setData] = useState<GeolocationCoordinates>()

  useEffect(() => {
    const successHandler: PositionCallback = (e) => {
      setLoading(false)
      setError(undefined)
      setData(e.coords)
    }
    const errorHandler: PositionErrorCallback = (e) => {
      setError(e)
      setLoading(false)
    }
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options,
    )
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, data }
}
