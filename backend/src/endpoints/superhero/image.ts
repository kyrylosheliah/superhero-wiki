import { Request, Response } from "express";
import { TMapEndpoints } from "../";
import fs, { globSync } from "node:fs";
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import path from "node:path";

const CWD = process.cwd();
const IMAGES = path.join(CWD, "../images");
const COVERS = path.join(CWD, "../covers");

export const mapSuperheroImageEndpoints: TMapEndpoints = (app) => {

  app.get('/superhero/image/all/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const imageFiles = globSync(`../images/${id}*`);
      const coverFiles = globSync(`../covers/${id}_cover*`);
      const images = imageFiles.map(file =>
        file.slice(2).replace(/\\/g, "/").replace("//", "/")
      );
      const cover = coverFiles.length
        ? coverFiles[0].slice(2).replace(/\\/g, "/").replace("//", "/")
        : undefined;
      res.status(302).json({ images, cover });
    } catch (err) {
      console.error('Error fetching images or covers', err);
      res.status(500).json({ error: 'Server error while retrieving files.' });
    }
  });

  app.delete('/superhero/image', async (req: Request, res: Response) => {
    const { filename } = req.body;
    //const fileSuperheroId = filename.split('_')[0];
    const filepath = path.join(CWD, "..", filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(204).send("No content");
    } else {
      res.status(404).json({ error: 'Not found'});
    }
  });

  app.delete('/superhero/cover', async (req: Request, res: Response) => {
    const { filename } = req.body;
    //const fileSuperheroId = filename.split('_')[0];
    const filepath = path.join(CWD, "..", filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(204).send("No content");
    } else {
      res.status(404).json({ error: 'Not found'});
    }
  });

  app.post('/superhero/image', async (req: Request, res: Response) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) {
        //next(err);
        console.error("Failed to save a file:", err);
        res.status(500).send("Error: file not saved");
        return;
      }
      const file = files.file![0];
      const id = fields.id![0];
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const generatedFilename = generateUniqueImageFilename(
        id, file.originalFilename || ".jpg", IMAGES
      );
      const newFilepath = path.join(IMAGES, generatedFilename);
      fs.rename(file.filepath, newFilepath, () => {
        res.status(201).json({ url: `/images/${generatedFilename}` });
      });
    });
  });

  app.post('/superhero/cover', async (req: Request, res: Response) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) {
        //next(err);
        console.error("Failed to save a file:", err);
        res.status(500).send("Error: file not saved");
        return;
      }
      const file = files.file![0];
      const id = fields.id![0];
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const generatedFilename = getCoverFilename(
        id, file.originalFilename || ".jpg"
      );
      const newFilepath = path.join(COVERS, generatedFilename);
      fs.rename(file.filepath, newFilepath, () => {
        res.status(201).json({ url: `/covers/${generatedFilename}` });
      });
    });
  });

};

const getCoverFilename = (id: any, filename: string) => {
  const filenameParts = filename.split('.');
  const ext = filenameParts[filenameParts.length - 1];
  return `${id}_cover.${ext}`;
};

const generateUniqueFilename = (id: any, ext: any) => {
  return `${id}_${uuidv4()}.${ext}`;
};

const generateUniqueImageFilename = (id: any, filename: string, dir: string) => {
  const filenameParts = filename.split('.');
  const ext = filenameParts[filenameParts.length - 1];
  let newFilename = generateUniqueFilename(id, ext);
  let newFilepath = `..${dir}/${newFilename}`;
  while (fs.existsSync(newFilepath)) {
    newFilename = generateUniqueFilename(id, ext);
    newFilepath = `..${dir}/${newFilename}`;
  }
  return newFilename;
};
