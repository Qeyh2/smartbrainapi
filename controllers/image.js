const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'e6dd115ec7c44f7db0153b9b2f49d68d'
});

const handleApiCall = (req, res) => {
     app.models
          .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)  
          .then(data => {
               res.json(data);
          }) 
          .catch(err => res.status(400).json('Unable to work with API'))
}


const handleImagePut = (req, res, db) =>{
     const { id } = req.body;
     db('users').where('id', '=', id)
     .increment('entries', 1)
     .returning('entries')
     .then(entries => {
          res.json(entries[0]);
     })
     .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
     handleImagePut: handleImagePut,
     handleApiCall: handleApiCall
}