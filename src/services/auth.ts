interface Response {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'aisahuahdsiudhsaabdaobadns',
        user: {
          name: 'Marcos',
          email: 'marcos@teste.com.br',
        },
      });
    }, 2000);
  });
}
