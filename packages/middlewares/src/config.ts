export const config = {
  APP_ENDPOINT : process.env.APP_ENDPOINT|| 'http://localhost',
  USER_SERVICE_PORT : process.env.USER_SERVICE_PORT || 3000,
  FOOD_SERVICE_PORT : process.env.FOOD_SERVICE_PORT || 3001,
  PAYMENT_SERVICE_PORT : process.env.PAYMENT_SERVICE_PORT || 3002,
}