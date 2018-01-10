from flask import Flask, jsonify, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/news')
def api_news():
    return jsonify({'message': 'testing 1 2 3'})

if __name__ == '__main__':
    app.run(debug=True)
