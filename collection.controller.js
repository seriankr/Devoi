const Collection = require('../model/collection')


const create = async (req,res)=>{
    let message = ""
   try{
    const dept = await Collection.create(req.body);
    res.send(dept)
   }catch(error){
    if(error.code === 11000)message += `\nErreur mongo: Duplication d'entrées\n Valeur: ${error.keyValue.title}`
    if(error.errors){
    if(error.errors.title.kind === "required") message += `\n Le champ ${error.errors.title.path} est requit`
    }
    res.send("Une erreur s'est produite" + message)
    console.log(error)
   }
    
}

const getAll = async (req,res)=>{
    const collections = await Collection.find();
    res.send(collections)
}

const getone = async (req,res)=>{
    try {
        const collection = await Collection.findOne(Collection.where("title",req.body.title));
        res.send(collection)
    } catch (error) {
        console.log(error)
    }
}


const update = async (req,res)=>{
    try{
        const dept = await Collection.updateOne(Collection.where("_id",req.body._id),req.body)
        res.send(dept)
    }catch(error){
        res.send("une erreur s'est produite")
        console.log(error)
    }
}

const del = async (req,res)=>{
    try{
        const dept = await Collection.deleteOne(Collection.where("nom",req.body.title))
        res.send(dept)
    }catch(error){

        if(error.title === "CastError") res.send("CastError : L'id est incorrect")
        else res.send("une erreur s'est produite")
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