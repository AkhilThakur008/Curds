// const express = require('express')
// const notemodel = require("./models/note.model")
// const cors = require("cors")
// const path =require("path")

// const app = express()
// app.use(express.json())
// app.use(cors())
// app.use(express.static("./public"))

// app.post("/api/notes",async(req,res)=>{
//     const {title,discription} = req.body

//    const note = await notemodel.create({
//         title,discription
//     })

//     res.status(201).json({
//         message:"note created",
//         note
//     })
// })

// app.get("/api/notes",async(req,res)=>{

//    const notes =  await notemodel.find()

//     res.status(200).json({
//         message:"all notes fetched",
//         notes
//     })
// })

// app.delete("/api/notes/:id",async(req,res)=>{
//     const id = req.params.id

//     console.log(id)

//     await notemodel.findByIdAndDelete(id)

//     res.status(200).json({
//         message:"note deleted"
//     })
// })

// app.patch("/api/notes/:id",async(req,res)=>{

//     const id = req.params.id
//     const {title,discription} =req.body

//     await notemodel.findByIdAndUpdate(id,{title,discription})

//     res.status(200).json({
//         message:"note updated"
//     })
// })

// app.use('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,"..","/public/index.html"))
// })

// module.exports = app;

const express = require('express');
const notemodel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Create Note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, discription } = req.body;
    const note = await notemodel.create({ title, discription });

    res.status(201).json({
      message: "note created",
      note
    });
  } catch (error) {
    res.status(500).json({ message: "error creating note", error });
  }
});

// Get All Notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await notemodel.find();
    res.status(200).json({
      message: "all notes fetched",
      notes
    });
  } catch (error) {
    res.status(500).json({ message: "error fetching notes", error });
  }
});

// Delete Note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await notemodel.findByIdAndDelete(id);

    res.status(200).json({
      message: "note deleted"
    });
  } catch (error) {
    res.status(500).json({ message: "error deleting note", error });
  }
});

// Update Note
app.patch("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, discription } = req.body;

    await notemodel.findByIdAndUpdate(id, { title, discription });

    res.status(200).json({
      message: "note updated"
    });
  } catch (error) {
    res.status(500).json({ message: "error updating note", error });
  }
});

// Catch-all route for React frontend
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;