import { Request, Response } from "express";
import { TMapEndpoints } from "../";
import fs, { glob } from "node:fs";
import { v4 as uuidv4 } from 'uuid';

export const mapSuperheroImageEndpoints: TMapEndpoints = (app) => {

  app.delete('/superhero/image', async (req: Request, res: Response) => {
    const { filename } = req.body;
    //const fileSuperheroId = filename.split('_')[0];
    const filepath = "../images/" + filename;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(204);
    } else {
      res.status(404).json({ error: 'Not found'});
    }
  });

  app.get('/superhero/image/all/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    glob(`../images/${id}*`, (err, files) => {
      if (err) {
        const errmsg = 'Error searching for images';
        console.error(errmsg, err);
        return res.status(500).json({ error: errmsg });
      }
      const filePaths = files.map(
        file => file.slice(2).replace(/\\/g, "/").replace("//", "/")
      );
      res.status(302).json({ images: filePaths })
    });
  });

  app.post('/superhero/image', async (req: Request, res: Response) => {
    const { id, filename, image } = req.body;
    const generatedFilename = generateFilename(
      id, filename, getUniqueFilename
    );
    fs.writeFile(generatedFilename, image, (err) => {
      if (err) {
        console.error('Failed to save a file:', err);
        return res.status(500).send('Error: file not saved');
      }
      res.status(201).json({ generatedFilename, url: `images/${generatedFilename}` });
    });
  });

  app.put('/superhero/image', async (req: Request, res: Response) => {
    const { id, filename, image } = req.body;
    const generatedFilename = generateFilename(
      id, filename, getSpecificFilename
    );
    fs.writeFile(generatedFilename, image, (err) => {
      if (err) {
        console.error('Failed to save a file:', err);
        return res.status(500).send('Error: file not saved');
      }
      res.status(201).json({ generatedFilename, url: `images/${generatedFilename}` });
    });
  });

};

const getUniqueFilename = (id: any, ext: any) => {
  return `${id}_${uuidv4()}.${ext}`;
};

const getSpecificFilename = (id: any, ext: any) => {
  return `${id}_cover.${ext}`;
};

const generateFilename = (id: any, filename: string, getFilename: Function) => {
  const filenameParts = filename.split('.');
  const ext = filenameParts[filenameParts.length - 1];
  let newFilename = getFilename(id, ext);
  let newFilepath = `../images/${newFilename}`;
  while (fs.existsSync(newFilepath)) {
    newFilename = getFilename(id, ext);
    newFilepath = `../images/${newFilename}`;
  }
  return newFilename;
};
