import React from 'react';
import { FileInfo } from '../../interfaces';

interface MediaProps {
    file: FileInfo;
}

export const Media = ({ file }: MediaProps) => {
    if (file.type.startsWith('image')) {
        return <img src={file.data} className="img-fluid rounded-top" />;
    }

    if (file.type.startsWith('video')) {
        return (
            <video autoPlay={false} controls className="mw-full">
                <source src={file.data} />
            </video>
        );
    }

    return <React.Fragment></React.Fragment>;
};
