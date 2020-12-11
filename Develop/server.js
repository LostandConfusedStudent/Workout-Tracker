const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bp = require("body-parser");
const apiRoute = require("./routes/api");
const viewRoute = require("./routes/view");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://user:user@mycluster-i5mnv.mongodb.net/workouts?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(express.static("public"));

app.use(apiRoute);
app.use(viewRoute);

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => console.log("listening on port: ", PORT));