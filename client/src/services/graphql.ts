export type GraphqlParams = {
  query: string,
  variables?: Record<string, string | number | boolean>
}

const graphqlService = async ({ query, variables }: GraphqlParams) => {
  const response = await fetch('http://localhost:8080/graphql', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    })

  })
  return response.json()
}

export default graphqlService
