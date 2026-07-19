<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Python][python-shield]][python-url]
[![React][react-shield]][react-url]

<!-- PROJECT HEADER -->
<br />
<div align="center">
  <h1 align="center">TriếtLýLàGì?</h1>

  <p align="center">
    Nền tảng quiz triết học bằng tiếng Việt, giúp người học khám phá khuynh hướng tư duy<br />
    qua những tình huống đời thường và ôn tập kiến thức Mác – Lênin theo cách trực quan.
    <br />
    <br />
    <a href="https://github.com/duyphuongz/triet-hoc"><strong>Khám phá mã nguồn »</strong></a>
    <br />
    <br />
    <a href="https://github.com/duyphuongz/triet-hoc/issues/new?labels=bug">Báo lỗi</a>
    &middot;
    <a href="https://github.com/duyphuongz/triet-hoc/issues/new?labels=enhancement">Đề xuất tính năng</a>
  </p>
</div>

> [!IMPORTANT]
> Kết quả quiz chỉ phục vụ mục đích học tập, tự phản tư và giải trí. Đây không phải công cụ chẩn đoán y khoa, tâm lý hay đánh giá chuyên môn.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Mục lục</summary>
  <ol>
    <li>
      <a href="#giới-thiệu-dự-án">Giới thiệu dự án</a>
      <ul>
        <li><a href="#tính-năng-nổi-bật">Tính năng nổi bật</a></li>
        <li><a href="#kiến-trúc-tổng-quan">Kiến trúc tổng quan</a></li>
        <li><a href="#công-nghệ-sử-dụng">Công nghệ sử dụng</a></li>
      </ul>
    </li>
    <li>
      <a href="#bắt-đầu">Bắt đầu</a>
      <ul>
        <li><a href="#yêu-cầu-hệ-thống">Yêu cầu hệ thống</a></li>
        <li><a href="#cài-đặt-nhanh">Cài đặt nhanh</a></li>
        <li><a href="#cài-đặt-thủ-công">Cài đặt thủ công</a></li>
        <li><a href="#biến-môi-trường">Biến môi trường</a></li>
      </ul>
    </li>
    <li><a href="#cách-sử-dụng">Cách sử dụng</a></li>
    <li><a href="#api-chính">API chính</a></li>
    <li><a href="#cơ-chế-chấm-điểm">Cơ chế chấm điểm</a></li>
    <li><a href="#cấu-trúc-thư-mục">Cấu trúc thư mục</a></li>
    <li><a href="#kiểm-thử">Kiểm thử</a></li>
    <li><a href="#triển-khai">Triển khai</a></li>
    <li><a href="#lộ-trình">Lộ trình</a></li>
    <li><a href="#đóng-góp">Đóng góp</a></li>
    <li><a href="#bảo-mật-và-quyền-riêng-tư">Bảo mật và quyền riêng tư</a></li>
    <li><a href="#giấy-phép">Giấy phép</a></li>
    <li><a href="#liên-hệ">Liên hệ</a></li>
    <li><a href="#lời-cảm-ơn">Lời cảm ơn</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Giới thiệu dự án

**TriếtLýLàGì?** là một ứng dụng web full-stack hướng đến sinh viên Việt Nam. Thay vì trình bày triết học hoàn toàn theo dạng lý thuyết, ứng dụng chuyển các khái niệm thành câu hỏi tình huống trên thang Likert 1–5, tính điểm có trọng số và trả về hồ sơ tư duy nổi bật của người làm bài.

Project hiện hỗ trợ hai học phần:

| Học phần | Nội dung | Dữ liệu seed |
| --- | --- | ---: |
| `MLN111` | Triết học Mác – Lênin và các khuynh hướng triết học trong đời sống | 20 câu hỏi, 11 hồ sơ |
| `MLN122` | Kinh tế Chính trị Mác – Lênin | Ngân hàng 100 câu hỏi, 5 hồ sơ |

Người dùng có thể làm bài không cần đăng nhập. Mỗi kết quả được lưu bằng một mã chia sẻ công khai; nếu đăng ký tài khoản, người dùng có thể đồng bộ lịch sử ẩn danh trên trình duyệt vào tài khoản của mình.

### Tính năng nổi bật

