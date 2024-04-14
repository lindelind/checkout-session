# checkout-session


Detta projekt implementerar en webbshop med möjlighet att lägga order och genomföra betalningar med integration mot Stripe. Användare kan registrera sig, logga in och utföra betalningar med validering. Projektet inkluderar även integration med PostNord API för val av utlämningsställe.

Krav som uppfyllts: 
* Produkter listas på en sida, hämtade från Stripe.
* Möjlighet att lägga till produkter i kundvagnen.
* Placering av order genom Stripe.
* Registrering av användare resulterar i skapandet av en "Customer" i Stripe och sparar uppgifterna i en JSON-fil. Lösenord är krypterade.
* Inloggning som kund krävs för att genomföra ett köp.
* Placerade ordrar sparas till en JSON-fil och endast efter genomförd betalning.
* Ordern innehåller information om ordernummer, datum, kund, produkter, totalpris och utlämningsställe.

Krav för väl godkänt:
* Möjlighet att ange rabattkod för rabatt på köp via Stripe.
* Inloggade användare kan se sina lagda ordrar.
* Kund kan välja utlämningsställe innan betalning med hjälp av PostNord API, hämtningen görs utifrån kunds registrerade adress.



# Du bygger och kör projektet såhär:

- cd client
- npm i
- npm run dev

-  cd server 
-  npm i
-  nodemon server

[Githublänk:](https://github.com/lindelind/checkout-session)
