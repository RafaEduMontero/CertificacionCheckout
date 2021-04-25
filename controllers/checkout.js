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
                zip_code: '1111',
                street_name: 'False',
                street_number: 123
            }
        },
          back_urls: {
          success: `https://rafamontero-mp-ecommercenodejs.herokuapp.com/pagosuccess`,
          failure: `https://rafamontero-mp-ecommercenodejs.herokuapp.com/pagofailure`,
          pending: `https://rafamontero-mp-ecommercenodejs.herokuapp.com/pagopending`
        },
        "auto_return": "approved",
        notification_url: 'https://rafamontero-mp-ecommercenodejs.herokuapp.com/notifications',
        payment_methods: {
          // declaramos el método de pago y sus restricciones
                 excluded_payment_methods: [
         // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
         // donde el id de cada objeto es la exclusión
                   {
                     id: "amex"
         // acá estamos excluyendo el uso de la tarjeta American Express
                   }
                 ],
                 excluded_payment_types: [{ id: "atm" }],
          // aca podemos excluir TIPOS de pagos, es un array de objetos
         // Por ejemplo, aca estamos excluyendo pago por cajero
                 installments: 6, 
         // mayor cantidad de cuotas permitidas
                 default_installments: 6 
         // la cantidad de cuotas que van a aparecer por defecto
               },  
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