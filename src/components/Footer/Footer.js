import React from 'react';
import {Typography} from '@material-ui/core';

import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <Typography variant="caption" display="block" align='center'>
            Presented To <a href="https://www.facebook.com/Cv.bcet/" target="_blank" rel="noopener noreferrer">CodeVision BCET</a>
            </Typography>
            <Typography variant="caption" display="block" align='center'>
                Presented by Team Codium
                &nbsp;|&nbsp;<a href="https://www.linkedin.com/in/suman-chaurasiya-9359641b4/" target="_blank" rel="noopener noreferrer">Suman Chaurasiya</a>&nbsp;(2nd Year CSE)
                &nbsp;|&nbsp;Sujata Kumari (1st Year CSE)
            </Typography>
        </div>
    );
}

export default Footer;