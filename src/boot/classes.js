export default ({
  Vue
}) => {
  Vue.prototype.$classes = {
    Luggage: function (luggage_type, deep_dimension, high_dimension, price, width_dimension) {
      this.luggage_type = luggage_type;
      this.deep_dimension = deep_dimension;
      this.high_dimension = high_dimension;
      this.price = price;
      this.width_dimension = width_dimension;
      this.getFullName = function() {
        switch (this.luggage_type) {
          case "BIG":
            return "grande"
          case "MEDIUM":
            return "mediano"
          case "SMALL":
            return "pequeño"
          default:
            return "error"
        }
      }
    }
  }
}
