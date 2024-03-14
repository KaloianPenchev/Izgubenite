from Website import create_app, create_tests

app = create_app()
tests = create_tests()

if __name__ == '__main__':
    app.run(debug=True)