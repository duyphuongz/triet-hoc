import sys
sys.path.insert(0, ".")
from app.services.scoring_service import calculate_scores

WEIGHTS = {
    "q001": {"stoicism": 2, "pragmatism": 1},
    "q002": {"existentialism": 2, "absurdism": 1},
    "q003": {"utilitarianism": 2, "confucian_ethics": 1},
    "q004": {"epicureanism": 2, "humanism": 1},
    "q005": {"nihilism": 2, "existentialism": 1},
    "q006": {"absurdism": 2, "existentialism": 1},
    "q007": {"humanism": 2, "confucian_ethics": 1},
    "q008": {"confucian_ethics": 2, "utilitarianism": 1},
    "q009": {"idealism": 2, "existentialism": 1},
    "q010": {"materialism": 2, "pragmatism": 1},
    "q011": {"pragmatism": 2},
    "q012": {"stoicism": 2},
    "q013": {"existentialism": 2},
    "q014": {"utilitarianism": 2, "confucian_ethics": 1},
    "q015": {"epicureanism": 2},
    "q016": {"nihilism": 2, "absurdism": 1},
    "q017": {"absurdism": 2},
    "q018": {"humanism": 2},
    "q019": {"confucian_ethics": 2},
    "q020": {"materialism": 2, "pragmatism": 1},
}

PHILO_KEYS = [
    "stoicism", "epicureanism", "existentialism", "nihilism", "absurdism",
    "confucian_ethics", "pragmatism", "idealism", "materialism", "utilitarianism", "humanism",
]

passed = 0
failed = 0


def base(val=3):
    return {q: val for q in WEIGHTS}


def run(label, answers, expected_top1, expected_bottom=None):
    global passed, failed
    scores = calculate_scores(
        answers_by_code=answers,
        question_weights_by_code=WEIGHTS,
        philosophy_keys=PHILO_KEYS,
    )
    top3 = scores[:3]
    bottom = scores[-1]
    ok_top = scores[0].key == expected_top1
    ok_bot = (expected_bottom is None) or (bottom.key == expected_bottom)
    ok = ok_top and ok_bot
    if ok:
        passed += 1
    else:
        failed += 1
    status = "PASS" if ok else "FAIL"
    top3_str = ", ".join(f"{s.key}({s.percentage:.0f}%)" for s in top3)
    bot_str = f"{bottom.key}({bottom.percentage:.0f}%)"
    print(f"[{status}] {label}")
    print(f"  Top-3  : {top3_str}")
    print(f"  Bottom : {bot_str}")
    if not ok_top:
        print(f"  !! expected top1={expected_top1}, got {scores[0].key}")
    if not ok_bot and expected_bottom:
        print(f"  !! expected bottom={expected_bottom}, got {bottom.key}")
    print()


print("=" * 65)
print("  20 TEST CASES — Xu huong triet hoc")
print("=" * 65)
print()

# TC01 — Stoic thuan (q001, q012=5; phan epicureanism=1)
a = base(3); a["q001"] = 5; a["q012"] = 5; a["q004"] = 1; a["q015"] = 1
run("TC01  Stoic thuan", a, "stoicism", "epicureanism")

# TC02 — Epicurean thuan
a = base(3); a["q004"] = 5; a["q015"] = 5; a["q001"] = 1; a["q012"] = 1
run("TC02  Epicurean thuan", a, "epicureanism", "stoicism")

# TC03 — Existentialist thuan
a = base(3); a["q002"] = 5; a["q013"] = 5; a["q006"] = 4; a["q008"] = 1; a["q019"] = 1
run("TC03  Existentialist thuan", a, "existentialism", "confucian_ethics")

# TC04 — Nihilist thuan
a = base(3); a["q005"] = 5; a["q016"] = 5; a["q002"] = 1; a["q013"] = 1
run("TC04  Nihilist thuan", a, "nihilism", "existentialism")

# TC05 — Absurdist thuan
a = base(3); a["q006"] = 5; a["q017"] = 5; a["q016"] = 4
run("TC05  Absurdist thuan", a, "absurdism")

# TC06 — Confucian thuan
# confucian cao + q002=1/q006=1 → opposing deduct absurdism nhieu hon existentialism
a = base(3); a["q008"] = 5; a["q019"] = 5; a["q003"] = 4; a["q007"] = 4; a["q002"] = 1; a["q006"] = 1
run("TC06  Confucian thuan", a, "confucian_ethics", "absurdism")

# TC07 — Pragmatist thuan
a = base(3); a["q011"] = 5; a["q010"] = 4; a["q001"] = 4; a["q009"] = 1; a["q020"] = 4
run("TC07  Pragmatist thuan", a, "pragmatism", "idealism")

# TC08 — Idealist thuan
a = base(3); a["q009"] = 5; a["q010"] = 1; a["q011"] = 1; a["q020"] = 1
run("TC08  Idealist thuan", a, "idealism", "materialism")

