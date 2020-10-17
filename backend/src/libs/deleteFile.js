import fs from 'fs-extra';

export default async(path) => {
    await fs.unlink(path);
}