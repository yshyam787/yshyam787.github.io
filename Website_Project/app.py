from flask import Flask, render_template, request

app = Flask(__name__)
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/message', methods=['POST'])
def message():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    messages.append({'name': name, 'email': email, 'message': message})
    return 'Message received!'

if __name__ == '__main__':
    app.run(debug=True, port = 5001)
