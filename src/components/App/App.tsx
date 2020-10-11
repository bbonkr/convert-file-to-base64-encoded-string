import React, { useEffect, useState } from 'react';
import halfmoon from 'halfmoon';
import { FileDownloadHelper } from '@bbon/filedownload';
import { MainLayout } from '../MainLayout';
import { ContentWrapper } from '../ContentWrapper/';
import { FileInfo, Position } from '../../interfaces';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Content } from '../Content/Content';
import { FileForm } from '../FileForm/FileForm';
import { FileHelper } from '../../lib/FileHelper';
import { FileList } from '../FileList';

import 'halfmoon/css/halfmoon.min.css';

export const App = () => {
    const fileDownloadHelper = new FileDownloadHelper();
    const fileHelper = new FileHelper();
    const [scrollPosition, setScrollPosition] = useState<Position>({
        top: 0,
        left: 0,
    });

    const [files, setFiles] = useState<FileInfo[]>([]);

    const handleClickScrollTop = () => {
        setScrollPosition((prevState) => ({
            ...prevState,
            top: 0,
            left: 0,
        }));
    };

    const handleFileLoaded = (loadedFiles: FileInfo[]) => {
        setFiles((prevState) => {
            loadedFiles.forEach((x) => {
                const index = prevState.findIndex((p) => p.id === x.id);
                if (index < 0) {
                    prevState.splice(0, 0, x);
                }
            });
            return [...prevState];
        });
    };

    const handleRemove = (file: FileInfo) => {
        setFiles((prevState) => {
            const index = prevState.findIndex((p) => p.id === file.id);
            if (index >= 0) {
                prevState.splice(index, 1);
            }

            return [...prevState];
        });
    };

    const handleDownload = (file: FileInfo) => {
        fileDownloadHelper.download({
            data: fileHelper.dataURItoBlob(file),
            filename: file.name,
            contentType: file.type,
        });
    };

    useEffect(() => {
        const bodyEl = document.querySelector('body');

        if (bodyEl) {
            bodyEl.setAttribute(
                'class',
                'with-custom-webkit-scrollbars with-custom-css-scrollbars',
            );
            bodyEl.setAttribute('data-set-preferred-theme-onload', 'true');
        }

        halfmoon.onDOMContentLoaded();
    }, []);
    return (
        <MainLayout>
            <Header />
            <ContentWrapper scrollPosition={scrollPosition}>
                <Content title="">
                    <FileForm onFileLoaded={handleFileLoaded} />
                </Content>
                <Content
                    title={
                        files.length > 0 ? `${files.length} file(s) Loaded` : ''
                    }
                >
                    <FileList
                        files={files}
                        onDownload={handleDownload}
                        onRemove={handleRemove}
                    />
                </Content>
            </ContentWrapper>
            <Footer onClickScrollToTop={handleClickScrollTop} />
        </MainLayout>
    );
};
