import React from 'react';
import { FaGithub } from 'react-icons/fa';
export const Header = React.memo(() => {
    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        event.preventDefault();
    };
    return (
        <nav className="navbar">
            <a href="#" className="navbar-brand" onClick={handleClick}>
                File Handling
            </a>
            <div className="d-md-flex ml-auto">
                <a
                    href="https://github.com/bbonkr/convert-file-to-base64-encoded-string"
                    target="_blank"
                    className="btn btn-link"
                    title="Open GitHub"
                >
                    <FaGithub />
                </a>
            </div>
        </nav>
    );
});
