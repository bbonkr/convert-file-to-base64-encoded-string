import { FileInfo } from '../../interfaces';

export class FileHelper {
    getDataUrl(file: File): Promise<FileInfo> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
                resolve({
                    id: file.name,
                    name: file.name,
                    data: reader.result as string,
                    type: file.type,
                    size: file.size,
                });
            reader.onerror = (err) => reject(err);

            reader.readAsDataURL(file);
        });
    }

    dataURItoBlob(file: FileInfo) {
        // https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript/30407840#30407840
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        const { data, type } = file;
        const byteString = atob(data.split(',')[1]);

        // separate out the mime component
        const mimeString = data.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {
            type: type || mimeString,
        });
    }
}
