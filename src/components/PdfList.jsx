import API from '../services/api'

export default function PdfList({ pdfs, loadPdfs }) {

  const deletePdf = async (filename) => {

    await API.delete(`/delete-pdf/${filename}`)

    loadPdfs()
  }

  return (
    <div className="space-y-2">

      {
        pdfs.map((pdf, index) => (

          <div
            key={index}
            className="bg-white border rounded-xl p-3 flex justify-between items-center"
          >
            <p className="text-sm truncate">
              {pdf}
            </p>

            <button
              onClick={() => deletePdf(pdf)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))
      }

    </div>
  )
}