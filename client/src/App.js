import React, { useEffect, useState } from 'react'

const App = () => {

  const [backendData, setBackendData ] = useState([{}])

  useEffect(() => {
    fetch("/reservations").then(
      response => response.json()
    ).then(
      data => { setBackendData(data) }
    )
  }, [])

  return (
    <div>
      Welcome
    </div>
  )
}

export default App