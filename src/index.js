const { GraphQLServer } = require('graphql-yoga')

// 1
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
let idCount = links.length;

const resolvers= {
    Query:{
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root,args) => {
            return links.find(c=>c.id === args.id);
        }
    },
    Mutation:{
        post:(root,args) =>{
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url:args.url,
            }
            links.push(link)
            return link
        },
        update:(root,args) =>{
            let link = links.find(c=>c.id === args.id);
            if (link == null)
            {
                throw ("Not Found");
            }
            link.description = args.description;
            link.url = args.url;
            return link;
        }
    }
}

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers
})

server.start(()=>console.log(`Server is running on http://localhost:4000`))