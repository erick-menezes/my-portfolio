import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Swal from 'sweetalert2';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    Swal.fire({
      title: 'Erro',
      text: `Houve um erro na requisição.`,
      icon: 'error',
      confirmButtonText: 'Ok',
      footer: `<b>Código: ${graphQLErrors[0].extensions.code}</b>`
    })
  }
    
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
