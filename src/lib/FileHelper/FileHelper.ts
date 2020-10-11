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
}
