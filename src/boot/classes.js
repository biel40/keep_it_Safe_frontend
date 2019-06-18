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
    Invoice: function (invoice_id, end_date, start_date, total_price, user, luggages, verified) {
      this.invoice_id = invoice_id;
      this.end_date = end_date;
      this.start_date = start_date;
      this.total_price = total_price  || 0;
      this.user = user;
      this.verified = verified;
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
            
            user.userId = userToken.userId;
            user.email = userToken.email;
            user.name = userToken.name;
            user.surnames = userToken.surnames;
            user.rol_user = userToken.rol_user;
            user.imageUrl = userToken.imageUrl;
            user.isLoginUser = true;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem('token', token);
            
            this.verifyAccesPath(user);

          })
          .catch(function (error) {
            console.log(error);
            router.push("/price");
            localStorage.clear();
          });
        } else {
          this.verifyAccesPath({rol_user: "DEFAULT"});
        }
        
      },
      verifyAccesPath: function (user) {
        console.log(user);
        let allowPaths = [
          {
            rol_user: "CLIENT",
            allowPaths: ["/price", "/reservation", "/schedule"]
          },
          {
            rol_user: "EMPLOYEE",
            allowPaths: ["/employee/invoice/check-in", "/employee/invoice/validate", "/employee/invoice/edit"]
          },
          {
            rol_user: "ADMIN",
            allowPaths: ["/admin/user/create", "/admin/price/edit", "/admin/invoice/edit"]
          },
          {
            rol_user: "DEFAULT",
            allowPaths: ["/price", "/schedule"]
          }
        ]

        let routePath = router.history.current.fullPath;

        let userPathAllow = allowPaths.find(path => {
          return path.rol_user == user.rol_user
        });

        let findPathAllow = userPathAllow.allowPaths.find(path => {
          return path == routePath;
        });

        if(!findPathAllow){
          let path = this.getPathUser(user.rol_user);
          console.log(path)
          router.push(path);
        }
      },
      getPathUser: function(rol_user){
        switch (rol_user) {
          case "CLIENT":
            return "/price"
          case "EMPLOYEE":
            return "/employee/invoice/check-in"  
          case "ADMIN":
            return "/admin/user/create"
          case "DEFAULT":
              return "/price"  
        }
      }
    }
  }
}
