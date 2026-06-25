import logging
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.knowledge_node import KnowledgeNode
from app.models.knowledge_edge import KnowledgeEdge

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

NODES = [
    # Chương 1
    {
        "slug": "kinh-te-chinh-tri-mac-lenin",
        "title": "Kinh tế chính trị Mác - Lênin",
        "node_type": "concept",
        "group": 1,
        "content": "Kinh tế chính trị Mác - Lênin là môn khoa học kinh tế nghiên cứu các quan hệ kinh tế để tìm ra các quy luật chi phối sự vận động của các hiện tượng và quá trình hoạt động kinh tế của con người tương ứng với những trình độ phát triển nhất định của nền sản xuất xã hội."
    },
    {
        "slug": "c-mac-ph-angghen",
        "title": "C. Mác & Ph. Ăngghen",
        "node_type": "person",
        "group": 1,
        "content": "C. Mác (1818 - 1883) và Ph. Ăngghen (1820 - 1895) là hai nhà tư tưởng vĩ đại, người sáng lập ra hệ thống lý luận kinh tế chính trị mang tính cách mạng, khoa học, toàn diện về nền sản xuất tư bản chủ nghĩa."
    },
    {
        "slug": "v-i-lenin",
        "title": "V.I. Lênin",
        "node_type": "person",
        "group": 1,
        "content": "V.I. Lênin tiếp tục kế thừa, bổ sung, phát triển lý luận kinh tế chính trị theo phương pháp luận của C. Mác. Nổi bật là kết quả nghiên cứu chỉ ra những đặc điểm kinh tế của độc quyền, độc quyền nhà nước trong CNTB giai đoạn cuối thế kỷ XIX đầu thế kỷ XX."
    },
    {
        "slug": "doi-tuong-nghien-cuu-ktct",
        "title": "Đối tượng nghiên cứu của KTCT",
        "node_type": "concept",
        "group": 1,
        "content": "Đối tượng nghiên cứu của kinh tế chính trị Mác - Lênin là các quan hệ xã hội của sản xuất và trao đổi mà các quan hệ này được đặt trong sự liên hệ biện chứng với trình độ phát triển của lực lượng sản xuất và kiến trúc thượng tầng tương ứng của phương thức sản xuất nhất định."
    },
    {
        "slug": "phuong-phap-truu-tuong-hoa-khoa-hoc",
        "title": "Phương pháp trừu tượng hóa khoa học",
        "node_type": "method",
        "group": 1,
        "content": "Là phương pháp được tiến hành bằng cách nhận ra và gạt bỏ khỏi quá trình nghiên cứu những yếu tố ngẫu nhiên, những hiện tượng tạm thời, gián tiếp, trên cơ sở đó tách ra được những dấu hiệu điển hình, bền vững, ổn định, trực tiếp của đối tượng nghiên cứu."
    },
    
    # Chương 2
    {
        "slug": "san-xuat-hang-hoa",
        "title": "Sản xuất hàng hóa",
        "node_type": "concept",
        "group": 2,
        "content": "Sản xuất hàng hóa là kiểu tổ chức hoạt động kinh tế mà ở đó, những người sản xuất ra sản phẩm nhằm mục đích trao đổi, mua bán. Điều kiện ra đời: Phân công lao động xã hội và Sự tách biệt về mặt kinh tế của các chủ thể sản xuất."
    },
    {
        "slug": "hang-hoa",
        "title": "Hàng hóa",
        "node_type": "concept",
        "group": 2,
        "content": "Hàng hóa là sản phẩm của lao động, có thể thỏa mãn nhu cầu nào đó của con người thông qua trao đổi, mua bán. Hàng hóa có 2 thuộc tính: Giá trị sử dụng và Giá trị."
    },
    {
        "slug": "gia-tri-su-dung",
        "title": "Giá trị sử dụng",
        "node_type": "concept",
        "group": 2,
        "content": "Giá trị sử dụng của hàng hóa là công dụng của sản phẩm, có thể thỏa mãn nhu cầu nào đó của con người (vật chất hoặc tinh thần)."
    },
    {
        "slug": "gia-tri-hang-hoa",
        "title": "Giá trị hàng hóa",
        "node_type": "concept",
        "group": 2,
        "content": "Giá trị là lao động xã hội của người sản xuất hàng hóa kết tinh trong hàng hóa. Giá trị hàng hóa biểu hiện mối quan hệ kinh tế giữa những người sản xuất, trao đổi hàng hóa."
    },
    {
        "slug": "tinh-hai-mat-cua-lao-dong",
        "title": "Tính hai mặt của lao động",
        "node_type": "theory",
        "group": 2,
        "content": "C. Mác phát hiện ra rằng lao động sản xuất hàng hóa có tính hai mặt: mặt cụ thể (lao động cụ thể - tạo ra giá trị sử dụng) và mặt trừu tượng (lao động trừu tượng - tạo ra giá trị)."
    },
    {
        "slug": "tien-te",
        "title": "Tiền tệ",
        "node_type": "concept",
        "group": 2,
        "content": "Tiền là một loại hàng hóa đặc biệt, là kết quả của quá trình phát triển của sản xuất và trao đổi hàng hóa, tiền xuất hiện là yếu tố ngang giá chung cho thế giới hàng hóa. Tiền có 5 chức năng: Thước đo giá trị, Phương tiện lưu thông, Phương tiện cất trữ, Phương tiện thanh toán, Tiền tệ thế giới."
    },
    {
        "slug": "quy-luat-gia-tri",
        "title": "Quy luật giá trị",
        "node_type": "law",
        "group": 2,
        "content": "Là quy luật kinh tế cơ bản của sản xuất hàng hóa. Yêu cầu việc sản xuất và trao đổi hàng hóa phải được tiến hành trên cơ sở của hao phí lao động xã hội cần thiết."
    },

    # Chương 3
    {
        "slug": "gia-tri-thang-du",
        "title": "Giá trị thặng dư (m)",
        "node_type": "concept",
        "group": 3,
        "content": "Giá trị thặng dư là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra, là kết quả của lao động không công của công nhân cho nhà tư bản."
    },
    {
        "slug": "hang-hoa-suc-lao-dong",
        "title": "Hàng hóa sức lao động",
        "node_type": "concept",
        "group": 3,
        "content": "Là toàn bộ những năng lực thể chất và tinh thần tồn tại trong cơ thể, trong một con người đang sống, và được người đó đem ra vận dụng mỗi khi sản xuất ra một giá trị sử dụng nào đó. Nó là hàng hóa đặc biệt, có khả năng tạo ra giá trị lớn hơn giá trị của chính nó."
    },
    {
        "slug": "tu-ban",
        "title": "Tư bản",
        "node_type": "concept",
        "group": 3,
        "content": "Tư bản là giá trị đem lại giá trị thặng dư bằng cách bóc lột lao động làm thuê."
    },
    {
        "slug": "tu-ban-bat-bien",
        "title": "Tư bản bất biến (c)",
        "node_type": "concept",
        "group": 3,
        "content": "Bộ phận tư bản tồn tại dưới hình thái tư liệu sản xuất mà giá trị được lao động cụ thể của công nhân làm thuê bảo toàn và chuyển nguyên vẹn vào giá trị sản phẩm, tức là giá trị không biến đổi trong quá trình sản xuất."
    },
    {
        "slug": "tu-ban-kha-bien",
        "title": "Tư bản khả biến (v)",
        "node_type": "concept",
        "group": 3,
        "content": "Bộ phận tư bản dùng để mua hàng hóa sức lao động. Giá trị của nó không tái hiện ra, nhưng thông qua lao động trừu tượng của công nhân làm thuê mà tăng lên (tạo ra giá trị thặng dư)."
    },
    {
        "slug": "tich-luy-tu-ban",
        "title": "Tích lũy tư bản",
        "node_type": "concept",
        "group": 3,
        "content": "Bản chất của tích lũy tư bản là quá trình tái sản xuất mở rộng tư bản chủ nghĩa thông qua việc chuyển hóa một phần giá trị thặng dư thành tư bản phụ thêm."
    },
    {
        "slug": "loi-nhuan",
        "title": "Lợi nhuận (p)",
        "node_type": "concept",
        "group": 3,
        "content": "Lợi nhuận là số chênh lệch giữa giá trị hàng hóa và chi phí sản xuất. Nó là hình thái biểu hiện của giá trị thặng dư trên bề mặt nền kinh tế thị trường, làm che giấu bản chất bóc lột."
    },

    # Chương 4
    {
        "slug": "doc-quyen",
        "title": "Độc quyền",
        "node_type": "concept",
        "group": 4,
        "content": "Độc quyền là sự liên minh giữa các doanh nghiệp lớn, có khả năng thâu tóm việc sản xuất và tiêu thụ một số loại hàng hoá, có khả năng định ra giá cả độc quyền, nhằm thu lợi nhuận độc quyền cao."
    },
    {
        "slug": "doc-quyen-nha-nuoc",
        "title": "Độc quyền nhà nước",
        "node_type": "concept",
        "group": 4,
        "content": "Là kiểu độc quyền trong đó nhà nước nắm giữ vị thế độc quyền trên cơ sở duy trì sức mạnh của các tổ chức độc quyền ở những lĩnh vực then chốt của nền kinh tế nhằm tạo ra sức mạnh vật chất cho sự ổn định của chế độ chính trị - xã hội."
    },
    {
        "slug": "canh-tranh",
        "title": "Cạnh tranh",
        "node_type": "concept",
        "group": 4,
        "content": "Là sự ganh đua giữa những chủ thể kinh tế với nhau nhằm có được những ưu thế về sản xuất cũng như tiêu thụ và thông qua đó thu được lợi ích tối đa. Cạnh tranh và độc quyền luôn tồn tại song hành."
    },

    # Chương 5
    {
        "slug": "kinh-te-thi-truong-dinh-huong-xhcn",
        "title": "Kinh tế thị trường định hướng XHCN",
        "node_type": "concept",
        "group": 5,
        "content": "Là nền kinh tế vận hành theo các quy luật của thị trường, đồng thời góp phần hướng tới từng bước xác lập một xã hội mà ở đó dân giàu, nước mạnh, dân chủ, công bằng, văn minh; có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo."
    },
    {
        "slug": "quan-he-loi-ich-kinh-te",
        "title": "Quan hệ lợi ích kinh tế",
        "node_type": "concept",
        "group": 5,
        "content": "Là sự thiết lập những tương tác giữa con người với con người, giữa các tổ chức kinh tế... nhằm mục tiêu xác lập các lợi ích kinh tế trong mối liên hệ với trình độ phát triển của lực lượng sản xuất và kiến trúc thượng tầng."
    },

    # Chương 6
    {
        "slug": "cong-nghiep-hoa",
        "title": "Công nghiệp hóa",
        "node_type": "concept",
        "group": 6,
        "content": "Công nghiệp hóa là quá trình chuyển đổi nền sản xuất xã hội từ dựa trên lao động thủ công là chính sang nền sản xuất xã hội dựa chủ yếu trên lao động bằng máy móc nhằm tạo ra năng suất lao động xã hội cao."
    },
    {
        "slug": "cach-mang-cong-nghiep-4-0",
        "title": "Cách mạng công nghiệp 4.0",
        "node_type": "concept",
        "group": 6,
        "content": "Cách mạng công nghiệp lần thứ tư được hình thành trên cơ sở cuộc cách mạng số, gắn với sự phát triển và phổ biến của internet kết nối vạn vật (IoT), trí tuệ nhân tạo (AI), big data, in 3D..."
    },
    {
        "slug": "hoi-nhap-kinh-te-quoc-te",
        "title": "Hội nhập kinh tế quốc tế",
        "node_type": "concept",
        "group": 6,
        "content": "Hội nhập kinh tế quốc tế của một quốc gia là quá trình quốc gia đó thực hiện gắn kết nền kinh tế của mình với nền kinh tế thế giới dựa trên sự chia sẻ lợi ích, đồng thời tuân thủ các chuẩn mực quốc tế chung."
    }
]

