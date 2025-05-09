import { TMapEndpoints } from "../";
import fs, { glob } from "node:fs";
import { v4 as uuidv4 } from 'uuid';

export const mapSuperheroImageEndpoints: TMapEndpoints = (app) => {

  app.delete('/superhero/image/:id', async (req: any, res: any) => {
    const filename: string = req.filename;
    //const fileSuperheroId = filename.split('_')[0];
    const filepath = "../images/" + filename;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(204);
    } else {
      res.status(404).json({ error: 'Not found'});
    }
  });

  app.get('/superhero/image/all/:id', async (req: any, res: any) => {
    glob('../images/${id}*', (err, files) => {
      if (err) {
        const errmsg = 'Error searching for images';
        console.error(errmsg, err);
        return res.status(500).json({ error: errmsg });
      }
      const filePaths = files.map(file => file.slice(2));
      res.status(302).json({ images: filePaths })
    });
  });

  app.post('/superhero/image/:id', async (req:any, res: any) => {
    const filename = generateFilename(req, getUniqueFilename);
    fs.writeFile(filename, req.image, (err) => {
      if (err) {
        console.error('Failed to save a file:', err);
        return res.status(500).send('Error: file not saved');
      }
      res.status(201).json({ filename, url: `images/${filename}` });
    });
  });

  app.put('/superhero/image/:id', async (req: any, res: any) => {
    const filename = generateFilename(req, getSpecificFilename);
    fs.writeFile(filename, req.image, (err) => {
      if (err) {
        console.error('Failed to save a file:', err);
        return res.status(500).send('Error: file not saved');
      }
      res.status(201).json({ filename, url: `images/${filename}` });
    });
  });

};

const getUniqueFilename = (id: any, ext: any) => {
  return `${id}_${uuidv4()}.${ext}`;
};

const getSpecificFilename = (id: any, ext: any) => {
  return `${id}_cover.${ext}`;
};

const generateFilename = (req: any, getFilename: Function) => {
  const filenameParts = req.filename.split('.');
  const ext = filenameParts[filenameParts.length - 1];
  let newFilename = getFilename(req.params.id, ext);
  let newFilepath = `../images/${newFilename}`;
  while (fs.existsSync(newFilepath)) {
    newFilename = getFilename(req.params.id, ext);
    newFilepath = `../images/${newFilename}`;
  }
  return newFilename;
};
