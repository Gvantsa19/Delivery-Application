<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## User API List:

```js
@Post/api/v1/user/registration - For all Users - Register a User
{
	fullName: string,
	email: string,
	password: string,
	phoneNumber: string,
	creditCard: string,
}

@Post/api/v1/user/login
{
	email: string,
	password: string,
}

@Get/api/v1/user/:userId/orders
{
	// sort
	// searchBy
	// pagination
}

@Get/api/v1/user/
{
	// only for managers
}

@Patch/api/v1/user/userId
{
	//to update propperties
}

@Delete/api/v1/user/userId
{
	//to deactivate account, deleted = true;
}



```

## Order's API List:

```js
@Post/api/v1/orders/
{
	size: enum,
	souce: enum,
	notIncluded: string[],
	address: string,
	userId: string,
}
@Delete /api/v1/orders/orderId
{
	//if status===processing
}

@Patch/api/v1/Oorders/:orderId
{
	//if status===processing
}

@Get/api/v1/orders/
{
	// only for managers
	// Sort, Pagination, searchBy
}

@Patch/api/v1/order/:orderId
{
	//update status - only for managers' use
}



```

## Managers API List:

```js
@Post/api/v1/admin/registration
{
	fullName: string,
	email: string,
	password: string,
	phoneNumber: string,
}

@Post/api/v1/admin/login
{
	email: string,
	password: string,
}

@Delete/api/v1/adim/adminId
{
	//deactivate admin's account
}

@Patch/api/v1/admin/adminId
{
	//update admin's informaiton
}
```

# Schemas

```js
userSchema{
	id: string,
	fullname: string,
	email: string,
	hash: string,
	token: stirng,
	phoneNumber: string,
	creditCard: string,
	loginDate : date,
	address: string,
	deleted: boolean,
}

adminSchema{
	id: string,
	fullname: string,
	email: string,
	hash: string,
	token: string,
	phoneNumber: string,
	loginDate: date,
	deleted: boolean,
}

orderSchema{
	id: string,
	size: enum,
	souce: enum,
	notInclude: enum[],
	status: enum,
	address: string,
	userId: string,
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
