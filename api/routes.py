from flask import render_template
from . import api

@api.route("/")
def index():
    return render_template("index.html")

@api.route("/admin")
def admin():
    return render_template("admin.html")

@api.route("/entrar")
def entrar():
    return render_template("entrar.html")

@api.route("/localizacao")
def localizacao():
    return render_template("localizacao.html")

@api.route("/pedidos")
def pedidos():
    return render_template("pedidos")

@api.route("/admin_adicionar")
def admin_adicionar():
    return render_template("admin_adicionar")

@api.route("/admin_cardapio")
def admin_cardapio():
    return render_template("admin_cardapio")

@api.route("/admin_index")
def admin_index():
    return render_template("admin_index")

@api.route("/admin_pedidos")
def admin_pedidos():
    return render_template("admin_pedidos")

@api.route("/admin_promocoes")
def admin_promocoes():
    return render_template("admin_promocoes")

@api.route("/admin_verpromocoes")
def admin_verpromocoes():
    return render_template("admin_verpromocoes.html")

@api.route("/cadastrar")
def cadastrar():
    return render_template("cadastrar.html")


@api.route("/cardapio")
def cardapio():
    return render_template("cardapio.html")

@api.route("/comprar")
def comprar():
    return render_template("comprar")

@api.route("/configuracoes")
def configuracoes():
    return render_template("configuracoes")