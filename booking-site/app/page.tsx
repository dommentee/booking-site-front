//we use Link so code is not re downloaded  with each page//client side navagation

//rendering Enviroments ====
//client web Browser- more related to react
//-large bundles to sent to the client
//-Resource heavy
//-No SEO
//-less secure

//Server Node Js Runtime
//-only send essential bunddles to client/ small bundles
//-Resource efficient
//-SEO
//-Can keep sencitive information on the server/ more secure

//Cons- Server Components can not listen to browser events, click, onchange
//cannot access browser API's, local storage
//cannot maintain state
//cannot Use effects

//All files in the Appdefalut to server components only use client when they are needed
//in next js all compoents in the app folder are server components by default
//use cleint to create client side components like buttons

//fetcing on the client --these method had large bunddles, resouce intensive
//-useState() + use Effect()
//-React Query- extra request for data

//-nextjs method uses a async function
//-no state, no use effect

//always fetch data in server components

//caching -s a bennifit---
//-caching is storing data somewhere that is fater to access -memory, file system, network, next js has a data cache

//static rendering -rendering at built time
//-client side
//-serside-side-static(at build)-dynamic(at request time)

export default function Home() {
  return (
    <main>
      <div>
        <h1>home</h1>
      </div>
    </main>
  );
}
