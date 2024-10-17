import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Map from './Map';


const client = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Map />
    </QueryClientProvider>
  )
};

export default App;
