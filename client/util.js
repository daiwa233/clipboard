import { AltText, domain } from './src/config.js'

const query = (str) => document.querySelector(str);

const generateUrl = (Fname) => `![${AltText}](${domain}/${Fname})`;

const  generateFName = () => window.btoa(Date.now()) + Math.random().toString(36).substr(2);// 再加上时间戳base64转码

export { query, generateFName, generateUrl}