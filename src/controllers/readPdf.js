const pdfParser = require('pdf-parser')
const { UPLOAD_PATH } = process.env

const uploadPdf = file => {
  if (file) {
    const uploadPath = `${UPLOAD_PATH}${file.name}`
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
    }, 6000)
    if (isUploaded) {
      const pdfPATH = `${UPLOAD_PATH}${req.files.pdf.name}`
      setTimeout(() => {
        pdfParser.pdf2json(pdfPATH, (error, pdf) => {
          if (error != null) {
            res.status(500).send({ message: error })
          } else {
            console.log(pdf)
            res.status(200).send(pdf)
          }
        })
      }, 6000)
    } else {
      res.status(500).send({ message: 'Internal Error' })
    }
  }
}

module.exports = readPdf
