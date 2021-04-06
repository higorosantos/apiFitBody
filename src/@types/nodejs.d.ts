namespace NodeJS {
    interface ProcessEnv {
      MONGO_USER: string,
      MONGO_PWD:string,
      MONGO_DATABASE:string,
      PORT:number,
      BUCKET_NAME:string,
      AWS_ACCESS_KEY_ID:string,
      AWS_SECRET_ACCESS_KEY:string,
      AWS_DEFAULT_REGION:string,
      JWT_SECRET:string,
      TOKEN_VALID:string,
      EMAIL_USER:string,
      EMAIL_HOST:string,
      EMAIL_PASS:string,
      EMAIL_PORT:number,
      JWT_ACC_ACTIVE:string
    }
  }