const express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

const fs = require('fs');
const app = express();

app.set("view engine", "pug");

// app use section //
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));
    const hardskills = JSON.parse(fs.readFileSync('./json/hardskills.json'));
    const personal = JSON.parse(fs.readFileSync('./json/personal.json'));

    res.render("index", {
        title: "About me",
        name: personal.first + " " + personal.last,
        bio: personal.bio,
        description: personal.title,
        projectslist: projectdata.profiles,
        languagelist: hardskills.languages,
        softwarelist: hardskills.software
    });
});

app.get("/timeline", (req, res) => {
    const jobdata = JSON.parse(fs.readFileSync('./json/experience.json'));
    const hardskills = JSON.parse(fs.readFileSync('./json/hardskills.json'));

    const year = jobdata.profiles.find(p => p.id === req.query.id);
    const languages = hardskills.languages.find(p => p.id === req.query.id);
    res.render("timeline", {
        jobexperience: jobdata.profiles,
        languagelist: hardskills.languages,
        softwarelist: hardskills.software,
        title: `My History`,
        languages,
        year,
    });
});

app.get("/projects", (req, res) => {
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));

    const project = projectdata.profiles.find(p => p.id === req.query.id);
    res.render("projects", {
        title: "My Projects",
        projectslist: projectdata.profiles,
        project
    });
});

app.get("/projectdetails", (req, res) => {
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));

    const project = projectdata.profiles.find(p => p.id === req.query.id);
    res.render("projectdetails", {
        title: `About ${project.title}`,
        projectslist: projectdata.profiles,
        project
    });
});

app.get("/contact", (req, res) => {
    const personal = JSON.parse(fs.readFileSync('./json/personal.json'));

    res.render("contact", {
        title: `Contact me`,
        message: `ignore`
    });
});

app.post('/send_message', function (req, res) {
    const personal = JSON.parse(fs.readFileSync('./json/personal.json'));

    let transporter = nodeMailer.createTransport({
        host: personal.smtp,
        port: personal.port ,
        secure: false,
        auth: {
            user: personal.login,
            pass: personal.apppass
        }
    });
    let mailOptions = {
        from: personal.email,
        to: personal.email, 
        subject: "Contact from " + req.body.name + " at " + req.body.company, 
        text: req.body.email + " " + req.body.message, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            const messagestatus = false;
        } 

        const messagestatus = true;

        console.log(info.messageId, info.response);
        res.render("contact", {
            title: `Contact me`,
            message: messagestatus,
            alerttext: "Thank you " + req.body.name + " for your interest! I will respond as quickly as I can."
        });
    });
});

const server = app.listen(8080, () => {
    console.log(`Express running ? PORT ${server.address().port}`);
});