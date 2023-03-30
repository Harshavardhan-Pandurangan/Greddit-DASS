# DASS - ASSIGNMENT 1

# GREDDIIT

## Harshavardhan P

## 2021111003

</br>

### Running the code

Download and unzip the code. Open the terminal in the directory and run the following command

```bash
sudo docker-compose up --build
```

Now the server and the client are running. Open the browser and go to the following link

```bash
http://localhost:4000/
```

</br>

### Models

The system has 4 models: users, subgreddiits, posts and reports. The models are defined in the models folder. The models are defined using mongoose.

The models have their own router files and control files which have the functions to perform.

</br>

### User Interface

The user interface is built using React, Material UI. All the pages are routed using react-router-dom.

### Security

The security is implemented using JWT. The JWT is stored in the local storage of the browser. The JWT is sent in the header of the request to the server. The server verifies the JWT and then performs the operation.

All frontend requests are made using axios.

Sending direct API requests to the server is not possible as the JWT is not sent in the header. Also the server checks for permissions before performing the operation. This ensures that the server is secure.
