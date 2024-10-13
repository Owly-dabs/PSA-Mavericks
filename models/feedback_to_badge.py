from dotenv import load_dotenv
from openai import OpenAI
import os
import requests

load_dotenv()
API_KEY = os.environ["API_KEY"]
SYSTEM_MESSAGE = {
    "role": "system",
    "content": (
        "You are an artificial intelligence assistant which parses feedbacks and assigns badges to users."
        "You must only return the top 3 badges for the user, nothing else. You must use this format: Badge 1, Badge 2, Badge 3"
        "You can choose from the following badges: Punctual, Goal-oriented, Detail-oriented, Effective Communicator, Problem Solver, Team Player, Innovative, Adaptable, Productive, Dependable."
        "You are to choose the top 3 badges for the user based on the feedback."
    ),
}

def get_feedback_to_badge(feedback):
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            SYSTEM_MESSAGE,
            {
                "role": "user",
                "content": feedback
            }
        ],
        "max_tokens": 500,
        "temperature": 0.2,
        "top_p": 0.9,
        "return_citations": False,
        "search_domain_filter": ["perplexity.ai"],
        "return_images": False,
        "return_related_questions": False,
        "search_recency_filter": "month",
        "top_k": 0,
        "stream": False,
        "presence_penalty": 0,
        "frequency_penalty": 1
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)

    return response.json()["choices"][0]["message"]["content"]

# def get_feedback_to_badge(feedback):
#     feedback_message = {
#             "role": "user",
#             "content": feedback,
#         }
    

#     client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

#     response = client.chat.completions.create(
#         model="llama-3.1-sonar-small-128k-chat",
#         messages=[SYSTEM_MESSAGE,feedback_message],
#     )

#     return response.choices[0].message["content"]

MOCK_FEEDBACK = \
    "John consistently demonstrates a strong ability to tackle challenges and find effective solutions, contributing significantly to our team’s success. His collaborative spirit and supportive nature make him a valued team member, always ready to lend a hand and enhance group efforts. Reliability is a hallmark of John's work ethic, consistently delivering high-quality results on time. His clear communication skills ensure smooth interactions and reduce misunderstandings, fostering a positive and efficient work environment. Moreover, John maintains a focus on achieving goals, skillfully managing his tasks to meet project objectives. His dedication and proactive approach are greatly appreciated and drive both personal and team success." \
    "John consistently sets and achieves ambitious goals, demonstrating a strong focus on driving projects to successful completion. His reliability is evident in his ability to consistently deliver high-quality work without the need for supervision, making him a dependable asset to our team. John's punctuality is exemplary; he consistently arrives on time for meetings and deadlines, ensuring that projects progress smoothly. As a team player, John actively participates in group efforts and supports his colleagues, fostering a collaborative and positive work environment. Moreover, John's attention to detail ensures that tasks are completed with a high level of accuracy and minimal errors. His meticulous approach contributes significantly to the overall quality of our team's output."

MOCK_RESPONSE = "Badge 1: Effective Communicator\nBadge 2: Problem Solver\nBadge 3: Team Player"

