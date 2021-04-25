const pagoSuccess = () =>{
    const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const paymentId = params.get('payment_id');
  const externaRef = params.get('external_reference');
  const payment_method_id = params.get('payment_type');
  return payment_method_id, paymentId,externaRef;
}

module.exports = pagoSuccess;