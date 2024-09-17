import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const PORT = 3000;
const app = express();
const API_URL = "https://v2.jokeapi.dev/joke/"

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req,res) => {

    res.render("index.ejs");
});
app.post("/",async(req,res)=>{
    try{
        const joke_type = req.body.type;
        const language = req.body.language;
        const blacklist = req.body.blacklist;
        const type = req.body.jokeType;
        const submit = await axios(API_URL+`/${joke_type}`,{
            params:{
               lang: language,
               blacklistFlags: blacklist,
               type:type
            }
        });
        let result = submit.data;
        if(result.type == 'twopart'){
            res.render("index.ejs",{setup: result.setup , delivery: result.delivery});
        } else{
            res.render("index.ejs",{joke:result.joke});
        }
    } catch(error){
        res.send(error.message);
    }
});

app.listen(PORT,()=>{
    console.log(`listing on port: ${PORT}`);
});