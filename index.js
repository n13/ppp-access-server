import Fastify from 'fastify';
import PPP from './src/PPP.js'
// require('dotenv').config()
import { config } from 'dotenv';
config();

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
  var profile = res[account]
  if (!profile) {
    return reply.status(404).send("No profile found: "+account)
  }
  profile = await addUrls(profile)
  return profile
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

const addUrls = async (profileObj) => {
  const profileApi = PPP.profileApi();
  if (profileObj.publicData) {
    if (profileObj.publicData.avatar) {
      profileObj.avatarUrl = await profileApi.getImageUrl(profileObj.publicData.avatar, profileObj.publicData.s3Identity);
    }
    if (profileObj.publicData.cover) {
      profileObj.coverUrl = await profileApi.getImageUrl(profileObj.publicData.cover, profileObj.publicData.s3Identity);
    }  
  }
  return profileObj
}

fastify.get('/getImageUrl/:s3Identity/:image', async (request, reply) => {
  const { image, s3Identity } = request.params;
  console.log("get image " + JSON.stringify({ image, s3Identity }))
  const profileApi = PPP.profileApi();
  const res = await profileApi.getImageUrl(image, s3Identity);
  console.log("res: " + JSON.stringify(res, null, 2))
  return res;
});

const start = async () => {
  try {

    const environment = process.env.ENVIRONMENT || 'prod'
    const port = process.env.PORT || 9109;

    // PPP setup
    PPP.configure(environment)

    await fastify.listen({ port, host: '0.0.0.0' }, () =>
      console.log('Server for ' + environment + ' listening at port : ' + port)
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
