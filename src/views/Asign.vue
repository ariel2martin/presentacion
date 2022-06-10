<template>
  <div>
    <v-alert border="left" color="indigo" dark class="caption">
      <p>Esta aplicacion está pensada para ser una interfaz del ERP</p>
      La primer columna es un listado de pagos de un cliente, la segunda son las
      facturas, y aqui a mano indicamos cuáles pagos cancelan cuáles facturas.
      El resultado volverá al ERP.
    </v-alert>
    <v-alert
      id="ocultaresto"
      border="left"
      color="indigo lighten-2"
      dark
      class="caption"
    >
      Con el mouse tome un pago y arrástrelo hacia una factura, suéltelo sobre
      la elegida. La relación se mostrará dentro de un canvas
    </v-alert>
    <v-alert
      id="alertpantallachica"
      border="left"
      color="red accent-2"
      dark
      icon="mdi-star"
    >
      La resolucion de pantalla que ud dispone es muy pequeña y no podrá
      utilizar esta aplicación. El ancho mínimo es de
      {{ this.n_posInicX_pos + this.n_anchoDestino }} píxeles
    </v-alert>
    <v-alert
      id="alertpantallatouch"
      border="left"
      color="red accent-2"
      dark
      icon="mdi-star"
    >
      Esta aplicación necesita mouse, si lo tuviera podría tomar un pago,
      arrastrarlo sobre las facturas, ver información adicional de ambos, y al
      soltar el mouse ambos pago y factura se relacionarán con una linea y el
      importe será actualizado
    </v-alert>
    <v-container class="contenedor">
      <div id="n_listaOrigen"></div>
      <canvas id="elcanvas" style="position: absolute"
        >Your browser does not support the HTML5 Solo podrá aplicar comprobantes
        de montos iguales
      </canvas>
      <div id="n_listaDestino"></div>

      <v-card id="cuadroCompara" class="borderColorido" width="310px">
        <div>
          <v-icon color="green" x-large>{{ iconoCompara }}</v-icon>

          diferencia: {{ muestra_diferencia }}
        </div>

        <v-divider class="mx-4"></v-divider>
        <v-row
          ><v-col sm="6"
            ><div>Pago:</div>
            <div style="padding-left: 16px" class="caption">
              <div>${{ muestra_pago }}</div>
              <div>
                {{ muestra_pago_fecha }}
              </div>
            </div>
            <div class="mt-2">
              {{ muestra_pago_metodo }}
            </div>
            <div class="mt-2">
              {{ muestra_pago_ingreso }}
            </div>
          </v-col>
          <v-col sm="6"
            ><div>Factura:</div>
            <div style="padding-left: 16px" class="caption">
              <div>${{ muestra_factura }}</div>
              <div>
                {{ muestra_factura_fecha }}
              </div>
            </div>
            <div class="mt-2">
              {{ muestra_factura_items }}
            </div>
          </v-col></v-row
        >
      </v-card>
    </v-container>
  </div>
</template>
<script>
import config from "../../configuraciones.js";

