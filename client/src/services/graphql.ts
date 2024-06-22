export type GraphqlParams = {
  query: string,
  variables?: Record<string, string | number | boolean>
}

export type GraphqlError = {
  errors?: {
    message: string
  }[]
}

const graphqlService = async <T>({ query, variables }: GraphqlParams): Promise<{ data: T } & GraphqlError> => {
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
  return response.json() as Promise<{ data: T } & GraphqlError>
}

export default graphqlService
