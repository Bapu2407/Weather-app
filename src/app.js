const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utilits/forecast');
const location = require('./utilits/location');
const { request } = require('http');

const app = express();
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/Views');
const partialsPath = path.join(__dirname,'../templates/Partials');
const port = Process.env.PORT || 3000;

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather',
        'name' : 'Bapuji Behera'
    })
});

app.get('/about',(req,res)=>{
    res.render('About',{
        'title': 'About',
        'name': 'Bapuji Behera'
    })
})

app.get('/help',(req,res)=>{
    res.render('Help',{
        'title':'Help',
        'helpText': 'This is some helpful text.',
        'name':'Bapuji Behera'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        res.send({'error':'You must provide a address term'});
    }else{
        location(req.query.address,(error, data) =>{
            if(error){
                // return console.log(error);
                res.send({'error':error});
            }else{
            forecast(data.latitude,data.longitude,(error,forecastdata)=>{
                if(error){
                    // return console.log(error);   \
                    res.send({'error':error});
                }else{
                    console.log(forecastdata);
                    res.send({
                   
                        'forecast':forecastdata,
                         'location': data.location,
                         'address':req.query.address
                    })
                }
            })
        }
        })
    }
})

app.get('/products',(req,res)=>{
    console.log(req.query);
    if(!req.query.search)
    {
        res.send({'error':'You must provide a search term'});
    }else{
        res.send({
            'Products':[]
        })
    }

})
app.get('*',(req,res)=>{
    res.render('404',{
        'title':'404',
        'name':'Bapuji Behera',
        'errorMessage':'404 Error Page not Found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port' +port);
})