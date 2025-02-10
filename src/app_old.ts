import express from 'express';
import * as process from "node:process";

import * as APIMethod from "./libs/companies";

const app = express();
const port = Number.parseInt(process.env.PORT || "3000");
const host = process.env.HOST || '0.0.0.0';
 
// Home route for homepage
app.get('/', (req, res) => {
    res.render('index', {
        page: 'home',
        heading: 'Companies House Registry',
        description: 'A basic company registry for Companies House.'
    });
});

// Basic route for about
app.get('/about', (req, res) => {
    res.render('about', {
        page: "about",
        heading: 'The Companies House Junior Devs',
        description: 'Get to know the new team of Junior Devs at Companies House!'
    });
});




// Start the server
app.listen(port, host, () => {
    console.log(`Application is running on http://${host}:${port}`);
});
 