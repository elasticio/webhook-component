export = async function verifyCredentials(cfg: any) {
  const { type, apiKey, basic, hmacSecret } = cfg?.auth || {};
  this.logger.info('Starting credentials verification');

  switch (type) {
    case 'BASIC':
      if (!basic?.username) throw new Error('Username is required for Basic auth');
      if (!basic?.password) throw new Error('Password is required for Basic auth');
      break;
    case 'API_KEY':
      if (!apiKey?.headerName) throw new Error('Header Name is required for API Key auth');
      if (!apiKey?.headerValue) throw new Error('Header Value is required for API Key auth');
      break;
    case 'HMAC':
    case 'HMAC_TWO':
      if (!hmacSecret?.headerValue) throw new Error('HMAC verification shared secret is required for HMAC auth');
      break;
    default:
  }
  this.logger.info('Credentials verification completed successfully');
  return { verified: true };
}
