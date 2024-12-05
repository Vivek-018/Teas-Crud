import "dotenv/config";
import express from "express";

const port = process.env.PORT || 3000;
const app = express();
//tasks
// backend deploy to render
// morgan and winston looger setup and study
//  push code to github


app.use(express.json());

let teaData = [];
let nextId = 1;

// add tea
app.post("/addtea", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).json({
    message: "tea added succesfully!",
    "Add Tea": newTea,
  });
});

// get all tea
app.get("/teaData", (req, res) => {
  res.status(200).json({
    data: teaData,
  });
});

// get tea by tea id
app.get("/teaData/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const finddata = teaData.filter((tea) => {
    return tea.id === id;
  });

  res.status(200).json({
    data: finddata,
  });
});

// update tea
app.put("/teaData/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const { name, price } = req.body;

  const updatedata = teaData.map((tea) => {
    if (tea.id === id) {
      return { ...tea, name, price };
    } else {
      return tea;
    }
  });

  teaData = updatedata;

  res.status(200).json({
    data: updatedata,
  });
});

// delete tea
app.delete("/teaData/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const leftdata = teaData.map((tea) => {
    if (tea.id === id) {
      return;
    } else {
      return tea;
    }
  });

  teaData = leftdata;
  return res.status(200).json({
    data: leftdata,
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
