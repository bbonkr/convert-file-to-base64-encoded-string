import React from 'react';
import { FaDownload, FaTrash } from 'react-icons/fa';
import { FileInfo } from '../../interfaces';
import { Card } from '../Card';
import { Content } from '../Content';
import { Media } from '../Media';

interface FileItemProps {
    file: FileInfo;
    onDownload?: (file: FileInfo) => void;
    onRemove?: (file: FileInfo) => void;
}

export const FileItem = React.memo(
    ({ file, onDownload, onRemove }: FileItemProps) => {
        const handleDownload = (file: FileInfo) => () => {
            if (onDownload) {
                onDownload(file);
            }
        };

        const handleRemove = (file: FileInfo) => () => {
            if (onRemove) {
                onRemove(file);
            }
        };

        return (
            <Card cardClassName="p-0">
                <Media file={file} />
                <Content title={file.name}>
                    <p>{file.size} Bytes</p>
                    <div className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={handleDownload(file)}
                        >
                            <FaDownload /> <span>Download</span>
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleRemove(file)}
                        >
                            <FaTrash /> <span>Remove</span>
                        </button>
                    </div>
                </Content>
            </Card>
        );
    },
);