- Quiz theo từng học phần với thang đánh giá 1–5; `MLN111` dùng bộ 20 câu, `MLN122` cho phép lấy ngẫu nhiên 20/30/50 câu từ ngân hàng 100 câu.
- Chấm điểm xác định bằng trọng số, chuẩn hóa riêng theo từng hồ sơ và xếp hạng top 3.
- Trang kết quả có diễn giải, điểm mạnh, điểm mù, gợi ý phát triển và hiệu ứng trực quan.
- Chia sẻ kết quả bằng đường dẫn công khai hoặc xuất thẻ kết quả thành ảnh PNG.
- Lịch sử làm bài theo mã trình duyệt ẩn danh; hỗ trợ đăng ký, đăng nhập và đồng bộ vào tài khoản.
- Kho tri thức `MLN122` dạng knowledge graph với 95 nút, 121 liên kết, tìm kiếm và xem nội dung chi tiết.
- Giao diện responsive, dark mode, animation, nhạc nền tùy chọn và hỗ trợ reduced motion.
- Dashboard quản trị cho thống kê, kết quả, người dùng, lượt truy cập, câu hỏi, hồ sơ và trạng thái mở/tạm ngưng từng học phần.
- REST API có tài liệu OpenAPI/Swagger tự động tại `/docs` và ReDoc tại `/redoc`.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### Kiến trúc tổng quan

```mermaid
flowchart LR
    U[Người dùng] --> FE[React + Vite]
    A[Quản trị viên] --> FE
    FE -->|REST /api| API[FastAPI]
    API --> S[Service layer]
    S --> R[Repository layer]
    R --> DB[(PostgreSQL / SQLite)]
    S --> SCORE[Scoring service]
    API --> JWT[JWT authentication]
```

Luồng làm quiz chính:

```mermaid
sequenceDiagram
    participant UI as React UI
    participant API as FastAPI
    participant DB as Database
    UI->>API: GET /api/questions?course_code=...
    API-->>UI: Danh sách câu hỏi + thang điểm
    UI->>API: POST /api/survey/submit
    API->>API: Kiểm tra dữ liệu và tính điểm
    API->>DB: Lưu phiên, câu trả lời, kết quả và điểm
    API-->>UI: shareSlug + topThree
    UI->>API: GET /api/results/{shareSlug}
    API-->>UI: Kết quả công khai đầy đủ
```

Backend tách rõ route, service và repository. Các quy tắc nghiệp vụ nằm ở service; truy vấn SQLAlchemy nằm ở repository; thuật toán chấm điểm được giữ thuần để dễ unit test.

### Công nghệ sử dụng

#### Frontend

- [![React][react-badge]][react-url]
- [![TypeScript][typescript-badge]][typescript-url]
- [![Vite][vite-badge]][vite-url]
- [![Tailwind CSS][tailwind-badge]][tailwind-url]
- React Router, TanStack Query, Zustand
- Framer Motion, Recharts, react-force-graph-2d
- html2canvas, canvas-confetti, Lucide React

#### Backend và dữ liệu

- [![FastAPI][fastapi-badge]][fastapi-url]
- [![Python][python-badge]][python-url]
- [![PostgreSQL][postgresql-badge]][postgresql-url]
- SQLAlchemy 2.0, Alembic, Pydantic v2
- JWT (`python-jose`) và PBKDF2-SHA256 cho mật khẩu
- PostgreSQL 16 trong Docker; SQLite dùng được cho phát triển/test nhẹ

#### Công cụ

- Docker, Docker Compose
- Pytest, HTTPX
- Vercel SPA rewrites cho frontend

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- GETTING STARTED -->
## Bắt đầu

### Yêu cầu hệ thống

Chọn một trong hai cách chạy:

