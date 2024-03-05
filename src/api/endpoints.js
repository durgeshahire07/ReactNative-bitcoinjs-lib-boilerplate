export default {
  cryptoPrice: {
    bitcoin: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    matic: "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT"
  },
  methodType: {
    get: "GET",
    post: "POST",
    put: "PUT",
    patch: "PATCH",
    delete: "DELETE"
  }
}