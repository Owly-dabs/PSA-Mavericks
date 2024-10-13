from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests
import os
from feedback_to_badge import get_feedback_to_badge, parse_response_to_list

load_dotenv()
BACKEND_URL = os.environ["BACKEND_URL"]

app = Flask(__name__)

@app.route('/updateBadges/<string:user_id>', methods=['GET'])
def handle_request(user_id):
    # Send GET request to getFeedback to get feedback
    feedback_response = requests.get(
        f'{BACKEND_URL}/api/performance/{user_id}/getFeedback'
    )
    
    if feedback_response.status_code != 200:
        return jsonify({'status': 'failure', 'error': 'Failed to retrieve feedback'}), 500
    
    # Parse feedback from response
    combined_feedback = ""
    feedback_list = feedback_response.json()["feedbackList"]
    for feedback in feedback_list:
        feedback = feedback["feedbackText"]
        combined_feedback += feedback + " "
    
    # Run feedback_to_badge function to get top 3 badges
    top_badges_string = get_feedback_to_badge(combined_feedback)
    top_badges_list = parse_response_to_list(top_badges_string)
    
    # Create request object with badges 
    
    
    # Send POST request to setBadge
    
    return jsonify({"combinedFeedback": combined_feedback}), 200

if __name__ == '__main__':
    app.run(debug=True)