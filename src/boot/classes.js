import axios from 'axios'

export default ({
  Vue,
  router
}) => {
  Vue.prototype.$classes = {
    Luggage: function (luggage_type, deep_dimension, high_dimension, price, width_dimension) {
      this.luggage_type = luggage_type;
      this.deep_dimension = deep_dimension;
      this.high_dimension = high_dimension;
      this.price = price;
      this.width_dimension = width_dimension;
      this.getFullName = function () {
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
    Client: function (userId, rol_user, email, name, surnames ) {
      this.userId = userId;
      this.rol_user = rol_user
      this.email = email;
      this.name = name
      this.surnames = surnames
    },
    Invoice: function (invoice_id, end_date, start_date, total_price, user, luggages, isVerified) {
      this.invoice_id = invoice_id;
      this.end_date = end_date;
      this.start_date = start_date;
      this.total_price = total_price  || 0;
      this.user = user;
      this.isVerified = isVerified;
      this.luggages = luggages || [];
    },
    Comments: function(comment_id, comment_text, user){
        this.comment_id = comment_id;
        this.comment_text = comment_text;
        this.user = user;
        this.isThisUserComment = false
    },
     Utils: {
      verifyTokenSignature: function (token, user) {
        if(token && user ){
          axios
          .post("http://localhost:8081/token/verify", token)
          .then(response => {
            localStorage.clear();

            let userToken = JSON.parse(response.data[0]);
            let token = response.data[1];

            console.log(userToken.email);
            
            user.userId = userToken.userId;
            user.email = userToken.email;
            user.name = userToken.name;
            user.surnames = userToken.surnames;
            user.rol_user = userToken.rol_user;
            user.imageUrl = userToken.imageUrl;
            user.isLoginUser = true;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem('token', token);


            if (user.rol_user === "CLIENT") {
              router.push('/price');
            } else if (user.rol_user === "EMPLOYEE") {
              router.push('/employee/invoice/check-in');
            } else if (user.rol_user === "ADMIN") {
              router.push('/admin/price/edit');
            }
          })
          .catch(function (error) {
            console.log(error);

            localStorage.clear();
          });
        } else {
          router.push("/price");
        }
        
      }
    }
  }
}
