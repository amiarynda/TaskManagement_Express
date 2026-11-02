# Task Management API

REST API sederhana untuk mengelola daftar tugas menggunakan Express.js, TypeScript, dan JSON dummy data (in-memory).

## Teknologi

- Express.js
- TypeScript
- ts-node dan nodemon untuk development

## Persiapan

Pastikan Node.js dan npm sudah terinstal.

```bash
npm install
```

## Menjalankan project

Mode development:

```bash
npm run dev
```

Server berjalan di `http://localhost:5000` secara default.

Build TypeScript:

```bash
npm run build
```

Menjalankan hasil build:

```bash
npm start
```

## Struktur folder

```text
task-management-api/
├── src/
│   ├── controllers/
│   │   └── task-controller.ts
│   ├── routes/
│   │   └── task-routes.ts
│   ├── types/
│   │   └── task.ts
│   └── index.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Daftar endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/tasks` | Mengambil semua task |
| GET | `/tasks/:id` | Mengambil detail task |
| POST | `/tasks` | Menambahkan task |
| PUT | `/tasks/:id` | Memperbarui task |
| DELETE | `/tasks/:id` | Menghapus task |

## Contoh request

### 1. GET /tasks

Tidak membutuhkan body.

### 2. GET /tasks/1

Ganti `1` dengan ID task yang ingin dilihat.

### 3. POST /tasks

Pilih Body > raw > JSON di Postman, lalu kirim:

```json
{
  "title": "Mengerjakan tugas backend",
  "description": "Membuat Task Management API dengan Express",
  "status": "pending"
}
```

### 4. PUT /tasks/1

PUT mengganti seluruh data task. Kirim semua field berikut:

```json
{
  "title": "Menyelesaikan tugas backend",
  "description": "Menyelesaikan dan menguji semua endpoint",
  "status": "completed"
}
```

### 5. DELETE /tasks/1

Ganti `1` dengan ID task yang ingin dihapus. Tidak membutuhkan body.

## Validasi

- `title` wajib berupa teks dan tidak boleh kosong.
- `description` wajib berupa teks dan tidak boleh kosong.
- `status` wajib bernilai `pending` atau `completed`.
- ID harus berupa angka bulat positif.
- Task dengan ID yang tidak ditemukan menghasilkan HTTP 404.

## HTTP status code

| Status | Penggunaan |
|---|---|
| 200 OK | GET, PUT, DELETE berhasil |
| 201 Created | POST berhasil membuat task |
| 400 Bad Request | Body atau ID tidak valid |
| 404 Not Found | Task tidak ditemukan |
| 500 Internal Server Error | Kesalahan server |

## Catatan penyimpanan data

Project ini menggunakan array in-memory sesuai instruksi tugas. Data hanya tersimpan selama server berjalan. Jika server direstart, data akan kembali ke dummy data awal. Database belum digunakan karena tidak diminta dalam challenge ini.
