export default {
  cryptoPrice: {
    bitcoin: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    usdt: "https://api.binance.com/api/v3/ticker/price?symbol=USDT"
  },
  methodType: {
    get: "GET",
    post: "POST",
    put: "PUT",
    patch: "PATCH",
    delete: "DELETE"
  }
}