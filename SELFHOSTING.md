# Self-Hosting on Raspberry Pi with Docker

Everything runs in Docker containers — the only thing you need to install on the RPi is Docker itself.

## Architecture

```
Internet → Cloudflare edge → cloudflared (container)
                                ├── yourdomain.com     → nuxt:3000
                                └── cms.yourdomain.com → pocketbase:8090
```

Three containers on a shared internal network:
- **nuxt** — Nuxt SSR app (your website)
- **pocketbase** — headless CMS with a built-in admin UI
- **cloudflared** — Cloudflare Tunnel daemon, connects outward to Cloudflare

No ports are opened on the RPi. No Nginx. No firewall changes.

---

## 1. Install Docker on the RPi

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER   # so you can run docker without sudo
# log out and back in for the group change to take effect
```

---

## 2. Set Up Cloudflare Tunnel

You need a free Cloudflare account with your domain added.

1. Go to [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/) → **Networks → Tunnels**
2. Click **Create a tunnel** → give it a name (e.g. `rpi-site`) → **Save**
3. Choose **Docker** as the connector — copy the displayed `docker run` command and extract the long token string from it (the value after `--token`)
4. Under **Public Hostnames**, add two routes:

   | Subdomain | Domain | Service |
   |-----------|--------|---------|
   | *(blank)* | yourdomain.com | `http://nuxt:3000` |
   | `cms` | yourdomain.com | `http://pocketbase:8090` |

5. Save — the DNS records are created automatically in Cloudflare.

---

## 3. Clone the Repo and Configure

```bash
git clone https://github.com/abeldewit/abeldewit.github.io.git ~/site
cd ~/site
cp .env.example .env
```

Edit `.env` and fill in the two values:

```
NUXT_PUBLIC_POCKETBASE_URL=https://cms.yourdomain.com
CLOUDFLARE_TUNNEL_TOKEN=<token from step 2>
```

---

## 4. Start Everything

```bash
docker compose up -d --build
```

This builds the Nuxt image and starts all three containers. On first run it will pull the Pocketbase and Cloudflare images (~100 MB combined).

Check that all containers are running:

```bash
docker compose ps
docker compose logs -f   # Ctrl+C to exit
```

---

## 5. Set Up Pocketbase

1. Visit `https://cms.yourdomain.com/_/` in your browser
2. Create your admin account (first-time only)
3. Create the following collections:

### `hero_keywords`
| Field    | Type   | Notes                          |
|----------|--------|--------------------------------|
| keyword  | Text   | e.g. "Forensic Data Scientist" |
| order    | Number | Controls display sequence      |

### `experiences`
| Field       | Type      | Notes                                    |
|-------------|-----------|------------------------------------------|
| type        | Text      | "Work" or "Education"                    |
| role        | Text      | Job title / degree name                  |
| org         | Text      | Company or institution                   |
| period      | Text      | e.g. "Oct 2024 – Present"                |
| location    | Text      | e.g. "Amsterdam, Netherlands"            |
| color       | Text      | Hex colour, e.g. "#c2410c"               |
| logo        | File      | Company/institution logo image           |
| description | Text      | Long text                                |
| tags        | JSON      | Array of strings, e.g. `["Python","ML"]` |
| order       | Number    | Controls display sequence (low = top)    |

### `certifications`
| Field  | Type   | Notes                     |
|--------|--------|---------------------------|
| name   | Text   | Certificate name          |
| issuer | Text   | Issuing organisation      |
| year   | Text   | e.g. "Mar 2025"           |
| color  | Text   | Hex colour                |
| order  | Number | Controls display sequence |

### `projects`
| Field       | Type   | Notes                         |
|-------------|--------|-------------------------------|
| icon        | Text   | Emoji, e.g. "🧬"              |
| title       | Text   |                               |
| description | Text   | Long text                     |
| gradient    | Text   | CSS gradient string           |
| github_url  | URL    | Optional                      |
| demo_url    | URL    | Optional                      |
| tags        | JSON   | Array of strings              |
| order       | Number | Controls display sequence     |

### `resume`
| Field | Type | Notes                                           |
|-------|------|-------------------------------------------------|
| file  | File | Upload your CV PDF here (one record only)       |

---

## 6. Local Development (without Docker)

```bash
npm install
npm run dev
```

Pocketbase can be run separately for local dev:

```bash
# Download the ARM64 binary from https://github.com/pocketbase/pocketbase/releases
./pocketbase serve   # runs on http://localhost:8090
```

The site falls back to hardcoded content when Pocketbase is unreachable, so `npm run dev` works even without Pocketbase running.

---

## Deploying Updates

```bash
cd ~/site
git pull
docker compose up -d --build
```

Docker rebuilds the Nuxt image and restarts only the changed containers. Pocketbase data is preserved in the `pb_data` named volume.

---

## Useful Commands

```bash
# View running containers
docker compose ps

# Tail logs for a specific service
docker compose logs -f nuxt
docker compose logs -f pocketbase

# Restart a single service
docker compose restart nuxt

# Stop everything
docker compose down

# Stop and remove the Pocketbase data volume (destructive — deletes all CMS content)
docker compose down -v
```
