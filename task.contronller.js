const Task = require('../model/task')


const create = async (req,res)=>{
    let message = ""
   try{
    const task = await Task.create(req.body);
    res.send(task)
   }catch(error){
    if(error.code === 11000)message += `\n Erreur base de donnée: Duplication d'entrées du title: ${error.keyValue.title}`
    if(error.errors){
    if(error.errors.name.kind === "required") message += `\n Le champ ${error.errors.name.path} est requit`
    }
    res.send("Une erreur s'est produite " + message)
    console.log(error)
   }
}

const getAll = async (req,res)=>{
    try{
        const tasks = await Task.find().populate('collection');
        res.send(tasks)
    }catch(error){
        console.log(error)
    }
}

const getone = async (req,res)=>{
    try {
        const tasks = await Task.findOne(Task.where("title",req.body.title)).populate('collection');
        res.send(tasks)
    } catch (error) {
        console.log(error)
    }
}

const update = async (req,res)=>{
    try{
        const dept = await Task.updateOne(Task.where("title",req.body.title),req.body)
        res.send(dept)
    }catch(error){
        res.send("une erreur s'est produite")
        console.log(error)
    }
}
const del = async (req,res)=>{
    try{
        const dept = await Task.deleteOne(Task.where("title",req.body.title))
        res.send(dept)
    }catch(error){
        res.send("une erreur s'est produite")
        console.log(error)
    }
}

module.exports = {
    create,
    getAll,
    update,
    del,
    getone
}