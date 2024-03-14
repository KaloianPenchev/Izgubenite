from Website import create_app

app = create_app()

print("App created")

if __name__ == '__main__':
    app.run(debug=True)