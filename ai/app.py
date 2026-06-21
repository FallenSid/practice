from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    message = request.json["message"]

    response = model.generate_content(message)

    return jsonify({
        "response": response.text
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)