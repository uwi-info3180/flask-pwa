from flask import Flask, jsonify, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/some-other-page')
def other_page():
    return render_template('other-page.html')


@app.route('/offline.html')
def offline():
    return app.send_static_file('offline.html')


@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')

@app.after_request
def add_header(response):
    """
    Add headers to tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response