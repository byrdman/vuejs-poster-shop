new Vue ({
   el: '#app',
   data: {
      total: 0,
      items: [
         { id: 1, title: 'Item 1', price: 1.11 },
         { id: 2, title: 'Item 2', price: 2.22 },
         { id: 3, title: 'Item 3', price: 3.33}
       ],
       cart: [],
       search: ''
   },
   methods: {
      onSubmit: function() {
          console.log("onSubmit");
          this.$http
             .get('/search/'.concat('90s'))
             .then(function(res) {
                 console.log(res);
             });
      } ,
      addItem: function(index) {
         console.log("addItem: "  + index);
         var item = this.items[index];
         this.total += item.price;
         var found = false;
         for (var i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === item.id) {
               found = true;
               this.cart[i].qty++;
               break;
            }
         }

         if (!found) {
             this.cart.push({
                 id: item.id,
                 title: item.title,
                 qty: 1,
                 price: item.price
             });
         }
      },
       inc: function(item) {
          item.qty++;
          this.total += item.price;
       },
       dec: function(item) {
          item.qty--;
          this.total -= item.price;
          if (item.qty === 0) {
              for (var i = 0; i < this.cart.length; i++) {
                  if (this.cart[i].id === item.id) {
                      this.cart.splice(i, 1);
                      break;
                  }
              }
          }
       }
   },
    filters: {
       currency: function(price) {
           return '$'.concat(price.toFixed(2));
       }
    }
});