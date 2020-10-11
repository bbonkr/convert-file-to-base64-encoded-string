import React, { useEffect, useState } from 'react';
import halfmoon from 'halfmoon';
import { MainLayout } from '../MainLayout';
import { ContentWrapper } from '../ContentWrapper/';
import { FileInfo, Position } from '../../interfaces';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Content } from '../Content/Content';
import { FaTrash, FaDownload } from 'react-icons/fa';
import { Card } from '../Card/Card';
import { FileForm } from '../FileForm/FileForm';
import { Media } from '../Media';

import 'halfmoon/css/halfmoon.min.css';

export const App = () => {
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

    const handleRemoveFile = (file: FileInfo) => () => {
        setFiles((prevState) => {
            const index = prevState.findIndex((p) => p.id === file.id);
            if (index >= 0) {
                prevState.splice(index, 1);
            }

            return [...prevState];
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
                    <Card>
                        <FileForm onFileLoaded={handleFileLoaded} />
                    </Card>
                </Content>
                <Content title="Loaded files">
                    <div className="d-flex flex-row flex-wrap">
                        {files.map((file) => {
                            return (
                                <div key={file.id} className="w-400 mw-full">
                                    <Card cardClassName="p-0">
                                        <Media file={file} />
                                        <Content title={file.name}>
                                            <p>{file.size} Bytes</p>
                                            <div className="text-center">
                                                <button className="btn btn-primary">
                                                    <FaDownload />{' '}
                                                    <span>Download</span>
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={handleRemoveFile(
                                                        file,
                                                    )}
                                                >
                                                    <FaTrash />{' '}
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </Content>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </Content>
            </ContentWrapper>
            <Footer onClickScrollToTop={handleClickScrollTop} />
        </MainLayout>
    );
};