EDGES = [
    # Chương 1
    {"source": "kinh-te-chinh-tri-mac-lenin", "target": "c-mac-ph-angghen", "label": "được sáng lập bởi"},
    {"source": "kinh-te-chinh-tri-mac-lenin", "target": "v-i-lenin", "label": "được bảo vệ và phát triển bởi"},
    {"source": "kinh-te-chinh-tri-mac-lenin", "target": "doi-tuong-nghien-cuu-ktct", "label": "nghiên cứu"},
    {"source": "kinh-te-chinh-tri-mac-lenin", "target": "phuong-phap-truu-tuong-hoa-khoa-hoc", "label": "sử dụng phương pháp"},
    
    # Chương 2
    {"source": "san-xuat-hang-hoa", "target": "hang-hoa", "label": "tạo ra"},
    {"source": "hang-hoa", "target": "gia-tri-su-dung", "label": "có thuộc tính"},
    {"source": "hang-hoa", "target": "gia-tri-hang-hoa", "label": "có thuộc tính"},
    {"source": "gia-tri-hang-hoa", "target": "tien-te", "label": "được biểu hiện bằng"},
    {"source": "san-xuat-hang-hoa", "target": "tinh-hai-mat-cua-lao-dong", "label": "giải thích bản chất của"},
    {"source": "tinh-hai-mat-cua-lao-dong", "target": "gia-tri-hang-hoa", "label": "lao động trừu tượng tạo ra"},
    {"source": "tinh-hai-mat-cua-lao-dong", "target": "gia-tri-su-dung", "label": "lao động cụ thể tạo ra"},
    {"source": "san-xuat-hang-hoa", "target": "quy-luat-gia-tri", "label": "tuân theo"},
    {"source": "quy-luat-gia-tri", "target": "gia-tri-hang-hoa", "label": "điều tiết thông qua"},

    # Chương 3
    {"source": "tu-ban", "target": "gia-tri-thang-du", "label": "đem lại"},
    {"source": "hang-hoa-suc-lao-dong", "target": "gia-tri-thang-du", "label": "là nguồn gốc tạo ra"},
    {"source": "tu-ban", "target": "hang-hoa-suc-lao-dong", "label": "mua"},
    {"source": "tu-ban", "target": "tu-ban-bat-bien", "label": "được chia thành"},
    {"source": "tu-ban", "target": "tu-ban-kha-bien", "label": "được chia thành"},
    {"source": "tu-ban-kha-bien", "target": "hang-hoa-suc-lao-dong", "label": "dùng để mua"},
    {"source": "tu-ban-kha-bien", "target": "gia-tri-thang-du", "label": "trực tiếp tạo ra"},
    {"source": "tu-ban-bat-bien", "target": "gia-tri-thang-du", "label": "là điều kiện để sản xuất ra"},
    {"source": "gia-tri-thang-du", "target": "tich-luy-tu-ban", "label": "được chuyển hóa thành"},
    {"source": "gia-tri-thang-du", "target": "loi-nhuan", "label": "chuyển hóa thành (biểu hiện bề mặt)"},

    # Lênin, Mác với Chương 3, 4
    {"source": "c-mac-ph-angghen", "target": "tinh-hai-mat-cua-lao-dong", "label": "phát hiện ra"},
    {"source": "c-mac-ph-angghen", "target": "gia-tri-thang-du", "label": "xây dựng học thuyết"},
    {"source": "v-i-lenin", "target": "doc-quyen", "label": "phân tích 5 đặc điểm của"},
    {"source": "v-i-lenin", "target": "doc-quyen-nha-nuoc", "label": "phân tích bản chất của"},
    
    # Chương 4
    {"source": "canh-tranh", "target": "doc-quyen", "label": "tất yếu dẫn tới"},
    {"source": "doc-quyen", "target": "doc-quyen-nha-nuoc", "label": "phát triển lên trình độ cao là"},
    {"source": "tu-ban", "target": "doc-quyen", "label": "phát triển từ tự do cạnh tranh sang"},

    # Chương 5
    {"source": "kinh-te-thi-truong-dinh-huong-xhcn", "target": "quy-luat-gia-tri", "label": "tuân theo"},
    {"source": "kinh-te-thi-truong-dinh-huong-xhcn", "target": "quan-he-loi-ich-kinh-te", "label": "cần đảm bảo hài hòa"},

    # Chương 6
    {"source": "kinh-te-thi-truong-dinh-huong-xhcn", "target": "cong-nghiep-hoa", "label": "thúc đẩy thực hiện"},
    {"source": "cong-nghiep-hoa", "target": "cach-mang-cong-nghiep-4-0", "label": "cần thích ứng với"},
    {"source": "kinh-te-thi-truong-dinh-huong-xhcn", "target": "hoi-nhap-kinh-te-quoc-te", "label": "tất yếu dẫn đến"}
]

