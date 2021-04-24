const mercadopago = require ('mercadopago');

const checkout = (req,res) =>{
    
    const {title,price,unit,img_url} = req.body
    let preference = {
        external_reference: 'rafaedumontero@gmail.com',
        items: [
          {
            id: 1234,
            title: title,
            description: 'Dispositivo móvil de Tienda e-commerce',
            picture_url: img_url,
            unit_price: parseInt(price),
            quantity: parseInt(unit),
          }
        ],
        payer:{
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_63274575@testuser.com',
            phone: {
                area_code: '11',
                number: 22223333
            },
            address:{
                zip_code: '111',
                street_name: 'False',
                street_number: 123
            }
        },
          back_urls: {
          success: `http://localhost:3000/pagosuccess`,
          failure: `http://localhost:3000/pagofailure`,
          pending: `http://localhost:3000/pagopending`
        },
        "auto_return": "approved",
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
          console.log(response.body)
          res.redirect(response.body.init_point)
      }).catch(function(error){
        console.log(error);
      });
    }

    module.exports = checkout;