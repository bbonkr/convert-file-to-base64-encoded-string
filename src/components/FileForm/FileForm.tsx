import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileInfo } from '../../interfaces';
import { FileHelper } from '../../lib/FileHelper';

interface FileFormProps {
    onFileLoaded?: (files: FileInfo[]) => void;
}

export const FileForm = ({ onFileLoaded }: FileFormProps) => {
    const fileHelper = new FileHelper();
    const [isEnter, setIsEnter] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        // accept: 'image/*',
        onDragEnter: () => {
            setIsEnter((prevState) => true);
        },
        onDragLeave: () => {
            setIsEnter((prevState) => false);
        },
        onDrop: (files) => {
            if (files && files.length > 0) {
                const tasks: Promise<FileInfo>[] = [];

                for (
                    let i = 0, fileLength = files?.length;
                    i < fileLength;
                    i++
                ) {
                    const file = files[i];

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

            setIsEnter(false);
        },
    });

    return (
        <React.Fragment>
            <div
                {...getRootProps({
                    className: `card ${
                        isEnter ? 'bg-primary' : 'bg-transparent'
                    }`,
                })}
            >
                <div className="form-group">
                    <input {...getInputProps()} type="file" multiple />

                    <div className="text-center">
                        {isEnter ? (
                            <p>
                                <code>Drop</code> files
                            </p>
                        ) : (
                            <p>
                                <code>Click</code> to open file dialog or{' '}
                                <code>Drag 'n' drop</code> files here
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
