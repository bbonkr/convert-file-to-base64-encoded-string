import React from 'react';
import { FileInfo } from '../../interfaces';
import { FileItem } from './FileItem';

interface FileListProps {
    files: FileInfo[];
    onDownload?: (file: FileInfo) => void;
    onRemove?: (file: FileInfo) => void;
}

export const FileList = ({ files, onDownload, onRemove }: FileListProps) => {
    return (
        <div className="d-flex flex-row flex-wrap">
            {files.map((file) => {
                return (
                    <div key={file.id} className="w-400 mw-full">
                        <FileItem
                            file={file}
                            onDownload={onDownload}
                            onRemove={onRemove}
                        />
                    </div>
                );
            })}
        </div>
    );
};
