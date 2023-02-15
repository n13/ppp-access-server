# ppp-access-server
Temporary PPP access solution

# Installing locally

```
git clone (this repo)
cd ppp-access-server
npm i
npm run start
```

## get profile

get a profile (public data only)

```
curl --location --request GET 'http://HOST:PORT/profile/illumination'
```

## get profiles

get a list of profiles (public data only)

```
curl --location --request POST 'http://HOST:PORT/profiles' \
--header 'Content-Type: application/json' \
--data-raw '{
    "eosAccounts":["illumination"]
}'
```

## resolve images

Images are either avatar or cover as image ID, and with the s3 id, they can be resolved here

```
curl --location --request GET 'http://HOST:PORT/getImageUrl/<s3Identity>/<avatar>'
```

returns: Image URL


## search profiles
```
curl --location --request POST 'http://HOST:PORT/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search":"the", 
    "limit":10, 
    "lastEvaluatedKey":""
}'
```
