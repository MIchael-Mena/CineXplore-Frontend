const getEnv = (key: string) => {
  const envVar = import.meta.env[key]
  if (!envVar) throw new Error(`La variable de entorno ${key} no esta seteada`)
  return envVar
}

const env = {
  apiUrl: getEnv('VITE_API_URL'),
}

export default env
