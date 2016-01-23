# smseyes
A dashboard (Mobile application and Web application) that shows all the PC’s at EPITA rooms. Are they available or not?  Who is connected? The system can also track a user and search which room he is connected, and can analyze the user’s connection periods

# API

#### GET /rooms : returns all the rooms

```json
{
}
```

#### GET /rooms/:id : returns room by id

```json
{
}
```

#### GET /rooms/availability : returns the percentage of availability by rooms

```json
{
}
```

#### GET /connections/current/room/:id : returns all current connections in a room

```json
{
}
```

#### GET /connections/current/room/:id/users : returns all current connected users in a room 

```json
{
}
```

#### GET /connections/current/nb : returns the number of connected users

```json
// SUCCESS RESPONSE DATA
{
    nb: integer
}
```

#### GET /connection/:username : returns if a user is connected or not

```json
// GET REQUEST DATA
{
    username: string
}

// SUCCESS RESPONSE DATA
{
    connected: boolean
}
```



