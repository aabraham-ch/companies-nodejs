import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import * as process from "node:process"

const bodyParser = require('body-parser');;




import * as APIMethod from "./libs/companies";

const app = express();
const port = Number.parseInt(process.env.PORT || "3000");
const host = process.env.HOST || '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

// Setup Nunjucks templating engine
nunjucks.configure(
    ['node_modules/govuk-frontend/dist', 'views'],
    {
        autoescape: true,
        express: app,
        watch: true
    }
);

app.set('view engine', 'njk');

// Middleware to serve static files from GOV.UK Frontend
app.use('/govuk', express.static(path.join('node_modules', 'govuk-frontend', 'dist', 'govuk')));
app.use('/assets', express.static(path.join('node_modules', 'govuk-frontend', 'dist', 'govuk', 'assets')));

// Include custom assets if needed
app.use(express.static('public'));

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

app.get('/list',async (req, res) => {
        let pageNumber = Math.max(0, parseInt(req.query.pageNumber as string) || 0);
        let result = await APIMethod.getCompanies(pageNumber);
        console.log("i am getting result", result)
        res.render('list', {
            page: "list",
            heading: 'The Companies House List of Companies',
            description: 'List of all the companies registered with Companies House',
            companies: result,
            currentPage: pageNumber
        });

});

app.get('/create', (req, res) => {

        res.render('create', {
            page: "create",
            heading: 'Register a new company with Companies House',
            description: 'Please enter the details of your new company'
      
        });

});

app.post('/created',async (req, res) => {
console.log(req.body)
    let result = await APIMethod.setupCompany(req.body)
    res.render('newCompany', {
        page: "newCompany",
        heading: 'Company Registered with Companies House',
        description: 'Your new company has been added to the companies house reigstry',
        company: result
    }); 
});

app.get('/delete',async (req, res) => {
    let num = Number (req.query.q)
    try {
         await APIMethod.strikeOffCompany(num)
         res.redirect("/list")
    }catch {
        console.log("error with strike")
    }
   
    
    });

// Start the server
app.listen(port, host, () => {
    console.log(`Application is running on http://${host}:${port}`);
});
 