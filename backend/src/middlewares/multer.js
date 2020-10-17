import path from 'path';
import multer from 'multer';

const baseURL = process.env.BASE_DOMAIN || '';
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: (req, file, cb) => {
        const baseName = path.basename(file.originalname)
        const extension = path.extname(file.originalname);
        const actualDate = new Date().getTime();
        const fileFullName = `${baseName}_${actualDate}${extension}`;
        req.body.upload = {
            fileUrl: `${baseURL}/uploads/${fileFullName}`,
            ext: extension,
        }
        cb(null, fileFullName)
    }
});

export default multer({ storage });