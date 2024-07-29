import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

type Data = {
    success: boolean;
    message: string;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = async (
    req: NextApiRequest,
    saveLocally: boolean,
    id: string
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), `${'/public/' + id}`);
        options.filename = (_name, _ext, path, _form) => {
            return '_' + path.originalFilename;
        };
    }

    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id = req.query.id as string;

    try {
        await fs.readdir(path.join(process.cwd(), '/public/' + id));
    } catch (err) {
        await fs.mkdir(path.join(process.cwd(), '/public/' + id));
    }

    const { fields, files } = await readFile(req, true, id);

    res.status(200).json({ success: true, message: 'Images uploaded successfully!' });
}