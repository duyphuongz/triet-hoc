from dataclasses import dataclass
from typing import Mapping


@dataclass(frozen=True)
class ScoreResult:
    key: str
    raw_score: float
    percentage: float
    rank: int


def calculate_scores(
    *,
    answers_by_code: Mapping[str, int],
    question_weights_by_code: Mapping[str, Mapping[str, int]],
    philosophy_keys: list[str],
) -> list[ScoreResult]:
    raw_scores = {key: 0.0 for key in philosophy_keys}
    max_scores = {key: 0.0 for key in philosophy_keys}

    for question_code, weights in question_weights_by_code.items():
        answer_value = answers_by_code.get(question_code)
        for philosophy_key, weight in weights.items():
            if philosophy_key not in raw_scores:
                continue
            max_scores[philosophy_key] += 5 * max(weight, 0)
            if answer_value is not None:
                raw_scores[philosophy_key] += answer_value * weight

    # Calculate absolute ratios (0.0 to 1.0)
    abs_ratios = {
        key: (raw_scores[key] / max_scores[key]) if max_scores[key] > 0 else 0.0
        for key in philosophy_keys
    }

    total_abs_ratio = sum(abs_ratios.values())

    sorted_scores = sorted(
        (
            ScoreResult(
                key=key,
                raw_score=round(raw_scores[key], 2),
                percentage=round((abs_ratios[key] / total_abs_ratio) * 100, 2)
                if total_abs_ratio > 0
                else 0.0,
                rank=0,
            )
            for key in philosophy_keys
        ),
        key=lambda item: (-item.percentage, -item.raw_score, item.key),
    )

    return [
        ScoreResult(
            key=item.key,
            raw_score=item.raw_score,
            percentage=item.percentage,
            rank=index + 1,
        )
        for index, item in enumerate(sorted_scores)
    ]
