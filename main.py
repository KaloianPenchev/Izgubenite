from Website import create_app
from transformers.utils.hub import move_cache

move_cache()
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)