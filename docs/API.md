# API Documentation

## Base URL

```
http://localhost:3000
```

## Health & Information

### Health Check
```http
GET /health
```

**Response**: `200 OK`
```json
{ "status": "ok" }
```

### API Information
```http
GET /
```

**Response**: `200 OK`
```json
{
  "name": "User Management API",
  "version": "1.0.0"
}
```

## User Management

### Get All Users
```http
GET /api/users
```

**Response**: `200 OK`
```json
{
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "signature": "base64-encoded-signature"
    }
  ]
}
```

### Get User By ID
```http
GET /api/users/:id
```

**Response**: `200 OK` or `404 Not Found`

### Create User
```http
POST /api/users
```

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "role": "user",
  "status": "active"
}
```

**Roles**: `admin`, `user`, `guest`
**Statuses**: `active`, `inactive`

**Response**: `201 Created`

### Update User
```http
PUT /api/users/:id
```

**Request Body**:
```json
{
  "email": "updated@example.com",
  "role": "admin",
  "status": "inactive"
}
```

**Response**: `200 OK` or `404 Not Found`

### Delete User
```http
DELETE /api/users/:id
```

**Response**: `200 OK` or `404 Not Found`

## Analytics

### Get User Statistics
```http
GET /api/users/stats
```

**Response**: `200 OK`
```json
{
  "data": [
    {
      "date": "2024-01-01",
      "count": 5
    },
    {
      "date": "2024-01-02",
      "count": 3
    }
  ]
}
```

Returns daily user creation counts for the last 7 days (timezone: Africa/Kigali UTC+02:00).

## Data Export

### Export Users as Protocol Buffer
```http
GET /api/users/export
```

**Response**: `200 OK`
**Content-Type**: `application/octet-stream`
**Body**: Binary Protocol Buffer data

**Schema**:
```protobuf
message User {
  int32 id = 1;
  string email = 2;
  string role = 3;
  string status = 4;
  string createdAt = 5;
  string signature = 6;
}

message UserList {
  repeated User users = 1;
  int32 total = 2;
}
```

## Cryptography

### Get Public Key
```http
GET /api/public-key
```

**Response**: `200 OK`
```json
{
  "data": {
    "publicKey": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----",
    "algorithm": "ECDSA",
    "curve": "P-384",
    "hash": "SHA-384"
  }
}
```

Use this key to verify user email signatures on the client side.

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common Status Codes**:
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource doesn't exist
- `500 Internal Server Error`: Server error

## Examples

### Create User with cURL
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "role": "user",
    "status": "active"
  }'
```

### Get Statistics
```bash
curl http://localhost:3000/api/users/stats
```

### Export to File
```bash
curl http://localhost:3000/api/users/export -o users.pb
```

### Get Public Key
```bash
curl http://localhost:3000/api/public-key
```
