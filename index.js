var catalogue = [
  {image: "/images/bike-1.jpg", model: "BIKO45", price: 679, quantity: 0, inBasket: "false"},
  {image: "/images/bike-2.jpg", model: "ZOOK7", price: 799, quantity: 0, inBasket: "false"},
  {image: "/images/bike-3.jpg", model: "LIKO89", price: 839, quantity: 0, inBasket: "false"},
  {image: "/images/bike-4.jpg", model: "GEWO", price: 1206, quantity: 0, inBasket: "false"},
  {image: "/images/bike-5.jpg", model: "TITANS", price: 989, quantity: 0, inBasket: "false"},
  {image: "/images/bike-6.jpg", model: "AMIG39", price: 599, quantity: 0, inBasket: "false"}
]


var express = require('express');
var router = express.Router();
var panier = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop', { catalogue });
});


// --------------------------------------------------------------
// Gestion de l'ajout d'un élément dans le panier

router.get("/basket", function(req, res, next) {

    // Pour éviter de se retrouver avec une nouvelle ligne dès qu'un item est ajouté, on vérifie si cet item est présent dans le panier grâce à la valeur de la propriété inBasket dans la variable globale catalogue. Si true, alors on ajoute simplement 1 à la quantité du produit dans le panier. Sinon, on ajoute une card pour ce produit

    if (catalogue[req.query.position].inBasket == "false") {
      catalogue[req.query.position].inBasket = "true";
      catalogue[req.query.position].quantity = Number(catalogue[req.query.position].quantity) + 1;
      panier.push(catalogue[req.query.position]);
    }

    else if (catalogue[req.query.position].inBasket == "true") {
      for (var j=0; j<panier.length; j++) {
        if (req.query.model == panier[j].model) {
          panier[j].quantity = Number(panier[j].quantity) + 1;
        }
        else {
          console.log ("rien n'a été ajouté à l'élément");
        }
      }
    }

    res.render('basket', { panier });
  }
)


// --------------------------------------------------------------
// Gestion de la suppression d'un item du panier

router.get('/delete-item', function(req, res, next) {


    // Ici on supprime d'abord l'élément de la variable globale panier

    for (var j=0; j<panier.length; j++) {
      if (req.query.model == panier[j].model) {
        panier.splice(j, 1);

        // Il faut maintenant changer la valeur de la propriété inBasket dans la variable globale catalogue, sinon le vélo ne pourra plus être ajouté par la suite. De même on change la valeur de la propriété quantity à 0, comme ça si l'utilisateur clique à nouveau sur cet item, la quantité ajoutée au panier sera de 1, et non l'ancienne valeur + 1

        for (var k=0; k<catalogue.length; k++) {
          if (req.query.model == catalogue[k].model) {
            catalogue[k].inBasket = "false";
            catalogue[k].quantity = Number(0);
          }
          else {
            console.log("on ne fait rien");
          }
        }

      }
      else {
        console.log("si ce message s'affiche il y aune erreur");
      }
    }

    console.log(req.query);
    res.render('basket', { panier });
});


router.get('/update-item', function(req, res, next) {

    for (var i=0; i<panier.length; i++) {
      if (req.query.model == panier[i].model) {
          panier[i].quantity = Number(req.query.newQuantity);

          for (var j=0; j<panier.length; j++) {
            if (req.query.model == catalogue[j].model) {
                catalogue[j].quantity = Number(req.query.newQuantity);
            }
            else {
                console.log("la valeur n'a pas été modifiée pour ce produit");
            }
          }

      }

      else {
        console.log("la valeur n'a pas été modifiée pour ce produit");
      }
    }

    res.render('basket', { panier });
});



module.exports = router;
