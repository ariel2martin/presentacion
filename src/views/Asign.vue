<template>
  <div>
    <v-container
      @mousedown="OnMouseDown"
      @mouseup="OnMouseUp"
      class="contenedor"
    >
      <v-alert
        :value="true"
        :color="colorbaner"
        icon="mdi-information"
        class="white--text"
        id="infosuma"
        >Drag the "IN" to services
      </v-alert>
      <v-alert type="success"></v-alert>
      <v-row no-gutters style="height: 150px">
        <v-col>
          <div v-for="(i, index) in dataReceived" :key="index">
            <ABadge
              :id="'NEG' + i[0].toString()"
              v-if="i[1] == 'in'"
              class="drag"
              type="warning"
              :data-value="i[2]"
              :data-date="i[3]"
            >
              {{
                new Date(i[3]).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }}
              ${{ i[2].toString() }}</ABadge
            >
          </div>
        </v-col>
        <v-col>
          <div v-for="(i, index) in dataReceived" :key="index">
            <span @mouseover="OnMouseOver" @mouseleave="OnMouseLeft">
              <ABadge
                :id="'POS' + i[0].toString()"
                v-if="i[1] == 'out'"
                type="primary"
                class="fijo"
                :data-value="i[2]"
                :data-date="i[3]"
              >
                {{
                  new Date(i[3]).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                }}
                ${{ i[2].toString() }}</ABadge
              ></span
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ABadge from "@/components/ABadge.vue";
import config from "../../configuraciones.js";

