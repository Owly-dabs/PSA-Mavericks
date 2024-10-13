from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/endpoint', methods=['GET', 'POST'])
def handle_request():
    if request.method == 'GET':
        return jsonify({'message': 'This is a GET request'})
    elif request.method == 'POST':
        data = request.json
        return jsonify({'received_data': data})

if __name__ == '__main__':
    app.run(debug=True)