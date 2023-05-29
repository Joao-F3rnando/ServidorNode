import fs from 'fs';
import { google } from 'googleapis'

const GOOGLE_API_ID = '1lws6Yba4jNFYymgbJgQhxKGlD8qE7uDn'

export async function uploadFile(file){
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: './googleDrive.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            'name': file.filename,
            'parents': [GOOGLE_API_ID]
        }

        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path)
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })

        fs.unlink(file.path, (err) => {
            if (err) {
              console.error('Ocorreu um erro ao excluir o arquivo:', err);
              return;
            }
          
            console.log('Arquivo excluído com sucesso');
          });
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}
//https://drive.google.com/uc?export=view&id=1ulOxvKc-BTuPG1_VGux9_gvbtXMWwF9r