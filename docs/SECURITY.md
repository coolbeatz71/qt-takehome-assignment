# Security Documentation

## Overview

This application uses **ECDSA P-384** with **SHA-384** to cryptographically sign user emails, ensuring data integrity and authenticity.

## How It Works

### 1. Key Generation (Backend - First Run)
- Generates ECDSA P-384 key pair
- Saves to `backend/keys/private-key.pem` and `public-key.pem`
- **⚠️ Never commit private keys!**

### 2. Email Signing (Backend)
- When user created/updated → email is signed with private key
- Signature stored in database as base64
- Only backend can create valid signatures

### 3. Signature Verification (Frontend)
1. Fetch public key from `/api/public-key`
2. Export users from `/api/users/export` (Protocol Buffer)
3. Verify each signature using Web Crypto API
4. Display only users with valid signatures

## Verification Flow

```
GET /api/users/export → Protocol Buffer data
GET /api/public-key   → Public key
Decode Protobuf       → User list
Verify signatures     → Filter valid users
Display               → Verified users only
```

## Why It Matters

**Data Integrity**: Detects any tampering with email data
**Authenticity**: Only backend can create valid signatures
**Tamper-Proof**: Invalid signatures are caught immediately

## Technical Details

- **Algorithm**: ECDSA P-384 (elliptic curve)
- **Hash**: SHA-384
- **Key Size**: 384 bits
- **Signature Size**: ~96 bytes

## Best Practices

- Add `backend/keys/` to `.gitignore`
- Use HTTPS in production
- Rotate keys periodically
- Monitor verification failures
- Use key management services in production
