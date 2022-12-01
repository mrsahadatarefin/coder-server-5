const express= require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w5yg5ut.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{

const productsCollection = client.db('coderDbUser').collection('products')

app.get('/products',async(req,res)=>{


    const query ={}
    const cursor = productsCollection.find(query)
    const product = await cursor.toArray()
    res.send(product)
})
app.get('/product/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const productData= await productsCollection.findOne(query);
    res.send(productData)
})



}
finally{}
}

run(). catch(err => console.error(err))































app.get('/',(req,res)=>{
    res.send("coder ninja is running ");

})
app.listen(port,()=>{
    console.log(`coder ninja server  running on ${port}`)
})