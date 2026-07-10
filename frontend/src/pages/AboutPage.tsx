import { ArrowLeft, Brain, Code2, Compass, Glasses, Heart, Sparkles, Wrench } from "lucide-react";
import { ButtonLink } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { PageShell } from "../shared/components/PageShell";
import { Illustration } from "../shared/illustrations";

export function AboutPage() {
  const team = [
    {
      name: "Nguyễn Phương Duy",
      role: "Kỹ Sư Ý Niệm Tuyệt Đối",
      icon: <Code2 className="h-8 w-8 text-teal" />,
      bg: "bg-teal/10 border-teal/20",
      slogan: "Code có thể có bug, nhưng thế giới quan của Mác luôn logic!",
      description: "Người chuyển hóa những học thuyết siêu hình và trừu tượng thành các dòng code React mượt mà, hy vọng không bị quy luật 'phủ định của phủ định' làm crash web.",
    },
    {
      name: "Trương Đoàn Viên",
      role: "Nhà Biện Chứng Học",
      icon: <Brain className="h-8 w-8 text-grape" />,
      bg: "bg-grape/10 border-grape/20",
      slogan: "Không có gì đứng yên cả, ngay cả điểm số môn Triết!",
      description: "Chuyên gia vượt qua các quy luật triết học hóc búa, luôn tin rằng mọi mâu thuẫn đều có thể giải quyết bằng một ly trà sữa.",
    },
    {
      name: "Trần Anh Kiệt",
      role: "Nhà Phân Tích Ý Thức",
      icon: <Glasses className="h-8 w-8 text-coral" />,
      bg: "bg-coral/10 border-coral/20",
      slogan: "Cơn buồn ngủ quyết định sự tập trung!",
      description: "Chuyên gia nghiên cứu mối quan hệ biện chứng giữa chiếc giường (vật chất) và tinh thần muốn đi học (ý thức). Kết quả: Chiếc giường luôn thắng.",
    },
    {
      name: "Đoàn Thị Kim Thuý",
      role: "Nữ Thần Thực Tiễn",
      icon: <Compass className="h-8 w-8 text-lemon" />,
      bg: "bg-lemon/20 border-lemon/30",
      slogan: "Lý luận không có thực tiễn chỉ là lý luận suông!",
      description: "Giữ vai trò người bảo vệ thực tiễn đời sống sinh viên, đảm bảo bài trắc nghiệm luôn phản ánh đúng thực tế 'cơm, áo, gạo, tiền' chứ không chỉ lý thuyết suông.",
    },
  ];

  return (
    <PageShell>
      <div className="relative">
        {/* Back Link */}
        <ButtonLink to="/" variant="ghost" className="mb-6 inline-flex items-center gap-2 self-start">
          <ArrowLeft className="h-4 w-4" />
          Quay lại Trang chủ
        </ButtonLink>

        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Main Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-lemon px-4 py-1.5 text-xs font-black uppercase tracking-wider text-ink dark:text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              Sản phẩm sáng tạo MLN111 & MLN122
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight text-ink dark:text-white md:text-5xl">
              Tổ Bay Triết Học <br />
              <span className="text-teal">FPT University HCMC</span> 🚀
            </h1>

            <p className="mt-6 text-lg font-semibold leading-relaxed text-ink dark:text-white/80">
              Chào mừng bạn đến với <strong>TriếtHọclàgì?</strong> - dự án "giải cứu giấc ngủ" cực kỳ chất lượng được sáng tạo bởi các sinh viên xuất sắc từ các lớp <strong>MLN111 & MLN122</strong> tại Đại học FPT TP. Hồ Chí Minh!
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink dark:text-white/70">
              <p>
                Bạn đã bao giờ ngủ gật trong giờ Triết và mơ thấy mình đang ngồi đàm đạo với Socrates? Hay bạn đang tự hỏi liệu việc mình "bùng học" hôm nay là do ngẫu nhiên hay tất nhiên? Đừng lo lắng, chúng ta đều ở chung một thuyền!
              </p>
              <p>
                Dự án này ra đời không gì khác ngoài việc biến những phạm trù xoắn não của Triết học Mác - Lênin thành một bài trắc nghiệm tính cách siêu dí dỏm, thực tế và mang tính giải trí cực cao. Bài kiểm tra này giúp bạn phát hiện ra "triết gia nội tâm" đang điều khiển cuộc sống hằng ngày của bạn.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-black text-ink dark:text-white flex items-center gap-2">
                <Heart className="h-6 w-6 text-coral fill-coral" />
                Gặp Gỡ Đội Ngũ Sáng Tạo
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {team.map((member) => (
                  <Card key={member.name} className={`flex flex-col justify-between border-2 transition-all duration-300 hover:scale-[1.02] ${member.bg}`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xl text-ink dark:text-white">{member.name}</span>
                        {member.icon}
                      </div>
                      <span className="mt-1 inline-block text-xs font-extrabold text-ink dark:text-white/60 uppercase tracking-wider">
                        {member.role}
                      </span>
                      <p className="mt-4 text-sm font-black italic text-ink dark:text-white/80">
                        "{member.slogan}"
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink dark:text-white/70">
                        {member.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-black text-ink dark:text-white flex items-center gap-2">
                <Wrench className="h-6 w-6 text-teal" />
                Vũ Khí Công Nghệ (Tech Stack)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink dark:text-white/75">
                Để tạo ra một bài test mượt mà và giao diện "xịn xò", chúng tôi đã áp dụng triết lý "thực dụng" và chọn lọc những công nghệ hiện đại nhất. Hệ thống được xây dựng trên nền tảng các công nghệ hàng đầu:
              </p>
              
              {/* Logo Garden (Trusted By style) */}
              <div className="my-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-10 md:gap-x-12 px-4 py-8 border-y-2 border-dashed border-ink/5 dark:border-white/10">
                {[
                  { name: "React", url: "https://react.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                  { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                  { name: "Tailwind", url: "https://tailwindcss.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                  { name: "Vite", url: "https://vitejs.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
                  { name: "Framer Motion", url: "https://www.framer.com/motion/", icon: "https://cdn.simpleicons.org/framer/0055FF" },
                  { name: "React Router", url: "https://reactrouter.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" },
                  { name: "FastAPI", url: "https://fastapi.tiangolo.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
                  { name: "Python", url: "https://www.python.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                  { name: "PostgreSQL", url: "https://www.postgresql.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                  { name: "SQLAlchemy", url: "https://www.sqlalchemy.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg" },
                  { name: "Docker", url: "https://www.docker.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                  { name: "Node.js", url: "https://nodejs.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                  { name: "GitHub", url: "https://github.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
                  { name: "Gemini", url: "https://gemini.google.com/", icon: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stopColor='%234285f4'/%3E%3Cstop offset='50%25' stopColor='%239b72cb'/%3E%3Cstop offset='100%25' stopColor='%23d96570'/%3E%3C/linearGradient%3E%3Cpath fill='url(%23g)' d='M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z'/%3E%3C/svg%3E" },
                  { name: "NotebookLM", url: "https://notebooklm.google.com/", icon: "/notebooklm-logo.png", isWordmark: true },
                  { name: "Antigravity", url: "https://antigravity.google/", icon: "/antigravity-logo.png", isWordmark: true },
                ].map((tech) => (
                  <a key={tech.name} href={tech.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                    <img src={tech.icon} alt={tech.name} className="h-6 md:h-7" />
                    {!tech.isWordmark && (
                      <span className="font-bold text-lg text-ink dark:text-white tracking-tight">{tech.name}</span>
                    )}
                  </a>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border-2 border-ink/10 dark:border-white/10 hover:border-teal/50 transition-colors">
                  <h3 className="font-black text-lg text-teal mb-3">Frontend (Mặt Tiền)</h3>
                  <ul className="list-disc pl-4 space-y-2 text-sm text-ink dark:text-white/80">
                    <li><strong>React & TypeScript:</strong> Nền tảng cốt lõi, code chặt chẽ và logic như phép biện chứng.</li>
                    <li><strong>Tailwind CSS:</strong> Vẽ giao diện nhanh gọn, linh hoạt theo vạn vật vận động.</li>
                    <li><strong>Zustand:</strong> Quản lý state (trạng thái) nhẹ nhàng, không cồng kềnh giáo điều.</li>
                    <li><strong>Recharts & Confetti:</strong> Hiển thị biểu đồ phân tích và bắn pháo hoa ăn mừng kết quả!</li>
                  </ul>
                </Card>
                <Card className="border-2 border-ink/10 dark:border-white/10 hover:border-coral/50 transition-colors">
                  <h3 className="font-black text-lg text-coral mb-3">Backend (Hậu Cần)</h3>
                  <ul className="list-disc pl-4 space-y-2 text-sm text-ink dark:text-white/80">
                    <li><strong>FastAPI:</strong> Đẩy tốc độ phản hồi nhanh như một tia chớp nhận thức.</li>
                    <li><strong>Python:</strong> Xử lý tính toán điểm số một cách thông minh và ngắn gọn.</li>
                    <li><strong>PostgreSQL:</strong> Cơ sở dữ liệu vật chất vững chãi, lưu trữ lịch sử kết quả an toàn.</li>
                    <li><strong>SQLAlchemy:</strong> Cầu nối giữa thế giới ý niệm (Code) và vật chất (Database).</li>
                  </ul>
                </Card>
                <Card className="border-2 border-ink/10 dark:border-white/10 hover:border-grape/50 transition-colors sm:col-span-2 lg:col-span-1">
                  <h3 className="font-black text-lg text-grape mb-3">AI Hỗ Trợ (Đồng Đội Ảo)</h3>
                  <ul className="space-y-3 text-sm text-ink dark:text-white/80">
                    <li className="flex gap-3">
                      <div className="mt-0.5 shrink-0">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <linearGradient id="gemini" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4285f4"/>
                            <stop offset="50%" stopColor="#9b72cb"/>
                            <stop offset="100%" stopColor="#d96570"/>
                          </linearGradient>
                          <path fill="url(#gemini)" d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z" />
                        </svg>
                      </div>
                      <div>
                        <strong>Google Gemini:</strong> Cố vấn tư duy chiến lược, phân tích dữ liệu và cung cấp "tư tưởng" cốt lõi.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-0.5 shrink-0">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <linearGradient id="notebooklm" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1A73E8"/>
                            <stop offset="100%" stopColor="#8AB4F8"/>
                          </linearGradient>
                          <path fill="url(#notebooklm)" d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM15 16H8V14H15V16ZM16 12H8V10H16V12ZM16 8H8V6H16V8Z" />
                        </svg>
                      </div>
                      <div>
                        <strong>NotebookLM:</strong> Trợ lý tổng hợp tài liệu, nhào nặn những giáo trình khô khan thành kịch bản thú vị.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-0.5 shrink-0">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <linearGradient id="antigravity" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF512F"/>
                            <stop offset="100%" stopColor="#DD2476"/>
                          </linearGradient>
                          <path fill="url(#antigravity)" d="M12 2L22 20H2L12 2ZM12 8L7.5 16H16.5L12 8Z"/>
                        </svg>
                      </div>
                      <div>
                        <strong>Antigravity:</strong> Kỹ sư AI "vô hình" giúp gõ code thần tốc, xây dựng kiến trúc mượt mà như không trọng lực.
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <ButtonLink to="/quiz/intro">
                Làm Quiz Ngay Tránh Mơ Hồ!
              </ButtonLink>
            </div>
          </div>

          {/* Right sidebar info */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="border-2 border-ink dark:border-white/20 dark:bg-slate-900">
              <Illustration illustrationKey="cartoon_philosopher" className="mx-auto h-48 w-full max-w-[200px]" />
              <h3 className="mt-4 text-center font-black text-lg text-ink dark:text-white">
                Lời cảnh báo biện chứng!
              </h3>
              <p className="mt-2 text-center text-xs leading-relaxed text-ink dark:text-white/75">
                Đây là bài trắc nghiệm phản tư mang tính vui vẻ, giúp tăng cường tình yêu triết học và khả năng tự nhận thức nhẹ nhàng. Mọi hành vi dùng kết quả này để tự phong mình làm triết gia ngoài đời thực đều bị phủ định bởi thực tiễn!
              </p>
            </Card>

            <Card className="bg-mint/30 dark:bg-teal-900/30 border-dashed border-2 border-mint dark:border-teal-700">
              <h4 className="font-black text-ink dark:text-white text-sm uppercase tracking-wide">
                Thông tin môn học
              </h4>
              <ul className="mt-3 list-disc pl-4 space-y-2 text-xs font-medium text-ink dark:text-white/85">
                <li><strong>Trường:</strong> Đại Học FPT TP.HCM</li>
                <li><strong>Môn học:</strong> Triết học Mác - Lênin (MLN111) & Kinh tế Chính trị Mác - Lênin (MLN122)</li>
                <li><strong>Mục tiêu:</strong> Học vui, thi tốt, hiểu sâu!</li>
                <li><strong>Phiên bản:</strong> v1.2.0 (Ổn định biện chứng)</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
