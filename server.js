const express = require("express");

const app = express();

app.set("view engine", "pug");

// serve static files from the `public` folder
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Homepage",

    });
});

app.get("/profile", (req, res) => {
    const person = people.profiles.find(p => p.id === req.query.id);
    res.render("profile", {
        title: `About ${person.firstname} ${person.lastname}`,
        person
    });
});

const server = app.listen(8080, () => {
    console.log(`Express running ? PORT ${server.address().port}`);
});