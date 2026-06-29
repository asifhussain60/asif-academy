---
name: user-mgmt
description: >
  Manage asif-academy user access and roles via the Auth0 Management API.
  Load whenever granting or revoking site access, assigning or removing the
  presenter role, or auditing who has access. All operations go through the
  Auth0 Action — never through the dashboard.
---

# User management — asif-academy

All access control lives in a single Auth0 Action called `asif-academy-access-control`.
Every operation below reads the live Action code, modifies the right list, patches, and
deploys. The deploy step is mandatory — changes don't take effect until built.

## Credentials (from `.env.local`)

```
DOMAIN        = kashkole.auth0.com
M2M_CLIENT_ID = JxnLAi8ogOKYSSU2nz3gWUanf9bQHqhC
M2M_SECRET    = (read from .env.local — AUTH0_MGMT_CLIENT_SECRET)
ACTION_ID     = 39d35fda-fc3e-4f0c-984d-e2a36a370cde
ROLES_CLAIM   = https://asif-academy.pages.dev/roles
```

Never hard-code the secret in chat or logs. Always read it from `.env.local` at runtime.

## The Action's two lists

The Action (`onExecutePostLogin`) maintains two arrays. **Both must stay lowercase email.**

- **`ALLOWED`** — who can log in to the site at all. Anyone not in this list is denied at login.
- **`PRESENTERS`** — subset of ALLOWED who get `roles: ["presenter"]` in their ID token,
  which gates the talking points panel in the deck.

`asifhussain60@gmail.com` (Asif, admin) is always in both lists. Never remove it.

## Standard Python helper — use for every API call

```python
import urllib.request, urllib.error, json

def auth0_token(env):
    req = urllib.request.Request(
        f"https://{env['DOMAIN']}/oauth/token",
        data=json.dumps({
            "client_id": env["M2M_CLIENT_ID"],
            "client_secret": env["M2M_SECRET"],
            "audience": f"https://{env['DOMAIN']}/api/v2/",
            "grant_type": "client_credentials",
        }).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())["access_token"]

def auth0(method, path, token, domain, body=None):
    req = urllib.request.Request(
        f"https://{domain}/api/v2/{path}",
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method=method,
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return json.loads(e.read())
```

Read credentials from `.env.local`:

```python
env = {}
with open(".env.local") as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, _, v = line.partition("=")
            env[k.strip()] = v.strip()

DOMAIN     = env["VITE_AUTH0_DOMAIN"]
ACTION_ID  = "39d35fda-fc3e-4f0c-984d-e2a36a370cde"
token      = auth0_token({"DOMAIN": DOMAIN, "M2M_CLIENT_ID": env["AUTH0_MGMT_CLIENT_ID"], "M2M_SECRET": env["AUTH0_MGMT_CLIENT_SECRET"]})
```

## Operations

### Read current access lists

```python
action = auth0("GET", f"actions/actions/{ACTION_ID}", token, DOMAIN)
print(action["code"])
```

Parse the live lists by reading the code. The two arrays are on clearly labelled lines.

### Grant site access (add to ALLOWED)

1. Read current code.
2. Add `"newemail@gmail.com"` to the `ALLOWED` array (lowercase, maintain alphabetical order).
3. Patch + deploy (see below).

### Revoke site access (remove from ALLOWED and PRESENTERS)

1. Read current code.
2. Remove the email from both `ALLOWED` and `PRESENTERS`.
3. Patch + deploy.
4. Confirm by reading the deployed code back.

### Grant presenter role (add to PRESENTERS)

Email must already be in `ALLOWED`. Add it to `PRESENTERS`. Patch + deploy.

### Revoke presenter role (remove from PRESENTERS only)

Remove from `PRESENTERS`, leave in `ALLOWED`. Patch + deploy.

### Patch and deploy (mandatory after every edit)

```python
new_code = """..."""   # full updated Action code

result = auth0("PATCH", f"actions/actions/{ACTION_ID}", token, DOMAIN, {"code": new_code})
print("patch:", result.get("status"))

deployed = auth0("POST", f"actions/actions/{ACTION_ID}/deploy", token, DOMAIN, {})
print("deploy:", deployed.get("status"))   # must be "built"
```

Always verify `deploy status == "built"` before reporting success.

### Check if a specific user has logged in

```python
import urllib.parse
users = auth0("GET", f"users?q=email%3A{urllib.parse.quote(email)}&search_engine=v3", token, DOMAIN)
print(users)   # empty list = never logged in (access still works once they do)
```

A user not yet in Auth0 can still be added to the lists — the claim is injected at first login.

## Frontend mapping

| Auth0 Action list | Frontend effect |
|---|---|
| `ALLOWED` | `AuthGuard` lets them past the login wall |
| `PRESENTERS` | `useHasRole('presenter')` → `true`; talking points panel visible |
| `ADMIN_EMAIL` constant in `src/auth/admin.ts` | `AdminGuard` gates `/present` route and ⧉ button |

The admin constant is a code change (not an Action change). Only `asifhussain60@gmail.com`
is ever admin. The presenter role is the right mechanism for everyone else who needs
talking points access.

## Invariants — never break these

- `asifhussain60@gmail.com` is always in `ALLOWED` and `PRESENTERS`.
- Every email in `PRESENTERS` must also be in `ALLOWED`.
- All emails lowercase (Auth0 normalises to lowercase on login).
- Always deploy after patching — a `status: pending` Action is not live.
- Never commit credentials to git. Credentials live in `.env.local` (gitignored).

## After every operation — confirm

Read the deployed code back and print both lists so the result is explicit:

```python
deployed = auth0("GET", f"actions/actions/{ACTION_ID}", token, DOMAIN)
# Print just the lines containing the arrays
for line in deployed.get("deployed_version", {}).get("code", deployed.get("code","")).splitlines():
    if "ALLOWED" in line or "PRESENTERS" in line or "@" in line:
        print(line)
```
