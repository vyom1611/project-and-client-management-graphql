import { gql, useQuery } from "@apollo/client"

const GET_CLIENTS = gql`
    query getClients {
        client {
            id
            name 
            email
            phone
        }
    }
`

function Clients(props) {
    const { loading, error, data } = useQuery(GET_CLIENTS)

    return (
        <div></div>
    );
}

export default Clients;