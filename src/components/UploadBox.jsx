import { useState } from 'react'

import API from '../services/api'

export default function UploadBox() {

  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)

  const uploadPDF = async () => {

    if (!file) {
      alert('Please select a PDF')
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    try {

      setLoading(true)

      const response = await API.post(
        '/upload-pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      alert(response.data.message)

    } 
    catch (error) {

      console.log(error)

      alert('Upload Failed')

    }

    setLoading(false)
  }

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upload PDF
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={uploadPDF}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        {
          loading
            ? 'Uploading...'
            : 'Upload PDF'
        }
      </button>

    </div>
  )
}