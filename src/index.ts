import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from 'body-parser';
//Start the gqlServer
async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;


  //middlewares
  app.use(express.json());
  app.use(bodyParser.json());

//gql server config
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
    hello:String
    }
    `,
    resolvers: {
        Query:{
            hello:()=>`hey there, I am graphql server`
        }
    },
  });

  ///start gqlServer
  await gqlServer.start();

  app.get('/',(req,res)=>{res.json({msg:"Something"})})

  //for all gql routes
  app.use("/graphql", expressMiddleware(gqlServer));



  app.listen(PORT, () => {
    console.log("Server is running on port :" + PORT);
  });
}

startServer();
