export const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function) => {

  //Error si el archivo esta vacio
  if (!file) return cb(new Error('File is empty'), false)

  const fileExpression = file.mimetype.split('/')[1]
  const validExtensions = ['jpg', 'png', 'jpeg']

  if (validExtensions.includes(fileExpression)) {
    return cb(null, true)
  }

  cb(null, false)

}
