from app.services.scoring_service import calculate_scores


def test_calculate_scores_normalizes_by_possible_weighted_score() -> None:
    scores = calculate_scores(
        answers_by_code={"q1": 5, "q2": 3},
        question_weights_by_code={
            "q1": {"stoicism": 2, "pragmatism": 1},
            "q2": {"stoicism": 1, "existentialism": 2},
        },
        philosophy_keys=["stoicism", "pragmatism", "existentialism"],
    )

    by_key = {score.key: score for score in scores}

    assert by_key["stoicism"].raw_score == 13
    assert by_key["stoicism"].percentage == 86.67
    assert by_key["pragmatism"].percentage == 100
    assert by_key["existentialism"].percentage == 60
    assert scores[0].key == "pragmatism"


def test_calculate_scores_keeps_zero_for_unweighted_profiles() -> None:
    scores = calculate_scores(
        answers_by_code={"q1": 4},
        question_weights_by_code={"q1": {"stoicism": 2}},
        philosophy_keys=["stoicism", "nihilism"],
    )

    assert {score.key: score.percentage for score in scores} == {
        "stoicism": 80,
        "nihilism": 0,
    }
