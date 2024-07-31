from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/entrar")
def entrar():
    return render_template("entrar.html")

@app.route("/localizacao")
def localizacao():
    return render_template("localizacao.html")

@app.route("/pedidos")
def pedidos():
    return render_template("pedidos")

@app.route("/admin_adicionar")
def admin_adicionar():
    return render_template("admin_adicionar")

@app.route("/admin_cardapio")
def admin_cardapio():
    return render_template("admin_cardapio")

@app.route("/admin_index")
def admin_index():
    return render_template("admin_index")

@app.route("/admin_pedidos")
def admin_pedidos():
    return render_template("admin_pedidos")

@app.route("/admin_promocoes")
def admin_promocoes():
    return render_template("admin_promocoes")

@app.route("/admin_verpromocoes")
def admin_verpromocoes():
    return render_template("admin_verpromocoes.html")

@app.route("/cadastrar")
def cadastrar():
    return render_template("cadastrar.html")


@app.route("/cardapio")
def cardapio():
    return render_template("cardapio.html")

@app.route("/comprar")
def comprar():
    return render_template("comprar")

@app.route("/configuracoes")
def configuracoes():
    return render_template("configuracoes")

app.run()