# TC09 — Materialist thuan
a = base(3); a["q010"] = 5; a["q020"] = 5; a["q009"] = 1
run("TC09  Materialist thuan", a, "materialism", "idealism")

# TC10 — Utilitarian thuan
a = base(3); a["q003"] = 5; a["q014"] = 5; a["q004"] = 1; a["q007"] = 1; a["q018"] = 1
run("TC10  Utilitarian thuan", a, "utilitarianism", "humanism")

# TC11 — Humanist thuan
a = base(3); a["q007"] = 5; a["q018"] = 5; a["q004"] = 4; a["q003"] = 1; a["q014"] = 1
run("TC11  Humanist thuan", a, "humanism", "utilitarianism")

# TC12 — Stoic + Pragmatist (ky luat cong viec)
a = base(3); a["q001"] = 5; a["q012"] = 5; a["q011"] = 5; a["q010"] = 4
run("TC12  Stoic + Pragmatist", a, "stoicism")

# TC13 — Existentialist + Absurdist (nhan sinh quan)
# absurdism co 2 cau chu luc (q006,q017=5) / max nho → 93% > existentialism 89%
a = base(3); a["q002"] = 5; a["q013"] = 5; a["q006"] = 5; a["q017"] = 5
run("TC13  Existentialist + Absurdist", a, "absurdism")

# TC14 — Utilitarian + Confucian (dao duc xa hoi)
a = base(3); a["q003"] = 5; a["q014"] = 5; a["q008"] = 5; a["q019"] = 4
run("TC14  Utilitarian + Confucian", a, "utilitarianism")

# TC15 — Nihilist + Absurdist (phi ly)
# absurdism 87% sat nut nihilism 85% do q017=5 co max nho hon → absurdism thang
a = base(3); a["q005"] = 5; a["q016"] = 5; a["q017"] = 5; a["q006"] = 4
run("TC15  Nihilist + Absurdist", a, "absurdism")

# TC16 — Tat ca = 5
a = base(5)
scores = calculate_scores(answers_by_code=a, question_weights_by_code=WEIGHTS, philosophy_keys=PHILO_KEYS)
ok = all(s.percentage >= 0 for s in scores)
if ok:
    passed += 1
else:
    failed += 1
print(f"[{'PASS' if ok else 'FAIL'}] TC16  Tat ca = 5")
print(f"  Top-3  : {', '.join(f'{s.key}({s.percentage:.0f}%)' for s in scores[:3])}")
print(f"  Bottom : {scores[-1].key}({scores[-1].percentage:.0f}%)")
print()

# TC17 — Tat ca = 1
a = base(1)
scores = calculate_scores(answers_by_code=a, question_weights_by_code=WEIGHTS, philosophy_keys=PHILO_KEYS)
ok = all(s.percentage >= 0 for s in scores)
if ok:
    passed += 1
else:
    failed += 1
print(f"[{'PASS' if ok else 'FAIL'}] TC17  Tat ca = 1")
print(f"  Top-3  : {', '.join(f'{s.key}({s.percentage:.0f}%)' for s in scores[:3])}")
print(f"  Bottom : {scores[-1].key}({scores[-1].percentage:.0f}%)")
print()

# TC18 — Tat ca = 3 (neutral phai ra 60% het)
a = base(3)
scores = calculate_scores(answers_by_code=a, question_weights_by_code=WEIGHTS, philosophy_keys=PHILO_KEYS)
all_60 = all(abs(s.percentage - 60.0) < 0.01 for s in scores)
if all_60:
    passed += 1
else:
    failed += 1
print(f"[{'PASS' if all_60 else 'FAIL'}] TC18  Tat ca = 3 (neutral -> moi triet he = 60%)")
print(f"  Tat ca triet he: {scores[0].percentage:.2f}%")
print()

# TC19 — Stoic vs Epicurean can bang
a = base(3); a["q001"] = 5; a["q012"] = 5; a["q004"] = 5; a["q015"] = 5
scores = calculate_scores(answers_by_code=a, question_weights_by_code=WEIGHTS, philosophy_keys=PHILO_KEYS)
s_stoic = next(s for s in scores if s.key == "stoicism")
s_epic = next(s for s in scores if s.key == "epicureanism")
delta = abs(s_stoic.percentage - s_epic.percentage)
ok = delta < 5
if ok:
    passed += 1
else:
    failed += 1
print(f"[{'PASS' if ok else 'FAIL'}] TC19  Stoic vs Epicurean can bang")
print(f"  stoicism={s_stoic.percentage:.1f}%, epicureanism={s_epic.percentage:.1f}%, delta={delta:.1f}%")
print()

# TC20 — Pragmatist + Materialist
a = base(3); a["q010"] = 5; a["q020"] = 5; a["q011"] = 5; a["q009"] = 1
run("TC20  Pragmatist + Materialist", a, "pragmatism")

print("=" * 65)
print(f"  KET QUA: {passed} PASS / {failed} FAIL / 20 total")
print("=" * 65)
