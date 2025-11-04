
from sentence_transformers import SentenceTransformer, util
import math

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_score(model_answer, student_answer):
    emb1 = model.encode(model_answer, convert_to_tensor=True)
    emb2 = model.encode(student_answer, convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(emb1, emb2)[0][0].item()
    return math.floor(similarity * 10)  # score out of 10

