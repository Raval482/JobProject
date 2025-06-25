
// import {QueryClient, QueryClientContext} from "@tanstack/react-query"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryclient = new QueryClient()

// const ReactQueryProvider = () => {
//   return (
//         <QueryClientContext client={queryclient}>

//         </QueryClientContext>
//   )
// }

// export default ReactQueryProvider



const queryClient = new QueryClient


const QueryProvider = ({children}) =>{
    return ( 
       <QueryClientProvider client={queryClient}>
            {children}
       </QueryClientProvider>

    )
}

export default QueryProvider