export default {
  data() {
    return {
      muestramensaje1: true,
      pagos: [
        {
          numero: "23453",
          monto: "3420",
          fecha: "2022/01/22",
          metodo: "transferencia bancaria BBVA",
          ingreso: "Cuenta corrriente",
        },
        {
          numero: "23501",
          monto: "5620",
          fecha: "2022/02/22",
          metodo: "Eventbrite",
          ingreso: "web app",
        },
        {
          numero: "23543",
          monto: "5000",
          fecha: "2022/02/23",
          metodo: "efectivo",
          ingreso: "Sucursal 1",
        },
        {
          numero: "23590",
          monto: "3420",
          fecha: "2022/01/27",
          metodo: "transferencia bancaria Galicia",
          ingreso: "Caja de ahorro",
        },
        {
          numero: "23600",
          monto: "500",
          fecha: "2022/04/05",
          metodo: "Efectivo",
          ingreso: "Sucursal 2",
        },
        {
          numero: "23601",
          monto: "7231.25",
          fecha: "2022/04/05",
          metodo: "Cheque de terceros",
          ingreso: "Sucursal 2",
        },
        {
          numero: "23650",
          monto: "2450",
          fecha: "2022/04/12",
          metodo: "transferencia bancaria BBVA",
          ingreso: "Cuenta corrriente",
        },
        {
          numero: "23657",
          monto: "111.50",
          fecha: "2022/04/17",
          metodo: "transferencia bancaria BBVA",
          ingreso: "Cuenta corrriente",
        },
        {
          numero: "23680",
          monto: "234.50",
          fecha: "2022/04/22",
          metodo: "transferencia bancaria BBVA",
          ingreso: "Cuenta corrriente",
        },
        {
          numero: "23681",
          monto: "4321.20",
          fecha: "2022/04/22",
          metodo: "transferencia bancaria BBVA",
          ingreso: "Cuenta corrriente",
        },
      ],
      facturas: [
        {
          numero: "0001-00000220",
          tipo: "B",
          monto: "1200",
          fecha: "2022/01/02",
          items: "50 tornillos , 50 tuercas",
        },
        {
          numero: "0001-00001200",
          tipo: "A",
          monto: "3420",
          fecha: "2022/01/09",
          items: "tornillos y tuercas",
        },
        {
          numero: "0001-00001232",
          tipo: "A",
          monto: "22000",
          fecha: "2022/01/10",
          items: "pintura",
        },
        {
          numero: "0001-00001241",
          tipo: "A",
          monto: "1234",
          fecha: "2022/01/12",
          items: "varios",
        },
        {
          numero: "0004-00001266",
          tipo: "A",
          monto: "500",
          fecha: "2022/01/15",
          items: "destornillador",
        },
        {
          numero: "0001-00001267",
          tipo: "A",
          monto: "800",
          fecha: "2022/04/22",
          items: "cerrojo",
        },
        {
          numero: "0002-00001288",
          tipo: "A",
          monto: "202.50",
          fecha: "2022/04/22",
          items: "ventilador de techo",
        },
        {
          numero: "0003-00000200",
          tipo: "A",
          monto: "520.50",
          fecha: "2022/04/22",
          items: "horno eléctrico",
        },
        {
          numero: "0003-00000202",
          tipo: "A",
          monto: "700",
          fecha: "2022/04/22",
          items: "tornillostuercas",
        },
        {
          numero: "0001-00001010",
          tipo: "A",
          monto: "4000",
          fecha: "2022/04/22",
          items: "vanitory, azulejos, espejo",
        },
        {
          numero: "0004-00000001",
          tipo: "A",
          monto: "2000",
          fecha: "2022/04/22",
          items: "mesa de trabajo",
        },
        {
          numero: "0004-00000005",
          tipo: "A",
          monto: "100.50",
          fecha: "2022/04/22",
          items: "repuesto de sierra",
        },
        {
          numero: "0004-00000006",
          tipo: "A",
          monto: "300.50",
          fecha: "2022/04/22",
          items: "clavos",
        },
        {
          numero: "0004-00000008",
          tipo: "A",
          monto: "40000",
          fecha: "2022/04/22",
          items: "juego de muebles",
        },
        {
          numero: "0004-00000011",
          tipo: "A",
          monto: "12000",
          fecha: "2022/02/22",
          items: "15 zapatillas",
        },
        {
          numero: "0004-00000016",
          tipo: "A",
          monto: "2000",
          fecha: "2022/02/22",
          items: "12 martillos, 10 destornilladores",
        },
      ],
      n_clientXinicial: 0,
      n_clientYinicial: 0,
      n_scrollInicial: 0,
      n_InicTextX: 0,
      n_InicTextY: 0,
      n_idOrigen: 0,
      n_idDestino: 0,
      n_gapLista: 40,

      n_flagMouse: false,

      n_posInicX: 20,
      n_posInicX_pos: 570,
      n_posInicY: 190,
      n_anchoDrag: 180,
      n_anchoDestino: 230,
      n_canvasAltura: 100,
      muestra_pago: "",
      muestra_pago_fecha: "",
      muestra_pago_metodo: "",
      muestra_pago_ingreso: "",

      muestra_factura: "",
      muestra_factura_fecha: "",
      muestra_factura_items: "",
      muestra_diferencia: "",
      iconoCompara: "mdi-information",
    };
  },

  beforeCreate() {
    //console.log("beforeCreate");
  },
  created() {
    //console.log("created");
  },
  beforeMount() {
    //console.log("beforeMount");
  },
  mounted() {
    //console.log("screen.width", screen.width);
    if (screen.width < this.n_posInicX_pos + this.n_anchoDestino) {
      //es mejor usar display none en vez de inline porque v-alert al iniciar toma el ancho de pantalla
      document.getElementById("ocultaresto").style.display = "none";
    } else {
      if ("ontouchstart" in window) {
        /* browser with Touch Events     running on touch-capable device */
        document.getElementById("ocultaresto").style.display = "none";
      } else {
        document.getElementById("alertpantallatouch").style.display = "none";
      }
      document.getElementById("alertpantallachica").style.display = "none";
      this.n_listaOrigen();
      this.n_listaDestino();
      this.n_iniciaCanvas(); //va luego de iniciar origen y destino, con el fin de saber la altura que tendrá
      this.cuadroCompara();
    }

    //console.log("mounted");
  },
  beforeUpdate() {
    //console.log("beforeUpdate");
  },
  updated() {
    //console.log("updated");
  },
  beforeDestroy() {
    //console.log("beforeDestroy");
  },
  destroyed() {
    //console.log("destroyed");
  },
  methods: {
    n_listaOrigen() {
      let lugar = document.getElementById("n_listaOrigen");
      lugar.style.position = "absolute";
      lugar.style.top = this.n_posInicY + "px";
      lugar.style.left = this.n_posInicX + "px";

      let posY = 0;
      for (let p in this.pagos) {
        lugar.innerHTML +=
          `<span style="width:` +
          this.n_anchoDrag +
          `px;top:` +
          posY +
          `px;left:` +
          this.n_posInicX +
          `px;"

          id='NEG` +
          this.pagos[p].numero.toString() +
          `'
          class="drag  chip"
          data-value="` +
          this.pagos[p].monto +
          `"
          data-date="` +
          this.pagos[p].fecha +
          `"
          data-metodo="` +
          this.pagos[p].metodo +
          `"
          data-ingreso="` +
          this.pagos[p].ingreso +
          `"
          >` +
          "P" +
          this.pagos[p].numero +
          " " +
          new Date(this.pagos[p].fecha).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }) +
          "&nbsp;<monto>$" +
          this.pagos[p].monto.toString() +
          "</monto>" +
          `</span>`;
        posY += this.n_gapLista;

        this.n_canvasAltura = Math.max(
          p * this.n_gapLista,
          this.n_canvasAltura
        );
      }

      for (let t in document.getElementsByClassName("drag")) {
        if (!isNaN(t)) {
          document
            .getElementsByClassName("drag")
            [t].addEventListener("mousedown", this.OnMouseDown);
        }
      }
    },
    cuadroCompara() {
      let lugar = document.getElementById("cuadroCompara");
      lugar.style.position = "absolute";
      lugar.style.left = this.n_anchoDrag + 60 + "px";
      lugar.style.display = "none";
      window.addEventListener("scroll", this.alturaCuadroCompara);
    },
    n_listaDestino() {
      let lugar = document.getElementById("n_listaDestino");
      lugar.style.position = "absolute";
      lugar.style.top = this.n_posInicY + "px";
      lugar.style.left = "0px";

      let posY = 0;
      for (let p in this.facturas) {
        lugar.innerHTML +=
          `<span   style="width:` +
          this.n_anchoDestino +
          `px;top:` +
          posY +
          `px;left:` +
          this.n_posInicX_pos +
          `px;"
           id='POS` +
          this.facturas[p].numero.toString() +
          `'
          class="destino chip"

          data-value="` +
          this.facturas[p].monto +
          `"
          data-date="` +
          this.facturas[p].fecha +
          `"
data-items="` +
          this.facturas[p].items +
          `"
          >` +
          this.facturas[p].tipo +
          this.facturas[p].numero +
          " " +
          new Date(this.facturas[p].fecha).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }) +
          "&nbsp;<monto>$" +
          this.facturas[p].monto.toString() +
          "</monto>" +
          `</span>`;
        posY += this.n_gapLista;
        this.n_canvasAltura = Math.max(
          p * this.n_gapLista,
          this.n_canvasAltura
        );
      }

      for (let t in document.getElementsByClassName("destino")) {
        if (!isNaN(t)) {
          document
            .getElementsByClassName("destino")
            [t].addEventListener("mouseover", this.arribaDeDestino);

          document
            .getElementsByClassName("destino")
            [t].addEventListener("mouseout", this.saleDeDestino);
        }
      }
    },
    n_iniciaCanvas() {
      let elcanvas = document.getElementById("elcanvas");
      elcanvas.style.position = "absolute";
      elcanvas.style.top = this.n_posInicY + "px";
      elcanvas.style.left = "0px";
      elcanvas.style.background = "#121212";
      // es width, no sttyle.width, y sin "px"
      elcanvas.width = this.n_posInicX_pos + this.n_anchoDestino - 100;
      elcanvas.height = this.n_canvasAltura + this.n_gapLista;
      document.getElementsByClassName("v-main__wrap")[0].style.height =
        this.n_canvasAltura + this.n_gapLista;
    },

    arribaDeDestino(e) {
      //console.log("arriba " + e.srcElement.id + e.toElement.dataset.value);

      if (this.n_flagMouse && e.toElement.dataset.value != 0) {
        //let cual = document.getElementById(target.id);
        this.n_idDestino = e.srcElement.id;

        //this.muestra_diferencia = e.getAttribute("data-value");

        let paga = this.muestra_pago;
        let factura = e.toElement.dataset.value;
        this.muestra_factura = e.toElement.dataset.value;
        this.muestra_factura_fecha = e.toElement.dataset.date;
        this.muestra_factura_items = e.toElement.dataset.items;
        this.muestra_diferencia = Math.round((paga - factura) * 100) / 100;
        if (paga == factura) {
          this.iconoCompara = "mdi-check";
        } else if (paga < factura) {
          this.iconoCompara = "mdi-unfold-less-horizontal";
        } else {
          this.iconoCompara = "mdi-unfold-more-horizontal";
        }
        /*
        id = parseInt(cual);
				if (id != n_idDestino && Right(target.className, 7) != 'ubicado') {
					n_idDestino = id;
					$("#POS" + n_idDestino).css("background", "lightgray");
				*/
      }
    },
    saleDeDestino(e) {
      if (this.n_flagMouse) {
        this.n_idDestino = 0;
        this.muestra_factura = "";
        this.muestra_factura_fecha = "";
        this.muestra_factura_items = "";
      }
    },
    OnMouseDown(q) {
      //console.log("e: ", e); //es muy interesante ver esto
      // por compativbilidad con navegadores viejos si no tiene e.target usa e.srcElement
      if (q == null) q = window.event;
      var target = q.target != null ? q.target : q.srcElement;

      // fin por compatibilidad

      if (target.localName == "monto") target = q.path[1]; //resulta que tengo el tag "monto" dentro del tag donde escucha el evento mousedown,  el tag monto no tiene id, entonces tengo que leer el id del tag padre, llego a el con path
      //console.log(q);

      if (
        (q.button == 1 && window.event != null) ||
        q.button == 0
        //&& this.Left(target.id, 3) == "NEG" este control ahora no es necesario
      ) {
        // flagmouse va a ser fundamental para habilitar funciones
        this.n_flagMouse = true;

        let cual = document.getElementById(target.id);
        this.n_InicTextX = this.ExtractNumber(cual.style.left);
        this.n_InicTextY = this.ExtractNumber(cual.style.top);

        this.n_clientXinicial = q.clientX;
        this.n_clientYinicial = q.clientY;

        this.n_scrollInicial = document.documentElement.scrollTop;

        this.n_idOrigen = target.id;

        document.onmousemove = this.OnMouseMove; //tiene que ser en document y no en elemento porque sino se pone lento
        //document.ontouchmove = this.OnMouseMove; //para mobile
        /*document.ontouchmove = function () {
          console.warn("si");
        };
        */
        document.onmouseup = this.OnMouseUp;
        //document.body.focus();
        document.onselectstart = function () {
          return false;
        };
        target.ondragstart = function () {
          return false;
        };
        //console.log(target);
        let cuadro = document.getElementById("cuadroCompara");
        cuadro.style.top =
          this.n_posInicY - 80 + document.documentElement.scrollTop + "px";
        cuadro.style.display = "inline";

        this.muestra_diferencia = target.getAttribute("data-value");
        this.muestra_pago = target.getAttribute("data-value");

        this.muestra_pago_fecha = target.getAttribute("data-date");
        this.muestra_pago_metodo = target.getAttribute("data-metodo");
        this.muestra_pago_ingreso = target.getAttribute("data-ingreso");

        this.muestra_factura = "";
        this.muestra_factura_fecha = "";
        this.muestra_factura_items = "";

        return false;
      }
    },
    OnMouseMove(e) {
      //console.warn("mov3");
      if (this.n_flagMouse) {
        if (e == null) var e = window.event;

        var id = this.n_idOrigen;
        document.getElementById(id).style.left =
          this.n_InicTextX + e.clientX - this.n_clientXinicial + "px";
        document.getElementById(id).style.top =
          this.n_InicTextY +
          e.clientY -
          this.n_clientYinicial -
          this.n_scrollInicial +
          document.documentElement.scrollTop +
          "px";
      }
    },
    OnMouseUp(e) {
      if (this.n_flagMouse) {
        this.n_flagMouse = false;
        if (e == null) e = window.event;
        var target = e.target != null ? e.target : e.srcElement;

        let origen = document.getElementById(this.n_idOrigen);

        if (this.n_idDestino) {
          let destino = document.getElementById(this.n_idDestino);
          let destinoX = this.ExtractNumber(destino.style.left);
          let destinoY = this.ExtractNumber(destino.style.top);

          if (this.muestra_diferencia == 0) {
            origen.dataset.value = 0;
            origen.getElementsByTagName("monto")[0].innerHTML = "";
            origen.style.background = "#555";
            origen.style.cursor = "default";
            origen.removeEventListener("mousedown", this.OnMouseDown);

            destino.dataset.value = 0;
            destino.getElementsByTagName("monto")[0].innerHTML = "";
            destino.style.background = "#555";
          } else {
            if (this.muestra_diferencia < 0) {
              //la factura es mayor al pago
              let aux = this.muestra_diferencia * -1;
              destino.dataset.value = aux;
              destino.getElementsByTagName("monto")[0].innerHTML =
                "$" + aux.toString();

              origen.dataset.value = 0;
              origen.getElementsByTagName("monto")[0].innerHTML = "";
              origen.style.background = "#555";
              origen.style.cursor = "default";
              origen.removeEventListener("mousedown", this.OnMouseDown);
            } else {
              destino.dataset.value = 0;
              destino.getElementsByTagName("monto")[0].innerHTML = "";
              destino.style.background = "#555";

              origen.dataset.value = this.muestra_diferencia;
              origen.getElementsByTagName("monto")[0].innerHTML =
                "$" + this.muestra_diferencia.toString();
            }
          }

          var c = document.getElementById("elcanvas");
          var ctx = c.getContext("2d");
          ctx.strokeStyle = "#FFFFFF";

          ctx.moveTo(
            this.n_posInicX + this.n_anchoDrag + 19,
            10 + this.n_InicTextY
          );
          ctx.lineTo(destinoX, 10 + destinoY);
          ctx.stroke();
          this.n_idDestino = 0;
        }
        document.getElementById("cuadroCompara").style.display = "none";
        origen.style.left = this.n_InicTextX + "px";
        origen.style.top = this.n_InicTextY + "px";
      }
    },
    alturaCuadroCompara() {
      //console.log("hubo scroll", document.documentElement.scrollTop);
      let cuadro = document.getElementById("cuadroCompara");
      cuadro.style.top =
        this.n_posInicY - 80 + document.documentElement.scrollTop + "px";
    },
    Left(s, n) {
      if (n > s.length) n = s.length;
      return s.substring(0, n);
    },
    Right(s, n) {
      var t = s.length;
      if (n > t) n = t;
      return s.substring(t - n, t);
    },
    ExtractNumber(value) {
      var n = parseInt(value);
      return n == null || isNaN(n) ? 0 : n;
    },
    StringNumber(value) {
      var n = parseFloat(value.replace(",", "."));

      return n == null || isNaN(n) ? 0 : n;
    },
    GetOffset(el) {
      // offsetTop has a bug,  value suddenly become 0, same with offset left, element.getBoundingClientRect provides a better alternative because it’s free from bugs
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        //top: rect.top ,
      };
    },
  },
};
</script>
<style>
.drag {
  cursor: move;

  background: rgb(55, 56, 12);
  z-index: 2;
}

.destino {
  z-index: 3;

  background: rgb(34, 56, 12);
}
.chip {
  border-radius: 16px;
  font-size: 14px;
  height: 24px;
  border-color: hsla(0, 0%, 100%, 0.12);
  color: #fff;

  align-items: center;

  display: inline-flex;
  line-height: 20px;

  outline: none;

  padding: 0 12px;

  text-decoration: none;
  transition-duration: 0.28s;
  transition-property: box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  white-space: nowrap;
  position: absolute;
}

.borderColorido {
  border: 8px solid;
  border-image: linear-gradient(45deg, gold, deeppink) 1;
  clip-path: inset(0 round 10px);
  padding: 4px;
}
body {
  background: #121212;
}
</style>
