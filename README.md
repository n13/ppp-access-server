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
