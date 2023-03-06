# SocialSim-Parents

_An interactive survey of Cybersecurity hygiene for parents_

This project implements a game-like survey for informing parents about the
implications of their social media habits with respect to life circumstances
and their families; it is intended as an educational resource provided by the
[AISP Lab][aisp].

<h2 style="color: red;">Known Security Issues</h2>

Currently all validation is on the front-end, and password hashes are
synchronized to the frontend for every session in full. _These hashes are not
salted,_ and so they might be found in rainbow tables.

This is the state of the project as I received it, remaining as of this commit.
For now I cannot recommend its usage securely, outside of experimental
circumstances. Pull requests are welcome.

## Deployment

On tested systems, the webpack "developer" configuration is broken; help
wanted.

For a production build:

```sh
npm install
node run buildProd
node run start
```

This runs a server process by default listening to port 3000. It is wise to use
a reverse proxy, such as nginx, to connect to the application.

### Changing roots

Many code paths used to assume `/` was the root implicitly; now `ROOT_PATH` in
`src/js/components/Query.js` sets the prefix for most known external queries,
with the webpack `output.publicPath` option controlling most assets. This
provides about four places that need to be changed to re-root the application
as of this writing.

## License

The provenance of this code is largely from another group of student developers
who wrote this as an academic project. While I (Graham Northup) legally
disclaim rights to this, acting on behalf of the Public, I cannot give
unambiguous claim that the other author(s) will not assert their copyright.
However, upstream (the original author) seems to have permitted GitHub to
publicly host the project, therefore I assume its distribution in unchanged
form is unlimited.

[aisp]: https://www.ghazinour.com/AISP/
