import { Request, Response } from "express";
import { TMapEndpoints } from "../";
import fs, { globSync } from "node:fs";
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import path from "node:path";

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
    const filepath = ".." + filename;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(204);
    } else {
      res.status(404).json({ error: 'Not found'});
    }
  });

  app.delete('/superhero/cover', async (req: Request, res: Response) => {
    const { filename } = req.body;
    //const fileSuperheroId = filename.split('_')[0];
    const filepath = ".." + filename;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(204);
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
      console.log("2");
      const file = files.file![0];
      const id = fields.id![0];
      console.log(id);
      console.log(file);
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const path = "/images";
      const generatedFilename = generateFilename(
        id,
        file.filepath,
        path,
        getUniqueFilename
      );
      fs.rename(file.filepath, generatedFilename, () => {
        res
          .status(201)
          .json({ generatedFilename, url: `${path}/${generatedFilename}` });
      });
    });
  });

  app.post('/superhero/cover', async (req: Request, res: Response) => {
    const { id, filename, image } = req.body;
    console.log(req.body);
    const path = "/cover";
    const generatedFilename = generateFilename(id, filename, path, getSpecificFilename);
    fs.writeFile(generatedFilename, image, (err) => {
      if (err) {
        console.error('Failed to save a file:', err);
        return res.status(500).send('Error: file not saved');
      }
      res.status(201).json({ generatedFilename, url: `${path}/${generatedFilename}` });
    });
  });

};

const getUniqueFilename = (id: any, ext: any) => {
  return `${id}_${uuidv4()}.${ext}`;
};

const getSpecificFilename = (id: any, ext: any) => {
  return `${id}_cover.${ext}`;
};

const generateFilename = (
  id: any,
  filename: string,
  path: string,
  getFilename: Function,
) => {
  const filenameParts = filename.split('.');
  const ext = filenameParts[filenameParts.length - 1];
  let newFilename = getFilename(id, ext);
  let newFilepath = `..${path}/${newFilename}`;
  while (fs.existsSync(newFilepath)) {
    newFilename = getFilename(id, ext);
    newFilepath = `..${path}/${newFilename}`;
  }
  return newFilename;
};
