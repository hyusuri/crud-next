## About Project

Project CRUD people using Next.js and MongoDB.

## Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Mongoose js](https://mongoosejs.com/)
* [Semantic UI](https://semantic-ui.com/)
* [Isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch)

## Setup

1. Clone repository
    ```sh
    git clone https://github.com/hyusuri/crud-next.git
    ```
2. Install package
    ```sh
    yarn install
    ```
3. Add .env
  
    make .env file and add  `MONGO_URI`  for connection database.
    ```bin
    MONGO_URI=<connection_string>
    ```
    and `API_URI=` for local development using http://localhost:3000
    ```bin
    API_URI=http://localhost:3000
    ```

4. Run project
    ```sh
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with browser to see the result.

Project can be access at https://crud-next-eta.vercel.app/
