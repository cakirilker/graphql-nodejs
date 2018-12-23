const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers= {
    Query:{
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root,args,context,info) =>{
            console.log(PrismaConfig.endpoint);
            return context.db.query.links({},info)
        },
        // link: (root,args) => {
        //     return links.find(c=>c.id === args.id);
        // }
    },
    Mutation:{
        post:(root,args,context,info) =>{
            return context.db.mutation.createLink({
                data:{
                    url: args.url,
                    description: args.description
                },
            }, info)
        },
        // update:(root,args) =>{
        //     let link = links.find(c=>c.id === args.id);
        //     if (link == null)
        //     {
        //         throw ("Not Found");
        //     }
        //     link.description = args.description;
        //     link.url = args.url;
        //     return link;
        // }
    }
}

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers,
    context: req=>({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/ilker-bc2254/database/dev',
            secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkYXRhYmFzZUBkZXYiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQzNDMxNjU1LCJleHAiOjE1NDQwMzY0NTV9.iFxxlk9ijatj6ElqXbo4p5pTvKC-Uj6avTq2JgQDoNQ',
            debug:true
        })
    })
})

server.start(()=>console.log(`Server is running on http://localhost:4000`))