export default {
  components: { ABadge },
  data() {
    return {
      dataReceived: [
        [11, "in", 147.4, "2020/02/01"],
        [13, "in", 66, "2020/02/03"],
        [22, "out", 50, "2020/02/05"],
        [24, "out", 250, "2020-02-13"],
        [26, "out", 350, "2020-02-22"],
      ],
      _startX: 0,
      _startY: 0,
      _InicTextX: 0,
      _InicTextY: 0,
      _id: 0,
      _iddestino: 0,
      _dragElement: 0,
      _oldZIndex: 0,
      _flagMouse: 3,
      _dragElement: null,
      _destino: 0,
      colorbaner: config.colors.complemento3,
      _negVal: 0,
      _negDate: 0,
    };
  },

  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    OnMouseOver(e) {
      if (this._flagMouse) {
        if (e == null) e = window.event;
        var target = e.target != null ? e.target : e.srcElement;
        if (target.id != null && target.id != "") {
          let elegido = document.getElementById(target.id);

          elegido.style.background = config.colors.info;
          this._destino = target.id;
          document.getElementsByClassName("v-alert__content")[0].innerHTML =
            "  diff:" + (this._negVal - elegido.dataset.value).toString();
        }
      }
      /*
    var cual = this.Right(target.id, target.id.length - 3);
      let id = parseInt(cual);
      if (
        id != this._iddestino &&
        this.Right(target.className, 7) != "ubicado"
      ) {
        this._iddestino = id;
        this._destino = target.id;
        /*
        document.getElementById(this._destino).className = document
          .getElementById(this._destino)
          .className.replace(/(?:^|\s)badge-primary(?!\S)/g, "");
        document.getElementById(target.id).className += " badge-info";
        */

      //$("#POS" + _iddestino).css("background", "lightgray");
      //}
    },
    OnMouseLeft(e) {
      //console.log("ee", this._destino);
      if (document.getElementById(this._destino) != null) {
        document.getElementById(this._destino).style.background =
          config.colors.primary;
        this._destino = 0;
        document.getElementsByClassName("v-alert__content")[0].innerHTML = "";
      }

      /*
      document.getElementById(this._destino).className = document
        .getElementById(this._destino)
        .className.replace(/(?:^|\s)badge-info(?!\S)/g, "");
      document.getElementById(this._destino).className += " badge-primary";
      */
      // document.getElementById(this._destino).style.background =
      //  config.colors.info;
    },
    OnMouseDown(e) {
      if (e == null) e = window.event;
      var target = e.target != null ? e.target : e.srcElement;

      if (
        ((e.button == 1 && window.event != null) || e.button == 0) &&
        this.Left(target.id, 3) == "NEG"
      ) {
        this._flagMouse = true;

        //let id = parseInt(this.Right(target.id, target.id.length - 3));
        let cual = document.getElementById(target.id);
        this._InicTextX = this.ExtractNumber(cual.style.left);
        this._InicTextY = this.ExtractNumber(cual.style.top);
        /*
        console.warn(
          this.ExtractNumber(document.getElementById(cual).style.left),
          this.ExtractNumber(document.getElementById(cual).style.top)
        );
        */
        this._startX = e.clientX;
        this._startY = e.clientY;
        console.warn(this._InicTextX, this._startX);
        this._id = target.id;
        this._oldZIndex = target.style.zIndex;
        this._dragElement = target;
        this._negVal = cual.dataset.value;
        this._negDate = cual.dataset.date;

        document.onmousemove = this.OnMouseMove;
        //document.body.focus();
        document.onselectstart = function () {
          return false;
        };
        target.ondragstart = function () {
          return false;
        };

        return false;
      }
    },
    OnMouseMove(e) {
      if (this._flagMouse) {
        if (e == null) var e = window.event;
        //no_dragElement.style.left = (_InicIconX + e.clientX - _startX) + 'px';
        //no_dragElement.style.top = (_InicIconY + e.clientY - _startY) + 'px';
        var id = this._id;
        document.getElementById(id).style.left =
          this._InicTextX + e.clientX - this._startX + "px";
        document.getElementById(id).style.top =
          this._InicTextY + e.clientY - this._startY + "px";
        console.warn(this._destino, this._id);
        /*
     $("#NEG" + id).css({
        left: _InicTextX + e.clientX - _startX + "px",
        top: _InicTextY + e.clientY - _startY + "px",
        zIndex: _oldZIndex,
      });
      */
        //       console.log("aqui " + id + " " + this._InicTextX);
      }
    },
    OnMouseUp(e) {
      this._flagMouse = false;
      if (e == null) e = window.event;
      var target = e.target != null ? e.target : e.srcElement;
      if (this._destino == 0 || this._destino == undefined) {
        console.log(this._id, this._InicTextX, this._startX);
        document.getElementById(this._id).style.left = this._InicTextX + "px";
        document.getElementById(this._id).style.top = this._InicTextY + "px";
      }
      console.warn("up ", this._dragElement);
      /*
      if (this._dragElement != null) {
        var iddestino = this._iddestino;
        var id = this._id;
        if (iddestino == 0) {
          // no se asoció NEG a POS, vuelvo a las coordenadas originales
          $("#NEG" + id).css({
            left: this._InicTextX + "px",
            top: this._InicTextY + "px",
            zIndex: 0,
          });
        } else {
          var mopenPOS = parseInt($("#POS" + iddestino).attr("data-mopen"));
          var mopenNEG = parseInt($("#NEG" + id).attr("data-mopen"));
          var mopendecPOS = parseInt(
            $("#POS" + iddestino).attr("data-mopendec")
          );
          var mopendecNEG = parseInt($("#NEG" + id).attr("data-mopendec"));
          aplica(id, iddestino);
          if (
            mopenPOS == -1 * mopenNEG &&
            mopendecPOS == mopendecNEG &&
            $("#NEGop" + id).text().length < 2 &&
            $("#POSop" + iddestino).text().length < 2
          ) {
            $("#NEG" + id)
              .removeClass("drag")
              .addClass("ubicado");
            $("#NEG" + id).css("zIndex", 2);
            $("#NEG" + id).css("left", 222 - 160);
            var elotro = $("#POS" + iddestino).css("top");
            $("#NEG" + id).css("top", elotro);
            $("#POS" + iddestino)
              .removeClass("Factura")
              .addClass("ubicado");
            $("#POS" + iddestino).attr("id", "UBI" + iddestino);
          } else {
            $("#NEG" + id).css({
              left: this._InicTextX + "px",
              top: this._InicTextY + "px",
              zIndex: 0,
            });
            var c = document.getElementById("elcanvvas");
            var ctx = c.getContext("2d");
            ctx.moveTo(111 + 300 + 107, this._InicTextY + 14);
            ctx.lineTo(
              222 + 20,
              parseInt($("#POS" + iddestino).css("top")) + 14
            );
            ctx.stroke();
            var auxOpen =
              mopenNEG +
              (-1 * mopendecNEG) / 100 +
              mopenPOS +
              mopendecPOS / 100;
            var auxOpen = auxOpen.toFixed(2);
            var t = auxOpen.length;
            if (auxOpen > 0) {
              $("#POSop" + iddestino).text(auxOpen);
              $("#POSop" + iddestino).css("left", 211 - t * 7);
              $("#NEGop" + id).text("");
              $("#NEG" + id)
                .removeClass("drag")
                .addClass("ubicado");
              $("#POS" + iddestino).attr(
                "data-mopen",
                auxOpen.substring(0, t - 3)
              );
              $("#POS" + iddestino).attr(
                "data-mopendec",
                auxOpen.substring(t - 2, t)
              );
              $("#NEG" + id).attr("data-mopen", 0);
              $("#NEG" + id).attr("data-mopendec", 0);
            } else {
              if (auxOpen < 0) {
                $("#NEGop" + id).text(auxOpen);
                $("#POSop" + iddestino).text("");
                $("#POS" + iddestino)
                  .removeClass("Factura")
                  .addClass("ubicado");
                $("#POS" + iddestino).attr("id", "UBI" + iddestino);
                $("#POS" + iddestino).attr("data-mopen", 0);
                $("#POS" + iddestino).attr("data-mopendec", 0);
                $("#NEG" + id).attr("data-mopen", auxOpen.substring(0, t - 3));
                $("#NEG" + id).attr(
                  "data-mopendec",
                  auxOpen.substring(t - 2, t)
                );
              }
              // auxopen=0
              else {
                $("#NEGop" + id).text("");
                $("#POSop" + iddestino).text("");
                $("#POS" + iddestino)
                  .removeClass("Factura")
                  .addClass("ubicado");
                $("#NEG" + id)
                  .removeClass("drag")
                  .addClass("ubicado");
                $("#POS" + iddestino).attr("id", "UBI" + iddestino);
                $("#POS" + iddestino).attr("data-mopen", 0);
                $("#POS" + iddestino).attr("data-mopendec", 0);
                $("#NEG" + id).attr("data-mopen", 0);
                $("#NEG" + id).attr("data-mopendec", 0);
              }
            }
            if ($("#POS" + iddestino).attr("data-payid") == "NadaAqui") {
              $("#POS" + iddestino)
                .removeClass("Factura")
                .addClass("ubicado");
              $("#POS" + iddestino).attr("id", "UBI" + iddestino);
            }
          }
        }
*/
      //    document.onselectstart = null;
      //    this._dragElement.ondragstart = null;
      //    this._dragElement = null;
      //   document.onmousemove = function () {
      //    return false;
      // };
      // }
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
  },
};
</script>
<style scoped>
.drag {
  position: relative;
  cursor: move;
  z-index: 3;
}
.fijo {
  position: relative;
  z-index: 3;
}

.contenedor {
  height: 100%;
}

.elegido {
  background: "darkgrey" !important;
}
</style>
