import { useEffect, useState } from 'react'
import Home from './pages/Home'
import API from './services/api'

export default function App() {

  const [pdfs, setPdfs] = useState([])

  const loadPdfs = async () => {

    try {

      const response = await API.get('/pdfs')

      setPdfs(response.data.pdfs)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    loadPdfs()

  }, [])

  return (
    <Home
      pdfs={pdfs}
      loadPdfs={loadPdfs}
    />
  )
}