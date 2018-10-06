# OpenGift Github login/registration

OpenGift Github login/registration enables users to login / signup using github

## Installation

### Requirements
* Linux/Windows/Mac
* Node > 7.4.x


## Usage

### Pre-requisites

```
    1. Register your application on github.com
    2. GOTO https://github.com/settings/applications/new
    3. SET clientID, clientSecret, callbackURL
```

```
    4. COPY All three keys to your application file name ~/Desktop/giftopen/app.js
// app.js
    passport.use(new GithubStrategy({
        clientID: 'your app client id',
        clientSecret: 'your app client secret',
        callbackURL: 'http://localhost:3000/auth/callback'
        }, function(accessToken, refreshToken, profile, done){
        done(null, {
            accessToken: accessToken,
            profile: profile
        });
    }));
    
    5. cd ~/Desktop/giftopen
    6. npm install
    7. npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)