def seed_knowledge_graph():
    db = SessionLocal()
    try:
        # Xoá data cũ
        db.query(KnowledgeEdge).delete()
        db.query(KnowledgeNode).delete()
        db.commit()
        
        # Thêm nodes
        node_map = {}
        for node_data in NODES:
            node = KnowledgeNode(
                slug=node_data["slug"],
                course_code="MLN122",
                title=node_data["title"],
                node_type=node_data["node_type"],
                group=node_data["group"],
                content=node_data["content"]
            )
            db.add(node)
            db.commit()
            db.refresh(node)
            node_map[node.slug] = node.id
            logger.info(f"Created node: {node.title}")

        # Thêm edges
        for edge_data in EDGES:
            source_slug = edge_data["source"]
            target_slug = edge_data["target"]
            
            if source_slug in node_map and target_slug in node_map:
                edge = KnowledgeEdge(
                    source_id=node_map[source_slug],
                    target_id=node_map[target_slug],
                    label=edge_data["label"]
                )
                db.add(edge)
                logger.info(f"Created edge: {source_slug} -> {target_slug}")
            else:
                logger.warning(f"Skipped edge: {source_slug} -> {target_slug}")

        db.commit()
        logger.info("Successfully seeded knowledge graph data!")
    except Exception as e:
        logger.error(f"Error seeding knowledge graph: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_knowledge_graph()
