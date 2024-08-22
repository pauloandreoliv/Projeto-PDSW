from flask import render_template, Blueprint

html_routes = Blueprint('html_routes', __name__)

@html_routes.route("/")
def inicio():
    return render_template("index.html")

@html_routes.route("/admin")
def admin():
    return render_template("admin.html")

@html_routes.route("/entrar")
def entrar():
    return render_template("entrar.html")

@html_routes.route("/localizacao")
def localizacao():
    return render_template("localizacao.html")

@html_routes.route("/localizacao_user")
def localizacao_user():
    return render_template("localizacao_user.html")


@html_routes.route("/pedidos")
def pedidos():
    return render_template("pedidos.html")

@html_routes.route("/admin_adicionar")
def admin_adicionar():
    return render_template("admin_adicionar.html")

@html_routes.route("/admin_adicionarMapa")
def admin_adicionarMapa():
    return render_template("admin_adicionarMapa.html")

@html_routes.route("/admin_cardapio")
def admin_cardapio():
    return render_template("admin_cardapio.html")

@html_routes.route("/admin_index")
def admin_index():
    return render_template("admin_index.html")

@html_routes.route("/admin_pedidos")
def admin_pedidos():
    return render_template("admin_pedidos.html")

@html_routes.route("/admin_pedidosDiario")
def admin_pedidosDiario():
    return render_template("admin_pedidosDiario.html")



@html_routes.route("/admin_promocoes")
def admin_promocoes():
    return render_template("admin_promocoes.html")

@html_routes.route("/admin_verpromocoes")
def admin_verpromocoes():
    return render_template("admin_verpromocoes.html")

@html_routes.route("/cadastrar" )
def cadastrar():
    return render_template("cadastrar.html")


@html_routes.route("/cardapio")
def cardapio():
    return render_template("cardapio.html")

@html_routes.route("/comprar")
def comprar():
    return render_template("comprar.html")

@html_routes.route("/configuracoes")
def configuracoes():
    return render_template("configuracoes.html")

