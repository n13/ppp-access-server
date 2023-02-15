# ppp-access-server
Temporary PPP access solution

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

```
