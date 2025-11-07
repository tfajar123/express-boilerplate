# Node.js TypeScript Prisma Project

Proyek ini menggunakan Node.js dengan TypeScript dan Prisma untuk pengelolaan basis data. Berikut adalah petunjuk untuk membangun, menjalankan, dan mengelola proyek ini.

## Prasyarat

Sebelum memulai, pastikan Anda memiliki alat berikut terpasang di sistem Anda:

- [Node.js](https://nodejs.org/) (termasuk npm)
- [Docker](https://www.docker.com/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma)
- [TypeScript](https://www.typescriptlang.org/)

## Instalasi

1. **Clone repository**:

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Install dependencies**:
   Instal semua dependensi yang diperlukan dengan perintah berikut:
    ```bash
    npm install
    ```

## Perintah-perintah

### 1. Build Proyek

Untuk membangun proyek menggunakan TypeScript, jalankan perintah berikut:

```bash
npm run build
```

Ini akan mengompilasi kode sumber TypeScript Anda ke dalam folder `dist/` atau folder lainnya yang sudah disesuaikan.

### 2. Menjalankan Proyek yang Sudah Dibangun

Setelah proyek dibangun, Anda dapat menjalankannya dengan perintah:

```bash
npm run start
```

Ini akan menjalankan aplikasi dengan kode yang sudah dibangun.

### 3. Menjalankan Proyek dengan Nodemon (untuk Pengembangan)

Untuk menjalankan aplikasi dengan **Nodemon** yang akan memantau perubahan pada kode dan secara otomatis me-restart server, gunakan perintah:

```bash
npm run dev
```

### 4. Menjalankan Migrasi Prisma

Untuk mengatur dan memigrasi skema basis data, Anda dapat menggunakan perintah-perintah berikut:

- **Reset migrasi Prisma** (akan menghapus dan membuat ulang basis data):

    ```bash
    npx prisma migrate reset
    ```

- **Menerapkan migrasi** (aplikasikan perubahan skema basis data):
    ```bash
    npx prisma migrate dev
    ```

### 5. Menjalankan Seed Data

Untuk menjalankan file seed yang berisi data awal ke dalam basis data, gunakan perintah:

```bash
npx ts-node prisma/seed.ts
```

Pastikan bahwa file `seed.ts` berada dalam folder `prisma/` dan berisi logika untuk memasukkan data ke basis data.

### 6. Menjalankan Proyek dengan Docker

Untuk menjalankan proyek menggunakan Docker, gunakan perintah berikut:

```bash
docker-compose up --build -d
```

Perintah ini akan membangun dan menjalankan kontainer Docker dalam mode detached (`-d`). Pastikan Anda memiliki file `docker-compose.yml` yang dikonfigurasi dengan benar.

---

## Setting Environment Variables

Untuk menjalankan aplikasi dengan konfigurasi yang tepat, Anda perlu menyiapkan file `.env` di root proyek Anda. Berikut adalah contoh isi file `.env`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/yourdb?schema=public

JWT_SECRET_KEY=123123123123

MINIO_PUBLIC_URL=http://localhost:9000
MINIO_ENDPOINT=127.0.0.1
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=admin123
MINIO_BUCKET_NAME=bucket_name

NODEMAILER_HOST="smtp.example.com"
NODEMAILER_USER="user"
NODEMAILER_PASS="pass"
```

### Penjelasan Variabel Lingkungan:

- **PORT**: Port tempat aplikasi akan berjalan. Secara default adalah `3000`, tetapi Anda dapat mengubahnya sesuai kebutuhan.
- **DATABASE_URL**: URL koneksi untuk basis data PostgreSQL Anda. Pastikan untuk mengganti nama pengguna, kata sandi, dan nama basis data jika diperlukan.
- **JWT_SECRET_KEY**: Kunci rahasia untuk JSON Web Token (JWT) yang digunakan untuk autentikasi.
- **JWT_REFRESH_SECRET_KEY**: Kunci rahasia untuk refresh token JWT.
- **MINIO_accessKey** dan **MINIO_secretKey**: Kunci akses dan kunci rahasia untuk MinIO, jika digunakan untuk penyimpanan objek.
- **NODEMAILER_HOST**, **NODEMAILER_USER**, dan **NODEMAILER_PASS**: Pengaturan untuk mengonfigurasi pengiriman email melalui NodeMailer, termasuk host SMTP, nama pengguna, dan kata sandi.

Pastikan Anda mengganti nilai-nilai dalam `.env` sesuai dengan konfigurasi dan kredensial yang Anda gunakan di lingkungan Anda.

---

## Struktur Proyek

Berikut adalah gambaran umum tentang struktur proyek:

```
siakad-backend/
├── dist/                         # Folder output build (dihasilkan setelah build)
├── prisma/                       # Folder untuk file Prisma (skema, migrasi, seeding)
│   └── schema.prisma             # File skema Prisma
├── src/                          # Kode sumber aplikasi
│   ├── config/                   # Folder untuk konfigurasi aplikasi
│   ├── features/                 # Fitur-fitur aplikasi
│   ├── middlewares/              # Folder untuk middleware
│   ├── routes/                   # Folder untuk routing aplikasi
│   ├── services/                 # Folder untuk services (minio, nodemailer)
│   ├── types/                    # Deklarasi global type
│   └── utils/                    # Folder untuk utility
├── .env                          # File environment untuk konfigurasi aplikasi
├── docker-compose.yml            # File konfigurasi Docker Compose
├── Dockerfile                    # File konfigurasi Docker
├── package.json                  # File konfigurasi npm
└── tsconfig.json                 # File konfigurasi TypeScript
```

## Troubleshooting

Jika Anda menghadapi masalah saat menjalankan proyek, pastikan untuk memeriksa hal-hal berikut:

- Pastikan Anda telah menginstal dependensi dengan `npm install`.
- Periksa konfigurasi Prisma dan pastikan basis data sudah benar-benar terhubung.
- Jika menggunakan Docker, pastikan Docker sudah berjalan dan memiliki ruang penyimpanan yang cukup.

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
