import Fastify from 'fastify';
import PPP from './src/PPP.js'

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return { randomNumber: Math.random() };
});

fastify.get('/profile/:account', async (request, reply) => {
  const { account } = request.params;
  const profileApi = PPP.profileApi();
  const res = await profileApi.getProfiles([account]);
  return res[account]
});

fastify.post('/profiles', async (request, reply) => {
  const { eosAccounts } = request.body;
  const profileApi = PPP.profileApi();
  const res = await profileApi.getProfiles(eosAccounts);
  return { res };
});

fastify.post('/search', async (request, reply) => {
  const { search, limit, lastEvaluatedKey } = request.body;
  const profileApi = PPP.profileApi();
  const res = await profileApi.searchProfiles(search, limit, lastEvaluatedKey);
  return res.items;
});

fastify.get('/getImageUrl/:image/:s3Identity', async (request, reply) => {
  const { image, s3Identity } = request.params;
  console.log("get image " + JSON.stringify({ image, s3Identity }))
  const profileApi = PPP.profileApi();
  const res = await profileApi.getImageUrl(image, s3Identity);
  console.log("res: " + JSON.stringify(res, null, 2))
  return res;
});

const start = async () => {
  try {

    // PPP setup
    PPP.configure('prod')

    // fastify setup
    const port = process.env.port || 9109;
    await fastify.listen({ port, host: '0.0.0.0' }, () =>
      console.log('SERVER LISTENING AT PORT : ' + port)
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