- **Khuyến nghị:** Docker Desktop/Engine có Docker Compose, cộng với Node.js 20+ và npm.
- **Thủ công:** Python 3.12+, Node.js 20+, npm và PostgreSQL 16+; có thể dùng SQLite khi phát triển. Cài thêm [uv](https://docs.astral.sh/uv/) nếu muốn dùng workflow theo `uv.lock`.

### Cài đặt nhanh

Cách này chạy PostgreSQL và FastAPI bằng Docker, còn Vite chạy trực tiếp trên máy để có hot reload ổn định.

1. Clone repository:

   ```bash
   git clone https://github.com/duyphuongz/triet-hoc.git
   cd triet-hoc
   ```

2. Khởi động backend và database:

   ```bash
   cd backend
   docker compose up --build
   ```

   Compose sẽ tự chạy migration, seed dữ liệu và mở API tại `http://localhost:8000`.

   Sau khi các service đã sẵn sàng, mở một terminal khác để nạp kho tri thức (chỉ cần chạy khi khởi tạo hoặc muốn làm mới graph):

   ```bash
   cd backend
   docker compose exec backend python -m app.seed.knowledge_seed
   ```

3. Mở terminal khác và khởi động frontend:

   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

   Trên PowerShell, thay lệnh `cp` bằng:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Truy cập:

   - Ứng dụng: `http://localhost:5173`
   - API health check: `http://localhost:8000/api/health`
   - Swagger UI: `http://localhost:8000/docs`
   - Trang quản trị: `http://localhost:5173/admin/login`

### Cài đặt thủ công

1. Tạo database PostgreSQL hoặc khởi động riêng service database từ thư mục gốc:

   ```bash
   docker compose up -d db
   ```

2. Cài và chạy backend:

   ```bash
   cd backend
   cp .env.example .env
   python -m venv .venv
   ```

   Kích hoạt virtual environment:

   ```bash
   # Linux / macOS
   source .venv/bin/activate

   # Windows PowerShell
   .venv\Scripts\Activate.ps1
   ```

   Sau đó cài dependency, migrate, seed và chạy API:

   ```bash
   pip install -r requirements.txt
   alembic upgrade head
   python -m app.seed.seed_data
   uvicorn app.main:app --reload
   ```

   Nếu không muốn chạy PostgreSQL khi phát triển, đổi `DATABASE_URL` trong `backend/.env` thành:

   ```env
   DATABASE_URL=sqlite:///./trietlylagi.db
   ```

3. Cài và chạy frontend trong terminal khác:

   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

### Biến môi trường

#### Backend — `backend/.env`

| Biến | Bắt buộc khi production | Giá trị mẫu / ý nghĩa |
| --- | :---: | --- |
| `DATABASE_URL` | Có | Chuỗi kết nối PostgreSQL hoặc SQLite |
| `FRONTEND_ORIGIN` | Có | Origin được phép qua CORS; hỗ trợ nhiều origin phân tách bằng dấu phẩy |
| `SECRET_KEY` | Có | Khóa bí mật dài, ngẫu nhiên để ký JWT |
| `ADMIN_EMAIL` | Nên đổi | Email admin được tạo/cập nhật khi seed |
| `ADMIN_PASSWORD` | Nên đổi | Mật khẩu admin được tạo/cập nhật khi seed |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Không | Thời hạn JWT, mặc định `120` phút |

Ví dụ local:

```env
DATABASE_URL=postgresql://triet:triet@localhost:5432/trietlylagi
FRONTEND_ORIGIN=http://localhost:5173
SECRET_KEY=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

Backend tự chuẩn hóa `postgres://` và `postgresql://` sang driver `postgresql+psycopg://` mà SQLAlchemy sử dụng.

#### Frontend — `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

`VITE_API_BASE_URL` là biến bắt buộc ngay từ lúc build. Giá trị phải bao gồm hậu tố `/api` và không nên có dấu `/` thừa ở cuối.

> [!WARNING]
> Không commit file `.env`, chuỗi kết nối production, `SECRET_KEY` hoặc mật khẩu thật. Tài khoản seed `admin@example.com` / `admin123` chỉ dành cho local và phải được thay trước khi triển khai.

### Migration và seed dữ liệu

Chạy từ thư mục `backend/`:

```bash
alembic upgrade head
python -m app.seed.seed_data
```

Seed có tính lặp lại (idempotent) theo khóa/code hiện có và sẽ:

- tạo hoặc cập nhật 16 hồ sơ kết quả của hai học phần;
- tạo hoặc cập nhật 120 câu hỏi cùng trọng số;
- bảo đảm trạng thái mặc định cho `MLN111` và `MLN122`;
- tạo hoặc cập nhật mật khẩu tài khoản admin từ biến môi trường.

Kho tri thức là seed riêng. Khi cần nạp graph MLN122, chạy:

```bash
python -m app.seed.knowledge_seed
```

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- USAGE EXAMPLES -->
## Cách sử dụng

### Người làm quiz

1. Chọn `MLN111` hoặc `MLN122` ở trang chủ.
2. Chọn số lượng câu hỏi phù hợp với ngân hàng của học phần và trả lời theo thang 1–5.
3. Nhận top 3 hồ sơ, phân tích chi tiết và toàn bộ bảng điểm.
4. Sao chép link công khai hoặc tải thẻ kết quả PNG.
5. Xem lại lịch sử trên trình duyệt; đăng nhập để đồng bộ lịch sử vào tài khoản.

Các route giao diện quan trọng:

| Route | Chức năng |
| --- | --- |
| `/` | Trang chủ và chọn học phần |
| `/quiz/:courseCode/intro` | Giới thiệu và cấu hình bài quiz |
| `/quiz/:courseCode` | Làm bài quiz |
| `/results/:shareSlug` | Xem kết quả công khai |
| `/history` | Lịch sử theo trình duyệt ẩn danh |
| `/user/history` | Lịch sử đã gắn với tài khoản |
| `/kho-tang` | Kho tri thức dạng đồ thị |
| `/login`, `/register` | Đăng nhập và đăng ký người dùng |
| `/admin/login` | Đăng nhập quản trị |

### Quản trị viên

Sau khi seed local, dùng tài khoản mặc định:

```text
Email:    admin@example.com
Password: admin123
```

Dashboard admin cho phép:

- xem tổng số bài làm, phân bố kết quả, traffic theo ngày/giờ;
- xem người dùng và dữ liệu lượt truy cập;
- tạo, sửa, xóa câu hỏi và chỉnh trọng số theo học phần;
- tạo, sửa nội dung các hồ sơ kết quả;
- tạm ngưng hoặc mở lại từng học phần kèm thông báo tùy chỉnh.

Admin token được lưu trong `sessionStorage`; token người dùng được Zustand persist trong `localStorage`.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

## API chính

Tất cả endpoint nghiệp vụ dùng prefix `/api`.

| Method | Endpoint | Xác thực | Mô tả |
| --- | --- | :---: | --- |
| `GET` | `/api/health` | Không | Kiểm tra trạng thái API |
| `GET` | `/api/courses/status` | Không | Trạng thái mở/tạm ngưng học phần |
| `GET` | `/api/questions` | Không | Lấy câu hỏi theo `course_code`, có thể giới hạn và random bằng `limit` |
| `GET` | `/api/philosophies` | Không | Danh sách hồ sơ công khai |
| `POST` | `/api/survey/submit` | Tùy chọn | Nộp bài, tính điểm và lưu kết quả |
| `GET` | `/api/results/{share_slug}` | Không | Lấy kết quả công khai |
| `GET` | `/api/history/{anonymous_client_id}` | Không | Lịch sử theo trình duyệt |
| `POST` | `/api/auth/register` | Không | Đăng ký người dùng |
| `POST` | `/api/auth/login` | Không | Đăng nhập người dùng bằng OAuth2 password form |
| `GET` | `/api/auth/me` | Bearer | Thông tin người dùng hiện tại |
| `POST` | `/api/users/me/sync-history` | Bearer | Gắn lịch sử ẩn danh vào tài khoản |
| `GET` | `/api/knowledge/graph` | Không | Đồ thị tri thức MLN122 |
| `GET` | `/api/knowledge/search` | Không | Tìm kiếm nút tri thức |
| `GET` | `/api/knowledge/nodes/{slug}` | Không | Chi tiết một nút tri thức |
| `POST` | `/api/admin/auth/login` | Không | Lấy JWT admin |
| Nhiều | `/api/admin/*` | Admin Bearer | Quản lý nội dung, học phần, user, kết quả, thống kê và visitor |

Schema request/response đầy đủ luôn có tại Swagger UI khi backend đang chạy.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

## Cơ chế chấm điểm

Mỗi câu hỏi có một hoặc nhiều trọng số gắn với hồ sơ. Với mỗi câu trả lời:

```text
raw_score[profile] += answer_value × weight
```

Điểm được chuẩn hóa độc lập để tránh làm thiệt các hồ sơ có ít câu hỏi mang trọng số hơn:

```text
percentage = raw_score / max_possible_score_for_profile × 100
```

Thứ tự được xác định lần lượt theo phần trăm giảm dần, điểm thô giảm dần rồi khóa hồ sơ. Vì vậy cùng một bộ câu hỏi và câu trả lời sẽ luôn cho cùng một kết quả.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

## Cấu trúc thư mục

```text
triet-hoc/
├── backend/
│   ├── alembic/                 # Migration database
│   ├── app/
│   │   ├── api/routes/          # Public, user và admin REST endpoints
│   │   ├── core/                # Config, database, CORS, security
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── repositories/        # Data-access layer
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   ├── seed/                # Quiz, hồ sơ và knowledge graph seed
│   │   ├── services/            # Nghiệp vụ quiz, scoring, admin
│   │   ├── tests/               # Pytest suite
│   │   └── main.py              # FastAPI entrypoint
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/                  # Static assets và nhạc nền
│   ├── src/
│   │   ├── app/                 # Router, providers, theme, layout
│   │   ├── features/            # Admin, auth, knowledge, quiz, results
│   │   ├── pages/               # Các route-level page
│   │   └── shared/              # UI, hooks, stores, utilities
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.ts
├── docker-compose.yml
├── DEPLOYMENT.md
├── pyproject.toml
└── README.md
```

Tài liệu kỹ thuật bổ sung:

- [Ghi chú backend](backend/README.md)
- [Kiến trúc chi tiết](backend/docs/architecture.md)
- [Hướng dẫn triển khai](DEPLOYMENT.md)

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

## Kiểm thử

Nếu đã cài `uv`, chạy toàn bộ backend test từ thư mục gốc:

```bash
uv run pytest
```

Hoặc trong virtual environment đã cài dependency:

```bash
pytest
```

Test suite hiện kiểm tra thuật toán chuẩn hóa điểm, submit và validation quiz, lịch sử ẩn danh, đăng nhập admin, phân tách học phần và cơ chế tạm ngưng/mở lại khóa học. API test dùng SQLite in-memory để cô lập dữ liệu.

Kiểm tra TypeScript và production build của frontend:

```bash
cd frontend
npm run build
```

Xem thử bản build:

```bash
npm run preview
```

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

## Triển khai

### Backend

`backend/Dockerfile` tự động chạy migration, seed và Uvicorn khi container khởi động. Các biến tối thiểu cần cấu hình trên môi trường production:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
FRONTEND_ORIGIN=https://your-frontend.example
SECRET_KEY=your-long-random-production-secret
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=your-strong-password
```

Build image thủ công:

```bash
docker build -t trietlylagi-backend ./backend
docker run --rm -p 8000:8000 --env-file backend/.env trietlylagi-backend
```

### Frontend

Có thể deploy thư mục `frontend/` lên Vercel hoặc một static host tương thích SPA:

```env
VITE_API_BASE_URL=https://your-api.example/api
```

`frontend/vercel.json` đã cấu hình rewrite mọi deep link về `index.html`. Chi tiết hơn xem [DEPLOYMENT.md](DEPLOYMENT.md).

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- ROADMAP -->
## Lộ trình

- [x] Quiz MLN111 với 11 hồ sơ triết học.
- [x] Quiz MLN122 với ngân hàng 100 câu hỏi.
- [x] Kết quả công khai, lịch sử ẩn danh và thẻ chia sẻ PNG.
- [x] Tài khoản người dùng và đồng bộ lịch sử.
- [x] Knowledge graph và tìm kiếm kiến thức MLN122.
- [x] Dashboard quản trị nội dung, traffic và trạng thái học phần.
- [ ] Bổ sung test tự động cho frontend.
- [ ] Thiết lập CI kiểm tra backend test và frontend build trên mỗi pull request.
- [ ] Mở rộng kho tri thức và quiz cho các học phần lý luận chính trị khác.

Xem [danh sách issue][issues-url] để theo dõi đề xuất và lỗi đã biết.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- CONTRIBUTING -->
## Đóng góp

Mọi đóng góp giúp dự án chính xác, dễ dùng và hữu ích hơn cho người học đều được hoan nghênh.

1. Fork project.
2. Tạo branch tính năng: `git checkout -b feature/AmazingFeature`.
3. Commit thay đổi: `git commit -m "feat: add AmazingFeature"`.
4. Push branch: `git push origin feature/AmazingFeature`.
5. Mở Pull Request và mô tả rõ phạm vi thay đổi, cách kiểm thử.

Khi sửa thuật toán hoặc dữ liệu quiz, vui lòng bổ sung test phù hợp và nêu rõ ảnh hưởng đến kết quả cũ.

### Những người đóng góp

<a href="https://github.com/duyphuongz/triet-hoc/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=duyphuongz/triet-hoc" alt="Danh sách người đóng góp" />
</a>

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

## Bảo mật và quyền riêng tư

- Không commit `.env`, database local, khóa JWT hoặc thông tin đăng nhập thật.
- Đổi toàn bộ credential seed trước khi deploy; dùng HTTPS cho cả frontend và API.
- Mật khẩu được băm bằng PBKDF2-SHA256; admin API và user API riêng tư yêu cầu Bearer token.
- Link `/results/:shareSlug` là công khai với bất kỳ ai có URL. Nội dung kết quả không nên chứa thông tin nhận dạng cá nhân.
- Lịch sử khách dùng một anonymous client ID lưu trong `localStorage`; khi người dùng chủ động đồng bộ, các phiên đó được gắn với tài khoản.
- Route tracking hiện có thể lưu IP, user-agent, URL/referrer, màn hình, phần cứng, mạng, locale, preference và fingerprint canvas/WebGL. Khi triển khai thực tế, cần thông báo minh bạch, xin sự đồng ý khi pháp luật yêu cầu, đặt thời hạn lưu trữ và giới hạn quyền truy cập dữ liệu admin.

Nếu phát hiện lỗ hổng, không đăng credential hoặc dữ liệu nhạy cảm vào issue công khai; hãy liên hệ maintainer qua trang GitHub trước.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- LICENSE -->
## Giấy phép

Repository hiện **chưa có tệp giấy phép mã nguồn mở**. Theo mặc định, tác giả giữ toàn bộ quyền đối với mã nguồn. Hãy liên hệ maintainer trước khi sao chép, phân phối hoặc sử dụng project ngoài phạm vi được pháp luật cho phép.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- CONTACT -->
## Liên hệ

- Maintainer: [duyphuongz](https://github.com/duyphuongz)
- Project: [github.com/duyphuongz/triet-hoc](https://github.com/duyphuongz/triet-hoc)
- Bug/Feature request: [GitHub Issues][issues-url]

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Lời cảm ơn

- [Best README Template](https://github.com/othneildrew/Best-README-Template) — bố cục tham khảo cho tài liệu này.
- [FastAPI](https://fastapi.tiangolo.com/) và [SQLAlchemy](https://www.sqlalchemy.org/) — nền tảng backend.
- [React](https://react.dev/), [Vite](https://vite.dev/) và [Tailwind CSS](https://tailwindcss.com/) — nền tảng giao diện.
- [Recharts](https://recharts.org/) và [react-force-graph](https://github.com/vasturiano/react-force-graph) — trực quan hóa dữ liệu.
- [Shields.io](https://shields.io/) và [contrib.rocks](https://contrib.rocks/) — badge và danh sách contributor.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/duyphuongz/triet-hoc.svg?style=for-the-badge
[contributors-url]: https://github.com/duyphuongz/triet-hoc/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/duyphuongz/triet-hoc.svg?style=for-the-badge
[forks-url]: https://github.com/duyphuongz/triet-hoc/network/members
[stars-shield]: https://img.shields.io/github/stars/duyphuongz/triet-hoc.svg?style=for-the-badge
[stars-url]: https://github.com/duyphuongz/triet-hoc/stargazers
[issues-shield]: https://img.shields.io/github/issues/duyphuongz/triet-hoc.svg?style=for-the-badge
[issues-url]: https://github.com/duyphuongz/triet-hoc/issues
[python-shield]: https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/
[react-shield]: https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://react.dev/
[react-badge]: https://img.shields.io/badge/React-18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[typescript-badge]: https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vite-badge]: https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vite.dev/
[tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[fastapi-badge]: https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white
[fastapi-url]: https://fastapi.tiangolo.com/
[python-badge]: https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white
[postgresql-badge]: https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
