# Self-Hosting on Raspberry Pi

This guide covers hosting the site on a Raspberry Pi 3/4/5 (64-bit OS) with Pocketbase as the CMS, Nginx as a reverse proxy, and Cloudflare Tunnel for secure public access.

---

## Architecture

```
Internet → Cloudflare Tunnel → Nginx (RPi)
                                 ├── port 3000 → Nuxt SSR (Node.js / PM2)
                                 └── port 8090 → Pocketbase (CMS admin + API)
```

---

## 1. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # should be 20+
```

---

## 2. Install PM2

```bash
sudo npm install -g pm2
```

---

## 3. Install Pocketbase

Download the ARM64 binary from https://github.com/pocketbase/pocketbase/releases
(look for `pocketbase_linux_arm64.zip`):

```bash
mkdir ~/pocketbase && cd ~/pocketbase
wget https://github.com/pocketbase/pocketbase/releases/latest/download/pocketbase_linux_arm64.zip
unzip pocketbase_linux_arm64.zip
chmod +x pocketbase
```

Start it once to create the data directory and admin account:

```bash
./pocketbase serve
# Visit http://<rpi-ip>:8090/_/ to create your admin account
```

---

## 4. Create Pocketbase Collections

After logging into the admin UI at `http://<rpi-ip>:8090/_/`, create these collections:

### `hero_keywords`
| Field    | Type   | Notes                     |
|----------|--------|---------------------------|
| keyword  | Text   | e.g. "Forensic Data Scientist" |
| order    | Number | Controls display sequence |

### `experiences`
| Field       | Type   | Notes                                      |
|-------------|--------|--------------------------------------------|
| type        | Text   | "Work" or "Education"                      |
| role        | Text   | Job title / degree name                    |
| org         | Text   | Company or institution                     |
| period      | Text   | e.g. "Oct 2024 – Present"                  |
| location    | Text   | e.g. "Amsterdam, Netherlands"              |
| color       | Text   | Hex colour, e.g. "#c2410c"                 |
| logo        | File   | Company/institution logo image             |
| description | Text   | (Long text / editor)                       |
| tags        | JSON   | Array of strings, e.g. `["Python","ML"]`   |
| order       | Number | Controls display sequence (low = top)      |

### `certifications`
| Field  | Type   | Notes                       |
|--------|--------|-----------------------------|
| name   | Text   | Certificate name            |
| issuer | Text   | Issuing organisation        |
| year   | Text   | e.g. "Mar 2025"             |
| color  | Text   | Hex colour                  |
| order  | Number | Controls display sequence   |

### `projects`
| Field       | Type   | Notes                                    |
|-------------|--------|------------------------------------------|
| icon        | Text   | Emoji, e.g. "🧬"                         |
| title       | Text   |                                          |
| description | Text   | (Long text)                              |
| gradient    | Text   | CSS gradient string                      |
| github_url  | URL    | Optional                                 |
| demo_url    | URL    | Optional                                 |
| tags        | JSON   | Array of strings                         |
| order       | Number | Controls display sequence                |

### `resume`
| Field | Type | Notes                              |
|-------|------|------------------------------------|
| file  | File | Upload your CV PDF here            |

This is a single-record collection — only ever add one record. The site fetches the first record and links to the uploaded PDF.

---

## 5. Clone and Build the Site

```bash
cd ~
git clone https://github.com/abeldewit/abeldewit.github.io.git site
cd site
cp .env.example .env
# Edit .env and set NUXT_PUBLIC_POCKETBASE_URL to your public Pocketbase URL
npm install
npm run build
```

---

## 6. Run with PM2

Create an ecosystem file `~/ecosystem.config.cjs`:

```js
module.exports = {
  apps: [
    {
      name: 'nuxt',
      script: '.output/server/index.mjs',
      cwd: '/home/<your-user>/site',
      env: {
        PORT: 3000,
        NUXT_PUBLIC_POCKETBASE_URL: 'https://cms.yourdomain.com'
      }
    },
    {
      name: 'pocketbase',
      script: './pocketbase',
      cwd: '/home/<your-user>/pocketbase',
      args: 'serve --http=0.0.0.0:8090'
    }
  ]
}
```

```bash
pm2 start ~/ecosystem.config.cjs
pm2 save
pm2 startup  # follow the printed command to enable autostart on boot
```

---

## 7. Install Nginx

```bash
sudo apt install -y nginx
```

Create `/etc/nginx/sites-available/abeldewit`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Nuxt SSR app
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name cms.yourdomain.com;

    # Pocketbase admin + API
    location / {
        proxy_pass         http://127.0.0.1:8090;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/abeldewit /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. Cloudflare Tunnel

1. Add your domain to Cloudflare (free plan is fine).
2. Install `cloudflared` on the RPi:
   ```bash
   wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
   sudo dpkg -i cloudflared-linux-arm64.deb
   ```
3. Authenticate and create a tunnel:
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create my-site
   ```
4. Configure `~/.cloudflared/config.yml`:
   ```yaml
   tunnel: <tunnel-id>
   credentials-file: /home/<user>/.cloudflared/<tunnel-id>.json

   ingress:
     - hostname: yourdomain.com
       service: http://localhost:80
     - hostname: cms.yourdomain.com
       service: http://localhost:8090
     - service: http_status:404
   ```
5. Create DNS records in Cloudflare dashboard (or via CLI):
   ```bash
   cloudflared tunnel route dns my-site yourdomain.com
   cloudflared tunnel route dns my-site cms.yourdomain.com
   ```
6. Run the tunnel as a service:
   ```bash
   sudo cloudflared service install
   sudo systemctl start cloudflared
   ```

Your site is now publicly accessible at `https://yourdomain.com` and the CMS at `https://cms.yourdomain.com/_/`.

---

## Deploying Updates

After making code changes:

```bash
cd ~/site
git pull origin main
npm install
npm run build
pm2 restart nuxt
```
