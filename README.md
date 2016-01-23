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
    roomId: string
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
    roomId: string
}
```

#### GET /connections/current/room/:id/users : returns all current connected users in a room 

```json
{
    roomId: string
}
```

#### GET /connections/current/nb : returns the number of connected users

```json
{
}
```

#### GET /connections/current/promo : returns connected users by promo

```json
{
}
```

#### GET /connection/:username : returns if a user is connected or not

```json
// GET REQUEST DATA
{
    username: string
}

// RESPONSE DATA
{
    connected: boolean
}
```



