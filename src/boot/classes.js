import axios from 'axios'

export default ({
  Vue, router
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
      },
      this.count = 0
    },
    Client : function(email, name, surnames){
      this.email = email;
      this.name = name
      this.surnames = surnames
    },
    Invoice: function(end_date, start_date, total_price, user, luggages){
      this.end_date = end_date;
      this.start_date = start_date;
      this.total_price = total_price;
      this.user = user;
      this.luggages;
    },
    Utils: {
      verifyTokenSignature: function (token, user) {
        axios
          .post("http://localhost:8081/token/verify", token)
          .then(response => {
            localStorage.clear();
            // Recibiremos el JSON con la información deserializada.
            console.log("the user", user);
            let userToken = JSON.parse(response.data[0]);
            let token = response.data[1];
  
            user.name = userToken.name;
            user.surnames = userToken.surnames;
            user.rol = userToken.rol;
            user.imageUrl = userToken.imageUrl;
            user.isLoginUser = true;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token",  token);

            if(user.rol === "CLIENT"){
              router.push('/price');
            } else if (user.rol === "EMPLOYEE"){
              router.push('/employee/invoice/check-in');
            }else if (user.rol === "ADMIN"){
              router.push('/admin/price/edit');
            }
          })
          .catch(error => {
            // Con clear() quitamos todos los elementos del Local Storage
            console.log(error);
            localStorage.clear();
          });
      }
    }
  }
}
