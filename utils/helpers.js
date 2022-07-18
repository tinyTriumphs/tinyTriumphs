// module.exports = {
//   format_date: (date) => {
//     Format date as MM/DD/YYYY
//     return date.toLocaleDateString();
//   },
//   format_amount: (amount) => {
//     format large numbers with commas
//     return parseInt(amount).toLocaleString();
//   },
//   get_emoji: () => {
//     const randomNum = Math.random();

//     Return a random emoji
//     if (randomNum > 0.7) {
//       return `<span for="img" aria-label="lightbulb">💡</span>`;
//     } else if (randomNum > 0.4) {
//       return `<span for="img" aria-label="laptop">💻</span>`;
//     } else {
//       return `<span for="img" aria-label="gear">⚙️</span>`;
//     }
//   },
// };

// const handlebarsHelper = Handlebars.registerHelper('objToList', function(context) {
//     function toList(obj, indent) {
//       var res=""
//       for (var k in obj) { 
//           if (obj[k] instanceof Object) {
//               res=res+k+"\n"+toList(obj[k], ("   " + indent)) ;
//           }
//           else{
//               res=res+indent+k+" : "+obj[k]+"\n";
//           }
//       }
//       return res;
//     }    
//     return toList(context,"");
//   });

// module.exports = handlebarsHelper;
