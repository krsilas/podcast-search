const PORT = process.env.PORT || 3000
const path = require('path');
const express = require('express')
const app = express()

const originWhitelist = process.env.CORSANYWHERE_WHITELIST;
const cors_proxy = require('cors-anywhere').createServer({
  originWhitelist: originWhitelist || [],
  //requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
//   redirectSameOrigin: true,
//   httpProxyOptions: {
//     xfwd: false
//   }
});

app.use(express.static(path.join(__dirname, '/public')));
app.get('/proxy*', function(req, res) {
    req.url = req.url.replace('/proxy/', '/');
    console.log(req.url)
    cors_proxy.emit('request', req, res);
});

app.get(["/", "/search", "/favorites"], (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.get(["/podcast/:id"], (req,res)=>{
    res.send(req.params.id)
})

app.listen(PORT, ()=>console.log(`Running on port ${PORT}`))