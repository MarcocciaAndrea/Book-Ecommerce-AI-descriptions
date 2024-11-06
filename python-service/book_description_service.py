from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Carica variabili d'ambiente
load_dotenv()

# Configura OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY non trovata nelle variabili d'ambiente!")

app = FastAPI(
    title="Book Description Service",
    description="Servizio per generare descrizioni di libri usando OpenAI",
    version="1.0.0"
)

# Configura CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BookInfo(BaseModel):
    title: str
    author: str
    year: int

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Book Description Service is running"
    }

@app.post("/generate-description")
async def generate_description(book: BookInfo):
    try:
        print(f"\nGenerating description for:")
        print(f"Title: {book.title}")
        print(f"Author: {book.author}")
        print(f"Year: {book.year}")

        # Crea il prompt per OpenAI
        prompt = f"""Generate an engaging and informative book description (max 150 words) for:
        Title: {book.title}
        Author: {book.author}
        Year: {book.year}

        The description should:
        - Be engaging and professional
        - Highlight the book's potential appeal
        - Be suitable for a bookstore website
        - Not include spoilers
        - Be written in the same language as the book title
        
        Description:"""

        # Chiamata a OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional book reviewer who writes engaging and concise book descriptions."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=200,
            temperature=0.7,
            presence_penalty=0.1,
            frequency_penalty=0.1
        )

        # Estrai la descrizione
        description = response.choices[0].message.content.strip()
        print(f"\nGenerated description:\n{description}")

        return {
            "description": description,
            "title": book.title,
            "author": book.author
        }

    except Exception as e:
        print(f"\nError generating description: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating description: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    print("\nStarting Book Description Service...")
    print(f"OpenAI API Key configured: {'Yes' if openai.api_key else 'No'}")
    print("\nAvailable endpoints:")
    print("  GET  /            - Service info")
    print("  GET  /docs        - API documentation")
    print("  POST /generate-description - Generate book description")
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=5001,
        log_level="info"
    ) 