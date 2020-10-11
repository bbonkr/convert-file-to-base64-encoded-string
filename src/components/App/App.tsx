import React, { useEffect, useState } from 'react';
import halfmoon from 'halfmoon';
import { MainLayout } from '../MainLayout';
import { ContentWrapper } from '../ContentWrapper/';
import { FileInfo, Position } from '../../interfaces';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Content } from '../Content/Content';

import 'halfmoon/css/halfmoon.min.css';
import { Card } from '../Card/Card';
import { FileForm } from '../FileForm/FileForm';

export const App = () => {
    const [scrollPosition, setScrollPosition] = useState<Position>({
        top: 0,
        left: 0,
    });
    const handleClickScrollTop = () => {
        setScrollPosition((prevState) => ({
            ...prevState,
            top: 0,
            left: 0,
        }));
    };

    const handleFileLoaded = (files: FileInfo[]) => {
        console.info('handleFileLoaded', files);
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
            </ContentWrapper>
            <Footer onClickScrollToTop={handleClickScrollTop} />
        </MainLayout>
    );
};
