const pdfParser = require('pdf-parser')
const fs = require('fs')

const uploadPdf = file => {
  if (file) {
    const uploadPath = `/home/nutz/proyectos/readPdfUtility/src/uploads/${file.name}`
    file.mv(uploadPath, err => {
      if (err) return false
      return true
    })
  }
  return false
}

const fileFilter = file => {
  if (file.mimetype === 'application/pdf') {
    return true
  }
  return false
}

const readPdf = async (req, res) => {
  const correctFormat = fileFilter(req.files.pdf)
  if (correctFormat) {
    const isUploaded = setTimeout(async () => {
      const uploaded = await uploadPdf(req.files.pdf)
      return uploaded
    }, 1000)
    if (isUploaded) {
      const pdfPATH = `./src/uploads/${req.files.pdf.name}`
      const dataBuffer = fs.readFileSync(pdfPATH)
      if (dataBuffer) {
        pdfParser.pdf2json(pdfPATH, (error, pdf) => {
          if (error != null) {
            res.status(500).send({ message: error })
          } else {
            console.log(pdf)
            res.status(200).send(pdf)
          }
        })
      }
    } else {
      res.status(500).send({ message: 'Internal Error' })
    }
  }
}

module.exports = readPdf
