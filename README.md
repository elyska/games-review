
To run the server:
```shell
$  deno run --allow-all --unstable --import-map=map.json index.js
```

The website database has been added with a root password of `p455w0rd` and a single **accounts** table which is pre-configured with a single account:

username: `doej`

password: `p455w0rd`

# Code Quality
```shell
$  deno lint --config deno.json
```

# Unit Testing
```shell
$  deno test --allow-all --import-map test.json ./tests
```

# Integration Testing
```shell
$  deno test --allow-all --unstable --import-map map.json ./tests
```
# Customer (UAT)
```shell
$  deno test --allow-all --unstable uat/
```


# Link to the live site
https://ryklovae-sem2.herokuapp.com/login

If you can't log in, the free database already expired.