from emotion_model import predict_with_probabilities

def test_emotion_model():
    first_sentence = "오늘 정말 행복해요!"
    previous_sentence = "어제는 조금 우울했어요."
    current_sentence = "오늘은 기분이 정말 좋아요!"

    try:
        emotion_ratios = predict_with_probabilities(first_sentence, previous_sentence, current_sentence)
        print("Emotion Ratios:", emotion_ratios)
    except Exception as e:
        print(f"Error during emotion classification: {e}")

if __name__ == "__main__":
    test_emotion_model()
