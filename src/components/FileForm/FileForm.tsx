import React from 'react';
import { FileInfo } from '../../interfaces';
import { FileHelper } from '../../lib/FileHelper';

interface FileFormProps {
    onFileLoaded?: (files: FileInfo[]) => void;
}

export const FileForm = ({ onFileLoaded }: FileFormProps) => {
    const fileHelper = new FileHelper();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        const { files } = event.target;

        if (files && files.length > 0) {
            const tasks: Promise<FileInfo>[] = [];

            for (let i = 0, fileLength = files?.length; i < fileLength; i++) {
                const file = files?.item(i);

                if (file) {
                    tasks.push(fileHelper.getDataUrl(file));
                }
            }

            if (tasks.length > 0) {
                Promise.all(tasks)
                    .then((results) => {
                        if (onFileLoaded) {
                            onFileLoaded(results);
                        }
                    })
                    .catch((err) => {})
                    .finally(() => {});
            }
        }
    };

    return (
        <form>
            <div className="form-group">
                <label htmlFor="picture" className="required">
                    Load file
                </label>
                <div className="custom-file">
                    <input
                        type="file"
                        id="picture"
                        required
                        multiple
                        onChange={handleChange}
                    />
                    <label htmlFor="picture">Choose File</label>
                </div>
            </div>
        </form>
    );
};
