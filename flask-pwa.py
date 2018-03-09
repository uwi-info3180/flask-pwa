from flask import Flask, jsonify, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return 'About'

@app.route('/offline.html')
def offline():
    return app.send_static_file('offline.html')

@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')

@app.route('/api/news')
def api_news():
    return jsonify({'message': 'testing 1 2 3'})

if __name__ == '__main__':
    app.run(debug=True)
